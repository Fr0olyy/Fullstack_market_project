package auth

import (
	"errors"
	"market/internal/repository"
	"market/models"
)

type AuthService struct {
	userRepo *repository.UserRepository
}

func NewAuthService(userRepo *repository.UserRepository) *AuthService {
	return &AuthService{userRepo: userRepo}
}

type SignUpDTO struct {
	Email    string
	Password string
	Name     string
	Surname  string
	Gender   string
}

func (s *AuthService) SignUp(dto SignUpDTO) (*models.User, error) {
	// Проверка существования пользователя
	existingUser, err := s.userRepo.GetUserByEmail(dto.Email)
	if err != nil {
		return nil, err
	}
	if existingUser != nil {
		return nil, errors.New("user already exists")
	}

	user := &models.User{
		Email:    dto.Email,
		Password: dto.Password,
		Role:     "USER",
		UserInfo: models.UserInfo{
			Name:    dto.Name,
			Surname: dto.Surname,
			Gender:  dto.Gender,
		},
	}

	if err := s.userRepo.CreateUserWithBasket(user); err != nil {
		return nil, err
	}

	return user, nil
}
