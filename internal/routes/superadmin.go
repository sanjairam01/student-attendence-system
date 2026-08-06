package routes

import (
	"github.com/gin-gonic/gin"
	"smart-attendance/internal/controllers/superadmin"
	"smart-attendance/internal/repositories/superadmin"
	services "smart-attendance/internal/services/superadmin"
)

func RegisterSuperAdminRoutes(rg *gin.RouterGroup) {
	repo := superadmin.NewSuperAdminRepository()
	svc := services.NewSuperAdminService(repo)
	ctrl := superadmin.NewSuperAdminController(svc)

	saGroup := rg.Group("/superadmin")
	{
		saGroup.GET("/dashboard", ctrl.GetDashboard)
		
		// Student Management Routes
		saGroup.GET("/students", ctrl.ListStudents)
		saGroup.POST("/students", ctrl.CreateStudent)
		saGroup.PUT("/students/:id", ctrl.UpdateStudent)
		saGroup.DELETE("/students/:id", ctrl.DeleteStudent)

		// Faculty & Department Routes
		saGroup.GET("/faculty", ctrl.ListFaculty)
		saGroup.GET("/departments", ctrl.ListDepartments)

		// Audit Logs & System Backups
		saGroup.GET("/audit-logs", ctrl.GetAuditLogs)
		saGroup.POST("/backup", ctrl.TriggerDatabaseBackup)
	}
}
