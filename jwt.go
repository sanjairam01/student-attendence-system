package main

import (
	"smart-attendance-system/internal/utils"
)

// GenerateToken creates JWT tokens
func GenerateToken(userID uint, role string, email string) (string, error) {
	return utils.GenerateJWTToken(userID, role, email)
}

// ValidateToken verifies JWT tokens
func ValidateToken(tokenString string) (*utils.CustomJWTClaims, error) {
	return utils.ValidateJWTToken(tokenString)
}
