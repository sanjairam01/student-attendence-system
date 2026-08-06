package middleware

import (
	"smart-attendance-system/internal/utils"

	"github.com/gin-gonic/gin"
)

// RequireRole restricts endpoint access to specified user roles
func RequireRole(allowedRoles ...string) gin.HandlerFunc {
	return func(c *gin.Context) {
		roleVal, exists := c.Get("role")
		if !exists {
			utils.SendForbidden(c, "User role metadata not found")
			c.Abort()
			return
		}

		userRole, ok := roleVal.(string)
		if !ok {
			utils.SendForbidden(c, "Invalid user role type")
			c.Abort()
			return
		}

		for _, allowed := range allowedRoles {
			if userRole == allowed {
				c.Next()
				return
			}
		}

		utils.SendForbidden(c, "Access denied: insufficient role privileges")
		c.Abort()
	}
}
