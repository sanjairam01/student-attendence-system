package routes

import (
	"smart-attendance-system/internal/controllers"
	authCtrl "smart-attendance-system/internal/controllers/auth"
	"smart-attendance-system/internal/middleware"

	"github.com/gin-gonic/gin"
)

type RouteDeps struct {
	AuthCtrl         *authCtrl.AuthController
	LegacyAuthCtrl   *controllers.AuthController
	StudentCtrl      *controllers.StudentController
	FacultyCtrl      *controllers.FacultyController
	AdminCtrl        *controllers.AdminController
	SuperAdminCtrl   *controllers.SuperAdminController
	AttendanceCtrl   *controllers.AttendanceController
	ReportsCtrl      *controllers.ReportsController
	DashboardCtrl    *controllers.DashboardController
	SettingsCtrl     *controllers.SettingsController
	NotificationCtrl *controllers.NotificationController
}

// SetupRoutes registers all application middlewares, static web pages, and API endpoints
func SetupRoutes(router *gin.Engine, deps *RouteDeps) {
	// Global Middlewares
	router.Use(middleware.CORS())
	router.Use(middleware.RequestLogger())
	router.Use(middleware.Recovery())
	router.Use(middleware.RateLimit(100))

	// Serve Static Assets & Templates
	router.Static("/static", "./static")
	router.Static("/uploads", "./uploads")

	// API Base Group
	api := router.Group("/api/v1")
	{
		// Health check endpoint
		api.GET("/health", func(c *gin.Context) {
			c.JSON(200, gin.H{
				"status":  "healthy",
				"service": "Smart Attendance Management API - Auth Module active",
				"version": "1.0.0",
			})
		})

		RegisterStudentRoutes(api, deps.StudentCtrl)
		RegisterFacultyRoutes(api, deps.FacultyCtrl)
		RegisterAdminRoutes(api, deps.AdminCtrl)
		RegisterSuperAdminRoutes(api, deps.SuperAdminCtrl)
		RegisterAttendanceRoutes(api, deps.AttendanceCtrl)
		RegisterReportsRoutes(api, deps.ReportsCtrl)
		RegisterDashboardRoutes(api, deps.DashboardCtrl)
		RegisterSettingsRoutes(api, deps.SettingsCtrl)
		RegisterNotificationRoutes(api, deps.NotificationCtrl)
	}

	// Register Auth Web & API Routes
	if deps.AuthCtrl != nil {
		RegisterAuthRoutes(router, api, deps.AuthCtrl)
	}
}
