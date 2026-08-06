package main

import (
	"smart-attendance-system/internal/config"
)

// Config re-exports App Config struct for root main access
type Config = config.Config

// LoadConfig loads environment configurations
func LoadConfig() (*config.Config, error) {
	return config.LoadConfig()
}
