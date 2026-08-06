package controllers

import (
	"net/http"

	"smart-attendance-system/internal/services"
	"smart-attendance-system/internal/utils"

	"github.com/gin-gonic/gin"
)

type SettingsController struct {
	settingsService services.SettingsService
}

func NewSettingsController(settingsService services.SettingsService) *SettingsController {
	return &SettingsController{settingsService: settingsService}
}

func (ctrl *SettingsController) ListSettings(c *gin.Context) {
	settings, err := ctrl.settingsService.ListSettings()
	if err != nil {
		utils.SendError(c, http.StatusInternalServerError, "Failed to load settings")
		return
	}
	utils.SendSuccess(c, http.StatusOK, "Settings retrieved", settings)
}

func (ctrl *SettingsController) UpdateSetting(c *gin.Context) {
	var body struct {
		Key         string `json:"key" binding:"required"`
		Value       string `json:"value" binding:"required"`
		Description string `json:"description"`
	}

	if err := c.ShouldBindJSON(&body); err != nil {
		utils.SendError(c, http.StatusBadRequest, "Invalid body", err.Error())
		return
	}

	if err := ctrl.settingsService.SaveSetting(body.Key, body.Value, body.Description); err != nil {
		utils.SendError(c, http.StatusInternalServerError, err.Error())
		return
	}

	utils.SendSuccess(c, http.StatusOK, "Setting saved successfully", nil)
}
