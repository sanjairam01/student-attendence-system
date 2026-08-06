package superadmin

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"smart-attendance/internal/services/superadmin"
)

type SuperAdminController struct {
	service *superadmin.SuperAdminService
}

func NewSuperAdminController(service *superadmin.SuperAdminService) *SuperAdminController {
	return &SuperAdminController{service: service}
}

// GetDashboard returns overall statistics and metrics for Super Admin
func (c *SuperAdminController) GetDashboard(ctx *gin.Context) {
	stats, err := c.service.GetDashboardStats(ctx.Request.Context())
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to load dashboard stats", "details": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"status": "success", "data": stats})
}

// Students Management
func (c *SuperAdminController) ListStudents(ctx *gin.Context) {
	students, err := c.service.GetAllStudents(ctx.Request.Context())
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to list students"})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"status": "success", "data": students})
}

func (c *SuperAdminController) CreateStudent(ctx *gin.Context) {
	var payload map[string]interface{}
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid payload"})
		return
	}
	res, err := c.service.CreateStudent(ctx.Request.Context(), payload)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusCreated, gin.H{"status": "success", "message": "Student created successfully", "data": res})
}

func (c *SuperAdminController) UpdateStudent(ctx *gin.Context) {
	id := ctx.Param("id")
	var payload map[string]interface{}
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid payload"})
		return
	}
	res, err := c.service.UpdateStudent(ctx.Request.Context(), id, payload)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"status": "success", "message": "Student updated", "data": res})
}

func (c *SuperAdminController) DeleteStudent(ctx *gin.Context) {
	id := ctx.Param("id")
	if err := c.service.DeleteStudent(ctx.Request.Context(), id); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"status": "success", "message": "Student deleted"})
}

// Faculty Management
func (c *SuperAdminController) ListFaculty(ctx *gin.Context) {
	faculty, err := c.service.GetAllFaculty(ctx.Request.Context())
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to list faculty"})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"status": "success", "data": faculty})
}

// Departments, Courses, Subjects, Classes
func (c *SuperAdminController) ListDepartments(ctx *gin.Context) {
	depts, err := c.service.GetAllDepartments(ctx.Request.Context())
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to list departments"})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"status": "success", "data": depts})
}

// Audit Logs & System Backups
func (c *SuperAdminController) GetAuditLogs(ctx *gin.Context) {
	logs, err := c.service.GetAuditLogs(ctx.Request.Context())
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve audit logs"})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"status": "success", "data": logs})
}

func (c *SuperAdminController) TriggerDatabaseBackup(ctx *gin.Context) {
	backupUrl, err := c.service.GenerateBackup(ctx.Request.Context())
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Backup generation failed"})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"status": "success", "message": "Database backup generated successfully", "download_url": backupUrl})
}
