package database

import (
	"fmt"
	"log"
	"time"

	"smart-attendance-system/internal/config"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

// ConnectDB initializes GORM MySQL connection with connection pool settings
func ConnectDB(cfg *config.Config) (*gorm.DB, error) {
	dsn := cfg.Database.GetDSN()

	gormLogLevel := logger.Warn
	if cfg.App.Env == "development" {
		gormLogLevel = logger.Info
	}

	gormConfig := &gorm.Config{
		Logger:                 logger.Default.LogMode(gormLogLevel),
		SkipDefaultTransaction: true,
		PrepareStmt:            true,
	}

	db, err := gorm.Open(mysql.Open(dsn), gormConfig)
	if err != nil {
		return nil, fmt.Errorf("failed to connect to MySQL database: %w", err)
	}

	sqlDB, err := db.DB()
	if err != nil {
		return nil, fmt.Errorf("failed to get underlying sql.DB instance: %w", err)
	}

	// Connection Pool Settings
	sqlDB.SetMaxIdleConns(cfg.Database.MaxIdleConns)
	sqlDB.SetMaxOpenConns(cfg.Database.MaxOpenConns)
	sqlDB.SetConnMaxLifetime(time.Duration(cfg.Database.ConnMaxLifetime) * time.Minute)

	if err := sqlDB.Ping(); err != nil {
		return nil, fmt.Errorf("database ping failed: %w", err)
	}

	log.Println("✅ Successfully connected to MySQL database pool")
	DB = db
	return db, nil
}

// CloseDB closes database pool connections on application shutdown
func CloseDB(db *gorm.DB) {
	if db != nil {
		sqlDB, err := db.DB()
		if err == nil {
			_ = sqlDB.Close()
			log.Println("Database connection closed.")
		}
	}
}
