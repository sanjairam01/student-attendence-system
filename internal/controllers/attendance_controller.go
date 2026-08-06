package controllers

import (
	"net/http"

	"smart-attendance-system/internal/models"
	"smart-attendance-system/internal/services"
	"smart-attendance-system/internal/utils"

	"github.com/gin-gonic/gin"
)

type AttendanceController struct {
	attendanceService services.AttendanceService
}

func NewAttendanceController(attendanceService services.AttendanceService) *AttendanceController {
	return &AttendanceController{attendanceService: attendanceService}
}

func (ctrl *AttendanceController) MarkBulkAttendance(c *gin.Context) {
	facultyUserID := c.GetUint("user_id")

	var req models.BulkAttendanceRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.SendError(c, http.StatusBadRequest, "Invalid request body parameters", err.Error())
		return
	}

	if err := ctrl.attendanceService.MarkBulkAttendance(facultyUserID, req); err != nil {
		utils.SendError(c, http.StatusInternalServerError, err.Error())
		return
	}

	utils.SendSuccess(c, http.StatusOK, "Class attendance marked successfully", nil)
}

func (ctrl *AttendanceController) GetClassAttendance(c *gin.Context) {
	classID := c.Param("class_id")
	date := c.Query("date")

	var cID uint
	if classID != "" {
		_ = cID
	}

	records, err := ctrl.attendanceService.GetClassAttendance(1, date)
	if err != nil {
		utils.SendError(c, http.StatusInternalServerError, "Failed to load class attendance")
		return
	}

	utils.SendSuccess(c, http.StatusOK, "Class attendance records fetched", records)
}
