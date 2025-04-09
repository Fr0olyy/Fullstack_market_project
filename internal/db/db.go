package db

import (
	"log"
	"market/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var db *gorm.DB

func InitDB() (*gorm.DB, error) {
	dsn := "host=localhost user=postgres password=12341234 dbname=postgres port=5432 sslmode=disable"
	var err error
	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Could not connect to database: %v", err)
	}

	if err := db.AutoMigrate(
		&models.User{},
		&models.UserInfo{},
		&models.Basket{},
		&models.BasketProduct{},
		&models.Product{},
		&models.Type{},
		&models.Brand{},
		&models.Rating{},
		&models.ProductInfo{},
		&models.TypeBrand{},
	); err != nil {
		log.Fatalf("Could not migrate: %v", err)
	}
	return db, nil
}
