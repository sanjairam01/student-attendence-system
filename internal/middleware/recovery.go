package middleware

import (
	"log"
	"net/http"

	"smart-attendance-system/internal/utils"

	"github.com/gin-gonic/gin"
)

// Recovery recovers from runtime panics and returns a structured 500 error
func Recovery() gin.HandlerFunc {
	return func(c *gin.Context) {
		defer func() {
			if err := recover(); err != nil {
				log.Printf("🚨 PANIC RECOVERED: %v", err)
				utils.SendError(c, http.StatusInternalServerError, "Internal server error encountered")
				c.Abort()
			}
		}()
		c.Next()
	}
}
