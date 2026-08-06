package routes

import (
	"smart-attendance-system/internal/controllers"
	"smart-attendance-system/internal/middleware"
	"smart-attendance-system/internal/models"

	"github.com/gin-gonic/gin"
)

func RegisterFacultyRoutes(rg *gin.RouterGroup, ctrl *controllers.FacultyController) {
	fac := rg.Group("/faculty")
	fac.Use(middleware.JWTAuth(), middleware.RequireRole(models.RoleFaculty))
	{
		fac.GET("/profile", ctrl.GetProfile)
		fac.GET("/classes", ctrl.GetMyClasses)
	}
}
