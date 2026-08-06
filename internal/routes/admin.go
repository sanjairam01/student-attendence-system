package routes

import (
	"smart-attendance-system/internal/controllers"
	"smart-attendance-system/internal/middleware"
	"smart-attendance-system/internal/models"

	"github.com/gin-gonic/gin"
)

func RegisterAdminRoutes(rg *gin.RouterGroup, ctrl *controllers.AdminController) {
	adm := rg.Group("/admin")
	adm.Use(middleware.JWTAuth(), middleware.RequireRole(models.RoleAdmin, models.RoleSuperAdmin))
	{
		adm.GET("/departments", ctrl.GetDepartments)
		adm.GET("/students", ctrl.ListStudents)
	}
}
