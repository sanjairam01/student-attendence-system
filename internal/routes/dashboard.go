package routes

import (
	"smart-attendance-system/internal/controllers"
	"smart-attendance-system/internal/middleware"

	"github.com/gin-gonic/gin"
)

func RegisterDashboardRoutes(rg *gin.RouterGroup, ctrl *controllers.DashboardController) {
	dash := rg.Group("/dashboard")
	dash.Use(middleware.JWTAuth())
	{
		dash.GET("/stats", ctrl.GetStats)
	}
}
