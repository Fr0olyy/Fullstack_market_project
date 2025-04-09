package handlers

import (
	basket_service "market/internal/services/basket_service"
	"market/models"
	"net/http"

	"github.com/labstack/echo/v4"
)

type BasketHandler struct {
	service basket_service.BasketService
}

func NewBasketHandler(s basket_service.BasketService) *BasketHandler {
	return &BasketHandler{service: s}
}

func (h *BasketHandler) GetBasket(c echo.Context) error {
	var u models.User
	basket, err := h.service.GetBasketService(u.ID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Could get basket"})
	}

	return c.JSON(http.StatusOK, basket)
}

func (h *BasketHandler) DeleteAllProduct(c echo.Context) error {
	var b models.Basket
	if err := h.service.DeleteAllProductService(b.ID); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"errors": "Could not delete all product"})
	}
	return c.NoContent(http.StatusNoContent)
}

func (h *BasketHandler) DeleteProductByID(c echo.Context) error {
	var u models.User
	var b models.Basket
	var p models.Product
	if err := h.service.DeleteProductByIDService(u.ID, b.ID, p.ID); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Could not delete product"})
	}
	return c.NoContent(http.StatusNoContent)
}

func (h *BasketHandler) AddProductToBasket(c echo.Context) error {
	var u models.User
	var p models.Product
	basket, err := h.service.AddProductToBasketService(u.ID, p.ID, p.Quantity)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Could not delete product"})
	}

	return c.JSON(http.StatusCreated, basket)
}
