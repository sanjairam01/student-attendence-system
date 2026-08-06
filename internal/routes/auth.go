package routes

import (
	authCtrl "smart-attendance-system/internal/controllers/auth"
	authMw "smart-attendance-system/internal/middleware/auth"

	"github.com/gin-gonic/gin"
)

func RegisterAuthRoutes(router *gin.Engine, api *gin.RouterGroup, ctrl *authCtrl.AuthController) {
	// HTML Page Web Routes
	router.GET("/", ctrl.RenderLandingPage)
	router.GET("/login/super-admin", ctrl.RenderSuperAdminLogin)
	router.GET("/login/admin", ctrl.RenderAdminLogin)
	router.GET("/login/faculty", ctrl.RenderFacultyLogin)
	router.GET("/login/student", ctrl.RenderStudentLogin)
	router.GET("/login/parent", ctrl.RenderParentLogin)
	router.GET("/forgot-password", ctrl.RenderForgotPassword)
	router.GET("/reset-password", ctrl.RenderResetPassword)
	router.GET("/verify-email", ctrl.RenderVerifyEmail)

	// API Endpoint Group (/api/v1/auth)
	authAPI := api.Group("/auth")
	{
		authAPI.POST("/login", ctrl.Login)
		authAPI.POST("/refresh-token", ctrl.RefreshToken)
		authAPI.POST("/logout", ctrl.Logout)

		authAPI.POST("/forgot-password", ctrl.ForgotPassword)
		authAPI.POST("/verify-otp", ctrl.VerifyOTP)
		authAPI.POST("/reset-password", ctrl.ResetPassword)
		authAPI.GET("/verify-email", ctrl.VerifyEmail)

		// Protected endpoints
		protected := authAPI.Group("")
		protected.Use(authMw.JWTAuth())
		{
			protected.GET("/me", ctrl.GetProfile)

			// User creation strictly restricted to Super Admin and Admin (No self-registration)
			adminOnly := protected.Group("")
			adminOnly.Use(authMw.RequireRoles("SuperAdmin", "Admin"))
			{
				adminOnly.POST("/users", ctrl.CreateUser)
			}
		}
	}
}
