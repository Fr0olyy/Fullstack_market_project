package routes

import (
	"market/internal/handlers"

	"github.com/labstack/echo/v4"
)

func SetupAuthRoutes(e *echo.Echo, authHandler *handlers.AuthHandler) {
	authGroup := e.Group("/api/auth")
	{
		authGroup.POST("/signup", authHandler.SignUp)
		// Другие роуты авторизации
	}
}
