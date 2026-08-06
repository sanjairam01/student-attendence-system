package utils

import (
	"errors"
	"fmt"
	"time"

	"smart-attendance-system/internal/config"

	"github.com/golang-jwt/jwt/v5"
)

// CustomJWTClaims defines the structure for JWT payload
type CustomJWTClaims struct {
	UserID   uint   `json:"user_id"`
	Email    string `json:"email"`
	Role     string `json:"role"`
	TenantID string `json:"tenant_id,omitempty"`
	jwt.RegisteredClaims
}

// GenerateJWTToken creates a new signed JWT access token for authenticated users
func GenerateJWTToken(userID uint, role string, email string) (string, error) {
	cfg := config.GlobalConfig
	secretKey := []byte(cfg.JWT.Secret)

	claims := CustomJWTClaims{
		UserID: userID,
		Email:  email,
		Role:   role,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Duration(cfg.JWT.ExpirationHours) * time.Hour)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			NotBefore: jwt.NewNumericDate(time.Now()),
			Issuer:    cfg.JWT.Issuer,
			Subject:   fmt.Sprintf("%d", userID),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(secretKey)
	if err != nil {
		return "", fmt.Errorf("failed to sign JWT token: %w", err)
	}

	return tokenString, nil
}

// GenerateRefreshToken creates a long-lived refresh token
func GenerateRefreshToken(userID uint) (string, error) {
	cfg := config.GlobalConfig
	secretKey := []byte(cfg.JWT.Secret)

	claims := jwt.RegisteredClaims{
		ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Duration(cfg.JWT.RefreshExpDays) * 24 * time.Hour)),
		IssuedAt:  jwt.NewNumericDate(time.Now()),
		Issuer:    cfg.JWT.Issuer,
		Subject:   fmt.Sprintf("%d", userID),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(secretKey)
}

// ValidateJWTToken parses and validates a JWT string, returning parsed claims
func ValidateJWTToken(tokenString string) (*CustomJWTClaims, error) {
	cfg := config.GlobalConfig
	secretKey := []byte(cfg.JWT.Secret)

	token, err := jwt.ParseWithClaims(tokenString, &CustomJWTClaims{}, func(t *jwt.Token) (interface{}, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", t.Header["alg"])
		}
		return secretKey, nil
	})

	if err != nil {
		return nil, fmt.Errorf("invalid token: %w", err)
	}

	claims, ok := token.Claims.(*CustomJWTClaims)
	if !ok || !token.Valid {
		return nil, errors.New("invalid token claims")
	}

	return claims, nil
}
