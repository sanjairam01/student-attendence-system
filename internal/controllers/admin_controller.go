package controllers

import (
	"net/http"

	"smart-attendance-system/internal/services"
	"smart-attendance-system/internal/utils"

	"github.com/gin-gonic/gin"
)

type AdminController struct {
	academicService services.AcademicService
	studentService  services.StudentService
}

func NewAdminController(academicService services.AcademicService, studentService services.StudentService) *AdminController {
	return &AdminController{academicService: academicService, studentService: studentService}
}

func (ctrl *AdminController) GetDepartments(c *gin.Context) {
	depts, err := ctrl.academicService.GetDepartments()
	if err != nil {
		utils.SendError(c, http.StatusInternalServerError, "Failed to fetch departments")
		return
	}
	utils.SendSuccess(c, http.StatusOK, "Departments retrieved", depts)
}

func (ctrl *AdminController) ListStudents(c *gin.Context) {
	students, err := ctrl.studentService.ListStudents(0, 0, 0)
	if err != nil {
		utils.SendError(c, http.StatusInternalServerError, "Failed to load students")
		return
	}
	utils.SendSuccess(c, http.StatusOK, "Students list loaded", students)
}
