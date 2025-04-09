package main

import (
	"log"
	"market/internal/db"
	"market/internal/handlers"
	"market/internal/repository"
	"market/internal/routes"
	"market/internal/services/auth"
	bs "market/internal/services/basket_service"

	"github.com/labstack/echo/v4"
)

func main() {
	// Инициализация БД
	dbConn, err := db.InitDB()
	if err != nil {
		log.Fatalf("Database initialization failed: %v", err)
	}
	// Создание Echo
	e := echo.New()

	// Инициализация репозиториев
	userRepo := repository.NewUserRepository(dbConn)
	basketRepo := repository.NewBasketRepository(dbConn)

	// Инициализация сервисов
	authService := auth.NewAuthService(userRepo)
	basketService := bs.NewBasketService(basketRepo)

	// Регистрация обработчиков
	basketHandler := handlers.NewBasketHandler(basketService)
	authHandler := handlers.NewAuthHandler(authService)

	// Настройка роутов
	// main.go или router.go

	// Группа защищенных маршрутов
	authGroup := e.Group("/api")

	authGroup.GET("/basket", basketHandler.GetBasket)
	authGroup.POST("/basket", basketHandler.AddProductToBasket)
	authGroup.DELETE("/basket", basketHandler.DeleteAllProduct)
	authGroup.DELETE("/basket/:product_id", basketHandler.DeleteProductByID)
	routes.SetupAuthRoutes(e, authHandler)

	// Запуск сервера
	e.Logger.Fatal(e.Start(":8080"))
}
