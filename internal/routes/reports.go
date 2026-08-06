package routes

import (
	"smart-attendance-system/internal/controllers"
	"smart-attendance-system/internal/middleware"
	"smart-attendance-system/internal/models"

	"github.com/gin-gonic/gin"
)

func RegisterReportsRoutes(rg *gin.RouterGroup, ctrl *controllers.ReportsController) {
	rep := rg.Group("/reports")
	rep.Use(middleware.JWTAuth(), middleware.RequireRole(models.RoleFaculty, models.RoleAdmin, models.RoleSuperAdmin))
	{
		rep.GET("/excel", ctrl.DownloadExcel)
		rep.GET("/pdf", ctrl.DownloadPDF)
	}
}
