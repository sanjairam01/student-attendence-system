package main

import (
	"smart-attendance-system/internal/config"
	"smart-attendance-system/internal/database"

	"gorm.io/gorm"
)

// InitDatabase initializes the GORM MySQL connection pool
func InitDatabase(cfg *config.Config) (*gorm.DB, error) {
	return database.ConnectDB(cfg)
}
