package routes

import (
	"smart-attendance-system/internal/controllers"
	"smart-attendance-system/internal/middleware"

	"github.com/gin-gonic/gin"
)

func RegisterNotificationRoutes(rg *gin.RouterGroup, ctrl *controllers.NotificationController) {
	notif := rg.Group("/notifications")
	notif.Use(middleware.JWTAuth())
	{
		notif.GET("", ctrl.GetMyNotifications)
	}
}
