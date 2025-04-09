package main

import (
	"log"
	"market/internal/db"
	"market/internal/handlers"
	"market/internal/repository"
	"market/internal/routes"
	"market/internal/services/auth"

	"github.com/labstack/echo/v4"
)

func main() {
	// Инициализация БД
	dbConn, err := db.InitDB()
	if err != nil {
		log.Fatalf("Database initialization failed: %v", err)
	}

	// Инициализация репозиториев
	userRepo := repository.NewUserRepository(dbConn)

	// Инициализация сервисов
	authService := auth.NewAuthService(userRepo)

	// Создание Echo
	e := echo.New()

	// Регистрация обработчиков
	authHandler := handlers.NewAuthHandler(authService)

	// Настройка роутов
	routes.SetupAuthRoutes(e, authHandler)

	// Запуск сервера
	e.Logger.Fatal(e.Start(":1323"))
}
