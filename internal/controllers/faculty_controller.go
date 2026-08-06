package controllers

import (
	"net/http"

	"smart-attendance-system/internal/services"
	"smart-attendance-system/internal/utils"

	"github.com/gin-gonic/gin"
)

type FacultyController struct {
	facultyService services.FacultyService
}

func NewFacultyController(facultyService services.FacultyService) *FacultyController {
	return &FacultyController{facultyService: facultyService}
}

func (ctrl *FacultyController) GetProfile(c *gin.Context) {
	userID := c.GetUint("user_id")
	faculty, err := ctrl.facultyService.GetFacultyProfile(userID)
	if err != nil {
		utils.SendError(c, http.StatusNotFound, "Faculty profile not found")
		return
	}

	utils.SendSuccess(c, http.StatusOK, "Faculty profile fetched", faculty)
}

func (ctrl *FacultyController) GetMyClasses(c *gin.Context) {
	userID := c.GetUint("user_id")
	faculty, err := ctrl.facultyService.GetFacultyProfile(userID)
	if err != nil {
		utils.SendError(c, http.StatusNotFound, "Faculty record missing")
		return
	}

	classes, err := ctrl.facultyService.GetAssignedClasses(faculty.ID)
	if err != nil {
		utils.SendError(c, http.StatusInternalServerError, "Failed to load assigned classes")
		return
	}

	utils.SendSuccess(c, http.StatusOK, "Assigned classes retrieved", classes)
}
