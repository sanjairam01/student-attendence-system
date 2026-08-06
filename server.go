package main

import (
	"smart-attendance-system/internal/config"
)

// InitServer sets up the Gin server instance
func InitServer(cfg *config.Config) *config.Server {
	return config.NewServer(cfg)
}
