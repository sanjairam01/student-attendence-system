package controllers

import (
	"net/http"

	"smart-attendance-system/internal/services"
	"smart-attendance-system/internal/utils"

	"github.com/gin-gonic/gin"
)

type SuperAdminController struct {
	dashboardService services.DashboardService
	settingsService  services.SettingsService
}

func NewSuperAdminController(dashboardService services.DashboardService, settingsService services.SettingsService) *SuperAdminController {
	return &SuperAdminController{dashboardService: dashboardService, settingsService: settingsService}
}

func (ctrl *SuperAdminController) GetSystemOverview(c *gin.Context) {
	stats, err := ctrl.dashboardService.GetOverviewStats()
	if err != nil {
		utils.SendError(c, http.StatusInternalServerError, "Failed to load dashboard metrics")
		return
	}
	utils.SendSuccess(c, http.StatusOK, "System overview statistics fetched", stats)
}

func (ctrl *SuperAdminController) GetSystemSettings(c *gin.Context) {
	settings, err := ctrl.settingsService.ListSettings()
	if err != nil {
		utils.SendError(c, http.StatusInternalServerError, "Failed to load system settings")
		return
	}
	utils.SendSuccess(c, http.StatusOK, "System settings list loaded", settings)
}
