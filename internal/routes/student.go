package routes

import (
	"smart-attendance-system/internal/controllers"
	"smart-attendance-system/internal/middleware"
	"smart-attendance-system/internal/models"

	"github.com/gin-gonic/gin"
)

func RegisterStudentRoutes(rg *gin.RouterGroup, ctrl *controllers.StudentController) {
	st := rg.Group("/student")
	st.Use(middleware.JWTAuth(), middleware.RequireRole(models.RoleStudent))
	{
		st.GET("/profile", ctrl.GetProfile)
		st.GET("/attendance-summary", ctrl.GetAttendanceSummary)
	}
}
