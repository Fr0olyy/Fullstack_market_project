package repository

import (
	"errors"
	"fmt"
	"market/models"

	"gorm.io/gorm"
)

type BasketRepository interface {
	GetBasketRepository(user_id uint) (*models.Basket, error)
	DeleteAllProductRepository(basket_id uint) error
	DeleteProductByIDRepository(basketID uint, userID uint, productID uint) error
	AddProductToBasketRepository(userID uint, productID uint, quantity uint) (models.BasketProduct, error)
}

type basketRepo struct {
	db *gorm.DB
}

func NewBasketRepository(db *gorm.DB) BasketRepository {
	return &basketRepo{db: db}
}

func (r *basketRepo) GetBasketRepository(user_id uint) (*models.Basket, error) {
	var basket models.Basket

	err := r.db.
		Preload("BasketProducts.Product").
		Preload("BasketProducts.Product.Brand").
		Preload("BasketProducts.Product.Type").
		Where("user_id = ?", user_id).
		First(&basket).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		// Создаем новую корзину, если ее нет
		newBasket := models.Basket{UserID: user_id}
		if err := r.db.Create(&newBasket).Error; err != nil {
			return nil, err
		}
		return &newBasket, nil
	}

	if err != nil {
		return nil, err
	}

	return &basket, nil
}

func (r *basketRepo) DeleteAllProductRepository(basket_id uint) error {
	return r.db.Delete(&models.BasketProduct{}, "basket_id = ?", basket_id).Error

}

func (r *basketRepo) DeleteProductByIDRepository(basketID uint, userID uint, productID uint) error {
	// Проверяем что корзина принадлежит пользователю
	var basket models.Basket
	if err := r.db.Where("id = ? AND user_id = ?", basketID, userID).First(&basket).Error; err != nil {
		return fmt.Errorf("basket not found or doesn't belong to user")
	}
	// Удаляем товар
	return r.db.Where("basket_id = ? AND product_id = ?", basketID, productID).
		Delete(&models.BasketProduct{}).Error
}

func (r *basketRepo) AddProductToBasketRepository(userID uint, productID uint, quantity uint) (models.BasketProduct, error) {
	var result models.BasketProduct
	err := r.db.Transaction(func(tx *gorm.DB) error {
		// Находим или создаем корзину пользователя
		var basket models.Basket
		if err := tx.Where("user_id = ?", userID).First(&basket).Error; err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				basket = models.Basket{UserID: userID}
				if err := tx.Create(&basket).Error; err != nil {
					return fmt.Errorf("failed to create basket: %w", err)
				}
			} else {
				return fmt.Errorf("failed to find basket: %w", err)
			}
		}

		// Проверяем существование и доступность продукта
		var product models.Product
		if err := tx.First(&product, productID).Error; err != nil {
			return fmt.Errorf("product not found: %w", err)
		}
		if product.Quantity < quantity {
			return fmt.Errorf("not enough stock, available: %d", product.Quantity)
		}

		// Добавляем/обновляем продукт в корзине
		var existingItem models.BasketProduct
		if err := tx.Where("basket_id = ? AND product_id = ?", basket.ID, productID).
			First(&existingItem).Error; err == nil {

			// Обновляем количество и получаем обновленную запись
			if err := tx.Model(&existingItem).
				Update("quantity", gorm.Expr("quantity + ?", quantity)).
				First(&result).Error; err != nil {
				return fmt.Errorf("failed to update quantity: %w", err)
			}
		} else {
			// Создаем новую запись
			newItem := models.BasketProduct{
				BasketID:  basket.ID,
				ProductID: productID,
				Quantity:  quantity,
			}
			if err := tx.Create(&newItem).Error; err != nil {
				return fmt.Errorf("failed to add product to basket: %w", err)
			}
			result = newItem
		}

		// Резервируем товар на складе
		if err := tx.Model(&product).
			Update("quantity", gorm.Expr("quantity - ?", quantity)).Error; err != nil {
			return fmt.Errorf("failed to reserve product: %w", err)
		}

		return nil
	})

	return result, err
}
