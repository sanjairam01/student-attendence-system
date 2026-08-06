package middleware

import (
	"net/http"

	"smart-attendance-system/internal/utils"

	"github.com/gin-gonic/gin"
)

// ValidateJSON ensures request payload is valid JSON before reaching controller
func ValidateJSON() gin.HandlerFunc {
	return func(c *gin.Context) {
		if c.Request.Method == http.MethodPost || c.Request.Method == http.MethodPut || c.Request.Method == http.MethodPatch {
			if c.ContentType() != "application/json" && c.ContentType() != "multipart/form-data" {
				utils.SendError(c, http.StatusUnsupportedMediaType, "Content-Type must be application/json or multipart/form-data")
				c.Abort()
				return
			}
		}
		c.Next()
	}
}
