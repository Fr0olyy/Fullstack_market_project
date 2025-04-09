package repository

import (
	"errors"
	"market/models"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type UserRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{db: db}
}

func (r *UserRepository) CreateUserWithBasket(user *models.User) error {
	return r.db.Transaction(func(tx *gorm.DB) error {
		// Хеширование пароля
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
		if err != nil {
			return err
		}
		user.Password = string(hashedPassword)

		// Создание пользователя
		if err := tx.Create(user).Error; err != nil {
			return err
		}

		// Создание корзины
		basket := models.Basket{UserID: user.ID}
		if err := tx.Create(&basket).Error; err != nil {
			return err
		}

		return nil
	})
}

func (r *UserRepository) GetUserByEmail(email string) (*models.User, error) {
	var user models.User
	if err := r.db.Preload("UserInfo").
		Preload("Basket").
		Where("email = ?", email).
		First(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &user, nil
}
