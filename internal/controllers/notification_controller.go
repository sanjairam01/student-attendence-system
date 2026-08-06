package controllers

import (
	"net/http"

	"smart-attendance-system/internal/services"
	"smart-attendance-system/internal/utils"

	"github.com/gin-gonic/gin"
)

type NotificationController struct {
	notifService services.NotificationService
}

func NewNotificationController(notifService services.NotificationService) *NotificationController {
	return &NotificationController{notifService: notifService}
}

func (ctrl *NotificationController) GetMyNotifications(c *gin.Context) {
	userID := c.GetUint("user_id")
	notifications, err := ctrl.notifService.GetUserNotifications(userID)
	if err != nil {
		utils.SendError(c, http.StatusInternalServerError, "Failed to load notifications")
		return
	}
	utils.SendSuccess(c, http.StatusOK, "Notifications loaded", notifications)
}
