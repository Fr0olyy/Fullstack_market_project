package basketservice

import (
	"market/internal/repository"
	"market/models"
)

type BasketService interface {
	GetBasketService(user_id uint) (*models.Basket, error)
	DeleteAllProductService(basket_id uint) error
	DeleteProductByIDService(basketID, userID, productID uint) error
	AddProductToBasketService(userID uint, productID uint, quantity uint) (*models.Basket, error)
}

type basketService struct {
	repo repository.BasketRepository
}

func NewBasketService(r repository.BasketRepository) BasketService {
	return &basketService{repo: r}
}

func (r *basketService) GetBasketService(user_id uint) (*models.Basket, error) {
	return r.repo.GetBasketRepository(user_id)
}

func (r *basketService) DeleteAllProductService(basket_id uint) error {
	return r.repo.DeleteAllProductRepository(basket_id)
}

func (r *basketService) DeleteProductByIDService(basketID, userID, productID uint) error {
	return r.repo.DeleteProductByIDRepository(basketID, userID, productID)

}

func (r *basketService) AddProductToBasketService(userID uint, productID uint, quantity uint) (*models.Basket, error) {
	basketProduct, err := r.repo.AddProductToBasketRepository(userID, productID, quantity)
	if err != nil {
		return &models.Basket{}, err
	}
	_ = basketProduct
	// Получаем обновленную корзину
	basket, err := r.repo.GetBasketRepository(userID)
	return basket, err
}
