package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	ID       uint     `gorm:"primaryKey;autoIncrement" json:"id"`
	Email    string   `gorm:"unique;not null" json:"email"`
	Password string   `json:"-"`
	Role     string   `gorm:"default:USER" json:"role"`
	Basket   Basket   `gorm:"foreignKey:UserID" json:"basket"`
	Ratings  []Rating `gorm:"foreignKey:UserID" json:"ratings"`
	UserInfo UserInfo `gorm:"embedded" json:"user_info"`
}

type UserInfo struct {
	Name    string `json:"name"`
	Surname string `json:"surname"`
	Gender  string `json:"gender"`
}

type Basket struct {
	gorm.Model
	ID             uint            `gorm:"primaryKey;autoIncrement" json:"id"`
	UserID         uint            `json:"user_id"`
	BasketProducts []BasketProduct `gorm:"foreignKey:BasketID" json:"basket_products"`
}

type BasketProduct struct {
	gorm.Model
	ID        uint    `gorm:"primaryKey;autoIncrement" json:"id"`
	BasketID  uint    `json:"basket_id"`
	ProductID uint    `json:"product_id"`
	Quantity  uint    `gorm:"default:1" json:"quantity"`
	Product   Product `gorm:"foreignKey:ProductID" json:"product"`
}

type Product struct {
	gorm.Model
	ID           uint          `gorm:"primaryKey;autoIncrement" json:"id"`
	Name         string        `gorm:"unique;not null" json:"name"`
	Price        float64       `gorm:"not null" json:"price"`
	Rating       uint          `gorm:"default:0" json:"rating"`
	Quantity     uint          `gorm:"default:0" json:"quantity"`
	TypeID       uint          `json:"type_id"`
	BrandID      uint          `json:"brand_id"`
	Type         Type          `gorm:"foreignKey:TypeID" json:"type"`
	Brand        Brand         `gorm:"foreignKey:BrandID" json:"brand"`
	Ratings      []Rating      `gorm:"foreignKey:ProductID" json:"ratings"`
	ProductInfos []ProductInfo `gorm:"foreignKey:ProductID" json:"product_infos"`
}

type Type struct {
	gorm.Model
	ID       uint      `gorm:"primaryKey;autoIncrement" json:"id"`
	Name     string    `gorm:"unique;not null" json:"name"`
	Brands   []Brand   `gorm:"many2many:type_brands;" json:"brands"`
	Products []Product `gorm:"foreignKey:TypeID" json:"products"`
}

type Brand struct {
	gorm.Model
	ID       uint      `gorm:"primaryKey;autoIncrement" json:"id"`
	Name     string    `gorm:"unique;not null" json:"name"`
	Types    []Type    `gorm:"many2many:type_brands;" json:"types"`
	Products []Product `gorm:"foreignKey:BrandID" json:"products"`
}

type Rating struct {
	gorm.Model
	ID        uint    `gorm:"primaryKey;autoIncrement" json:"id"`
	Rate      uint    `gorm:"not null" json:"rate"`
	UserID    uint    `json:"user_id"`
	ProductID uint    `json:"product_id"`
	User      User    `gorm:"foreignKey:UserID" json:"user"`
	Product   Product `gorm:"foreignKey:ProductID" json:"product"`
}

type ProductInfo struct {
	gorm.Model
	ID          uint    `gorm:"primaryKey;autoIncrement" json:"id"`
	Title       string  `gorm:"not null" json:"title"`
	Description string  `gorm:"not null" json:"description"`
	ProductID   uint    `json:"product_id"`
	Product     Product `gorm:"foreignKey:ProductID" json:"product"`
}

type TypeBrand struct {
	TypeID  uint `gorm:"primaryKey" json:"type_id"`
	BrandID uint `gorm:"primaryKey" json:"brand_id"`
}
