package routes

import (
	"smart-attendance-system/internal/controllers"
	"smart-attendance-system/internal/middleware"
	"smart-attendance-system/internal/models"

	"github.com/gin-gonic/gin"
)

func RegisterSettingsRoutes(rg *gin.RouterGroup, ctrl *controllers.SettingsController) {
	st := rg.Group("/settings")
	st.Use(middleware.JWTAuth(), middleware.RequireRole(models.RoleAdmin, models.RoleSuperAdmin))
	{
		st.GET("", ctrl.ListSettings)
		st.POST("", ctrl.UpdateSetting)
	}
}
