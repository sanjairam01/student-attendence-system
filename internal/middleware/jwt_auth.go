package middleware

import (
	"strings"

	"smart-attendance-system/internal/utils"

	"github.com/gin-gonic/gin"
)

// JWTAuth verifies Bearer token in Authorization header
func JWTAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			utils.SendUnauthorized(c, "Authorization token header is missing")
			c.Abort()
			return
		}

		parts := strings.SplitN(authHeader, " ", 2)
		if !(len(parts) == 2 && strings.ToLower(parts[0]) == "bearer") {
			utils.SendUnauthorized(c, "Invalid Authorization header format")
			c.Abort()
			return
		}

		claims, err := utils.ValidateJWTToken(parts[1])
		if err != nil {
			utils.SendUnauthorized(c, "Invalid or expired JWT token")
			c.Abort()
			return
		}

		c.Set("user_id", claims.UserID)
		c.Set("email", claims.Email)
		c.Set("role", claims.Role)
		c.Next()
	}
}
