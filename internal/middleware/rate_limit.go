package middleware

import (
	"net/http"
	"sync"
	"time"

	"smart-attendance-system/internal/utils"

	"github.com/gin-gonic/gin"
)

type ipVisitor struct {
	count    int
	lastSeen time.Time
}

var visitors = make(map[string]*ipVisitor)
var mu sync.Mutex

// RateLimit basic IP-based rate limiting middleware
func RateLimit(limitPerMin int) gin.HandlerFunc {
	return func(c *gin.Context) {
		ip := c.ClientIP()

		mu.Lock()
		v, exists := visitors[ip]
		if !exists {
			visitors[ip] = &ipVisitor{count: 1, lastSeen: time.Now()}
			mu.Unlock()
			c.Next()
			return
		}

		if time.Since(v.lastSeen) > time.Minute {
			v.count = 1
			v.lastSeen = time.Now()
			mu.Unlock()
			c.Next()
			return
		}

		if v.count >= limitPerMin {
			mu.Unlock()
			utils.SendError(c, http.StatusTooManyRequests, "Rate limit exceeded. Please try again in a minute.")
			c.Abort()
			return
		}

		v.count++
		mu.Unlock()
		c.Next()
	}
}
