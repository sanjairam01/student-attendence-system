package utils

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// StandardAPIResponse represents unified API JSON response
type StandardAPIResponse struct {
	Success bool        `json:"success"`
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
	Errors  interface{} `json:"errors,omitempty"`
	Meta    interface{} `json:"meta,omitempty"`
}

// SendSuccess sends a structured HTTP 200/201 success JSON response
func SendSuccess(c *gin.Context, status int, message string, data interface{}, meta ...interface{}) {
	var metaData interface{}
	if len(meta) > 0 {
		metaData = meta[0]
	}

	c.JSON(status, StandardAPIResponse{
		Success: true,
		Message: message,
		Data:    data,
		Meta:    metaData,
	})
}

// SendError sends a structured error JSON response
func SendError(c *gin.Context, status int, message string, errors ...interface{}) {
	var errData interface{}
	if len(errors) > 0 {
		errData = errors[0]
	}

	c.JSON(status, StandardAPIResponse{
		Success: false,
		Message: message,
		Errors:  errData,
	})
}

// SendUnauthorized helper for HTTP 401
func SendUnauthorized(c *gin.Context, message string) {
	if message == "" {
		message = "Unauthorized access or token expired"
	}
	SendError(c, http.StatusUnauthorized, message)
}

// SendForbidden helper for HTTP 403
func SendForbidden(c *gin.Context, message string) {
	if message == "" {
		message = "Forbidden: Insufficient privileges"
	}
	SendError(c, http.StatusForbidden, message)
}
