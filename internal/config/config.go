package config

import (
	"fmt"
	"log"
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

// Config holds all environmental configurations for the application
type Config struct {
	App      AppConfig
	Database DBConfig
	JWT      JWTConfig
	SMTP     SMTPConfig
	Upload   UploadConfig
}

type AppConfig struct {
	Name    string
	Env     string
	Port    string
	URL     string
	RateLimit int
}

type DBConfig struct {
	Host            string
	Port            string
	User            string
	Password        string
	Name            string
	Charset         string
	ParseTime       string
	Loc             string
	MaxIdleConns    int
	MaxOpenConns    int
	ConnMaxLifetime int // in minutes
}

type JWTConfig struct {
	Secret               string
	ExpirationHours      int
	RefreshExpDays      int
	Issuer               string
}

type SMTPConfig struct {
	Host        string
	Port        int
	Username    string
	Password    string
	FromAddress string
	FromName    string
}

type UploadConfig struct {
	Path        string
	MaxSizeBytes int64
}

var GlobalConfig *Config

// LoadConfig initializes configurations from environment variables or .env file
func LoadConfig() (*Config, error) {
	if err := godotenv.Load(); err != nil {
		log.Println("Notice: .env file not found, reading from environment variables")
	}

	cfg := &Config{
		App: AppConfig{
			Name:      getEnv("APP_NAME", "Smart Attendance Management System"),
			Env:       getEnv("APP_ENV", "development"),
			Port:      getEnv("APP_PORT", "8080"),
			URL:       getEnv("APP_URL", "http://localhost:8080"),
			RateLimit: getEnvAsInt("RATE_LIMIT_REQUESTS_PER_MIN", 100),
		},
		Database: DBConfig{
			Host:            getEnv("DB_HOST", "127.0.0.1"),
			Port:            getEnv("DB_PORT", "3306"),
			User:            getEnv("DB_USER", "root"),
			Password:        getEnv("DB_PASSWORD", ""),
			Name:            getEnv("DB_NAME", "smart_attendance_db"),
			Charset:         getEnv("DB_CHARSET", "utf8mb4"),
			ParseTime:       getEnv("DB_PARSE_TIME", "True"),
			Loc:             getEnv("DB_LOC", "Local"),
			MaxIdleConns:    getEnvAsInt("DB_MAX_IDLE_CONNS", 10),
			MaxOpenConns:    getEnvAsInt("DB_MAX_OPEN_CONNS", 100),
			ConnMaxLifetime: getEnvAsInt("DB_CONN_MAX_LIFETIME", 60),
		},
		JWT: JWTConfig{
			Secret:          getEnv("JWT_SECRET", "super_secret_jwt_key_smart_attendance_2026"),
			ExpirationHours: getEnvAsInt("JWT_EXPIRATION_HOURS", 24),
			RefreshExpDays:  getEnvAsInt("JWT_REFRESH_EXPIRATION_DAYS", 7),
			Issuer:          getEnv("JWT_ISSUER", "smart-attendance-system"),
		},
		SMTP: SMTPConfig{
			Host:        getEnv("SMTP_HOST", "smtp.gmail.com"),
			Port:        getEnvAsInt("SMTP_PORT", 587),
			Username:    getEnv("SMTP_USERNAME", ""),
			Password:    getEnv("SMTP_PASSWORD", ""),
			FromAddress: getEnv("SMTP_FROM_ADDRESS", "noreply@smartattendance.edu"),
			FromName:    getEnv("SMTP_FROM_NAME", "Smart Attendance System"),
		},
		Upload: UploadConfig{
			Path:         getEnv("UPLOAD_PATH", "./uploads"),
			MaxSizeBytes: int64(getEnvAsInt("MAX_FILE_SIZE_MB", 10)) * 1024 * 1024,
		},
	}

	GlobalConfig = cfg
	return cfg, nil
}

// GetDSN returns formatted MySQL Data Source Name string for GORM connection
func (c *DBConfig) GetDSN() string {
	return fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=%s&parseTime=%s&loc=%s",
		c.User, c.Password, c.Host, c.Port, c.Name, c.Charset, c.ParseTime, c.Loc,
	)
}

func getEnv(key, fallback string) string {
	if val, exists := os.LookupEnv(key); exists && val != "" {
		return val
	}
	return fallback
}

func getEnvAsInt(key string, fallback int) int {
	valStr := getEnv(key, "")
	if val, err := strconv.Atoi(valStr); err == nil {
		return val
	}
	return fallback
}
