package controllers

import (
	"net/http"

	"smart-attendance-system/internal/services"
	"smart-attendance-system/internal/utils"

	"github.com/gin-gonic/gin"
)

type DashboardController struct {
	dashboardService services.DashboardService
}

func NewDashboardController(dashboardService services.DashboardService) *DashboardController {
	return &DashboardController{dashboardService: dashboardService}
}

func (ctrl *DashboardController) GetStats(c *gin.Context) {
	stats, err := ctrl.dashboardService.GetOverviewStats()
	if err != nil {
		utils.SendError(c, http.StatusInternalServerError, "Failed to compute dashboard stats")
		return
	}
	utils.SendSuccess(c, http.StatusOK, "Dashboard statistics loaded", stats)
}
