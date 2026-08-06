package auth

import (
	"net/http"

	authModels "smart-attendance-system/internal/models/auth"
	authService "smart-attendance-system/internal/services/auth"
	"smart-attendance-system/internal/utils"

	"github.com/gin-gonic/gin"
)

type AuthController struct {
	authService authService.AuthService
}

func NewAuthController(authService authService.AuthService) *AuthController {
	return &AuthController{authService: authService}
}

// API Endpoints

func (ctrl *AuthController) Login(c *gin.Context) {
	var req authModels.MultiRoleLoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.SendError(c, http.StatusBadRequest, "Invalid login credentials body", err.Error())
		return
	}

	ipAddress := c.ClientIP()
	userAgent := c.GetHeader("User-Agent")

	resp, err := ctrl.authService.Login(req, ipAddress, userAgent)
	if err != nil {
		utils.SendError(c, http.StatusUnauthorized, err.Error())
		return
	}

	c.JSON(http.StatusOK, resp)
}

func (ctrl *AuthController) RefreshToken(c *gin.Context) {
	var req authModels.RefreshTokenRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.SendError(c, http.StatusBadRequest, "Invalid refresh token request", err.Error())
		return
	}

	resp, err := ctrl.authService.RefreshToken(req.RefreshToken)
	if err != nil {
		utils.SendError(c, http.StatusUnauthorized, err.Error())
		return
	}

	c.JSON(http.StatusOK, resp)
}

func (ctrl *AuthController) Logout(c *gin.Context) {
	var req authModels.RefreshTokenRequest
	_ = c.ShouldBindJSON(&req)
	_ = ctrl.authService.Logout(req.RefreshToken)

	utils.SendSuccess(c, http.StatusOK, "Logged out successfully", nil)
}

func (ctrl *AuthController) CreateUser(c *gin.Context) {
	userRole := c.GetString("user_role")

	var req authModels.CreateUserDTO
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.SendError(c, http.StatusBadRequest, "Invalid user payload", err.Error())
		return
	}

	newUser, err := ctrl.authService.CreateUserByAdmin(userRole, req)
	if err != nil {
		utils.SendError(c, http.StatusForbidden, err.Error())
		return
	}

	utils.SendSuccess(c, http.StatusCreated, "User created successfully", newUser)
}

func (ctrl *AuthController) ForgotPassword(c *gin.Context) {
	var req authModels.ForgotPasswordRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.SendError(c, http.StatusBadRequest, "Please provide a valid email address", err.Error())
		return
	}

	token, otp, err := ctrl.authService.InitiatePasswordReset(req.Email)
	if err != nil {
		utils.SendError(c, http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Password reset OTP code sent to email",
		"token":   token,
		"dev_otp": otp, // Included for frictionless testing
	})
}

func (ctrl *AuthController) VerifyOTP(c *gin.Context) {
	var req authModels.VerifyOTPRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.SendError(c, http.StatusBadRequest, "Invalid OTP request body", err.Error())
		return
	}

	token, err := ctrl.authService.VerifyOTP(req.Email, req.OTP)
	if err != nil {
		utils.SendError(c, http.StatusBadRequest, err.Error())
		return
	}

	utils.SendSuccess(c, http.StatusOK, "OTP code verified successfully", gin.H{
		"reset_token": token,
	})
}

func (ctrl *AuthController) ResetPassword(c *gin.Context) {
	var req authModels.ResetPasswordRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.SendError(c, http.StatusBadRequest, "Invalid reset password payload", err.Error())
		return
	}

	if err := ctrl.authService.ResetPassword(req.Email, req.Token, req.NewPassword); err != nil {
		utils.SendError(c, http.StatusBadRequest, err.Error())
		return
	}

	utils.SendSuccess(c, http.StatusOK, "Password updated successfully. You can now log in.", nil)
}

func (ctrl *AuthController) VerifyEmail(c *gin.Context) {
	token := c.Query("token")
	if token == "" {
		utils.SendError(c, http.StatusBadRequest, "Verification token is required")
		return
	}

	if err := ctrl.authService.VerifyEmailToken(token); err != nil {
		utils.SendError(c, http.StatusBadRequest, err.Error())
		return
	}

	utils.SendSuccess(c, http.StatusOK, "Email address verified and account activated!", nil)
}

func (ctrl *AuthController) GetProfile(c *gin.Context) {
	userID := c.GetUint("user_id")
	userRole := c.GetString("user_role")
	userEmail := c.GetString("user_email")

	profile := gin.H{
		"id":         userID,
		"name":       "System User",
		"email":      userEmail,
		"role":       userRole,
		"phone":      "+1 (555) 234-5678",
		"photo":      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
		"department": "Computer Science & Engineering",
		"status":     "Active",
	}

	utils.SendSuccess(c, http.StatusOK, "User profile details loaded", profile)
}

// HTML Page Renderers

func (ctrl *AuthController) RenderLandingPage(c *gin.Context) {
	c.File("./templates/login/landing.html")
}

func (ctrl *AuthController) RenderSuperAdminLogin(c *gin.Context) {
	c.File("./templates/login/login-super-admin.html")
}

func (ctrl *AuthController) RenderAdminLogin(c *gin.Context) {
	c.File("./templates/login/login-admin.html")
}

func (ctrl *AuthController) RenderFacultyLogin(c *gin.Context) {
	c.File("./templates/login/login-faculty.html")
}

func (ctrl *AuthController) RenderStudentLogin(c *gin.Context) {
	c.File("./templates/login/login-student.html")
}

func (ctrl *AuthController) RenderParentLogin(c *gin.Context) {
	c.File("./templates/login/login-parent.html")
}

func (ctrl *AuthController) RenderForgotPassword(c *gin.Context) {
	c.File("./templates/login/forgot-password.html")
}

func (ctrl *AuthController) RenderResetPassword(c *gin.Context) {
	c.File("./templates/login/reset-password.html")
}

func (ctrl *AuthController) RenderVerifyEmail(c *gin.Context) {
	c.File("./templates/login/verify-email.html")
}
