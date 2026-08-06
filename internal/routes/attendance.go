package routes

import (
	"smart-attendance-system/internal/controllers"
	"smart-attendance-system/internal/middleware"
	"smart-attendance-system/internal/models"

	"github.com/gin-gonic/gin"
)

func RegisterAttendanceRoutes(rg *gin.RouterGroup, ctrl *controllers.AttendanceController) {
	att := rg.Group("/attendance")
	att.Use(middleware.JWTAuth())
	{
		att.POST("/bulk", middleware.RequireRole(models.RoleFaculty, models.RoleAdmin), ctrl.MarkBulkAttendance)
		att.GET("/class/:class_id", ctrl.GetClassAttendance)
	}
}
