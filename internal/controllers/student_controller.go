package controllers

import (
	"net/http"

	"smart-attendance-system/internal/services"
	"smart-attendance-system/internal/utils"

	"github.com/gin-gonic/gin"
)

type StudentController struct {
	studentService services.StudentService
}

func NewStudentController(studentService services.StudentService) *StudentController {
	return &StudentController{studentService: studentService}
}

func (ctrl *StudentController) GetProfile(c *gin.Context) {
	userID := c.GetUint("user_id")
	profile, err := ctrl.studentService.GetStudentProfile(userID)
	if err != nil {
		utils.SendError(c, http.StatusNotFound, "Student profile not found")
		return
	}

	utils.SendSuccess(c, http.StatusOK, "Student profile fetched successfully", profile)
}

func (ctrl *StudentController) GetAttendanceSummary(c *gin.Context) {
	userID := c.GetUint("user_id")
	profile, err := ctrl.studentService.GetStudentProfile(userID)
	if err != nil {
		utils.SendError(c, http.StatusNotFound, "Student record not found")
		return
	}

	total, attended, pct, err := ctrl.studentService.GetStudentAttendanceStats(profile.ID)
	if err != nil {
		utils.SendError(c, http.StatusInternalServerError, "Failed to retrieve attendance stats")
		return
	}

	utils.SendSuccess(c, http.StatusOK, "Attendance stats calculated", gin.H{
		"total_classes":        total,
		"attended_classes":     attended,
		"attendance_percentage": pct,
		"status":               func() string { if pct >= 75.0 { return "Eligible" }; return "Deficit Warning" }(),
	})
}
