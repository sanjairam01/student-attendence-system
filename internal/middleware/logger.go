package middleware

import (
	"log"
	"time"

	"github.com/gin-gonic/gin"
)

// RequestLogger logs incoming HTTP request method, path, status, and latency
func RequestLogger() gin.HandlerFunc {
	return func(c *gin.Context) {
		startTime := time.Now()
		path := c.Request.URL.Path
		rawQuery := c.Request.URL.RawQuery

		c.Next()

		latency := time.Since(startTime)
		clientIP := c.ClientIP()
		method := c.Request.Method
		statusCode := c.Writer.Status()

		if rawQuery != "" {
			path = path + "?" + rawQuery
		}

		log.Printf("[HTTP] %s | %3d | %12v | %s | %s",
			method, statusCode, latency, clientIP, path,
		)
	}
}
