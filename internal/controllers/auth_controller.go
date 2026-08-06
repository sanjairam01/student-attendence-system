package controllers

import (
	"net/http"

	"smart-attendance-system/internal/models"
	"smart-attendance-system/internal/services"
	"smart-attendance-system/internal/utils"

	"github.com/gin-gonic/gin"
)

type AuthController struct {
	authService services.AuthService
}

func NewAuthController(authService services.AuthService) *AuthController {
	return &AuthController{authService: authService}
}

// Login handles user authentication request
func (ctrl *AuthController) Login(c *gin.Context) {
	var req models.LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.SendError(c, http.StatusBadRequest, "Invalid request body parameters", err.Error())
		return
	}

	resp, err := ctrl.authService.Login(req)
	if err != nil {
		utils.SendUnauthorized(c, err.Error())
		return
	}

	utils.SendSuccess(c, http.StatusOK, "Login successful", resp)
}

// Register handles creation of new user account
func (ctrl *AuthController) Register(c *gin.Context) {
	var req models.RegisterUserRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.SendError(c, http.StatusBadRequest, "Validation error", err.Error())
		return
	}

	user, err := ctrl.authService.Register(req)
	if err != nil {
		utils.SendError(c, http.StatusBadRequest, err.Error())
		return
	}

	utils.SendSuccess(c, http.StatusCreated, "User registered successfully", user)
}
