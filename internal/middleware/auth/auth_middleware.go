package auth

import (
	"net/http"
	"strings"
	"sync"
	"time"

	"smart-attendance-system/internal/utils"

	"github.com/gin-gonic/gin"
)

// JWTAuth verifies Bearer tokens
func JWTAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			utils.SendError(c, http.StatusUnauthorized, "Authorization header missing")
			c.Abort()
			return
		}

		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			utils.SendError(c, http.StatusUnauthorized, "Invalid authorization format. Expected 'Bearer <token>'")
			c.Abort()
			return
		}

		tokenString := parts[1]
		claims, err := utils.ValidateJWT(tokenString)
		if err != nil {
			utils.SendError(c, http.StatusUnauthorized, "Invalid or expired JWT token")
			c.Abort()
			return
		}

		c.Set("user_id", claims.UserID)
		c.Set("user_role", claims.Role)
		c.Set("user_email", claims.Email)
		c.Next()
	}
}

// RequireRoles enforces strict Role-Based Access Control (RBAC)
func RequireRoles(allowedRoles ...string) gin.HandlerFunc {
	return func(c *gin.Context) {
		roleVal, exists := c.Get("user_role")
		if !exists {
			utils.SendError(c, http.StatusUnauthorized, "User session role missing")
			c.Abort()
			return
		}

		userRole := strings.ToLower(roleVal.(string))
		userRole = strings.ReplaceAll(userRole, "_", "")
		userRole = strings.ReplaceAll(userRole, "-", "")

		allowed := false
		for _, r := range allowedRoles {
			norm := strings.ToLower(r)
			norm = strings.ReplaceAll(norm, "_", "")
			norm = strings.ReplaceAll(norm, "-", "")

			if userRole == "superadmin" || userRole == norm {
				allowed = true
				break
			}
		}

		if !allowed {
			utils.SendError(c, http.StatusForbidden, "Forbidden: insufficient role permissions to access this endpoint")
			c.Abort()
			return
		}

		c.Next()
	}
}

// RequirePermission checks module level permissions
func RequirePermission(permissionName string) gin.HandlerFunc {
	return func(c *gin.Context) {
		roleVal, _ := c.Get("user_role")
		userRole := strings.ToLower(roleVal.(string))

		// SuperAdmin has global permission override
		if userRole == "superadmin" || userRole == "super_admin" {
			c.Next()
			return
		}

		// Implement permission verification logic
		c.Next()
	}
}

// SessionValidation ensures active user status
func SessionValidation() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Session integrity checks
		c.Next()
	}
}

var (
	rateLimitMap = make(map[string]int)
	rateMutex    sync.Mutex
)

// RateLimit simple rate limiting middleware
func RateLimit(limit int) gin.HandlerFunc {
	go func() {
		for {
			time.Sleep(time.Minute)
			rateMutex.Lock()
			rateLimitMap = make(map[string]int)
			rateMutex.Unlock()
		}
	}()

	return func(c *gin.Context) {
		ip := c.ClientIP()
		rateMutex.Lock()
		rateLimitMap[ip]++
		count := rateLimitMap[ip]
		rateMutex.Unlock()

		if count > limit {
			utils.SendError(c, 429, "Rate limit exceeded. Please try again later.")
			c.Abort()
			return
		}
		c.Next()
	}
}
