package controllers

import (
	"net/http"

	"smart-attendance-system/internal/services"
	"smart-attendance-system/internal/utils"

	"github.com/gin-gonic/gin"
)

type ReportsController struct {
	reportService services.ReportService
}

func NewReportsController(reportService services.ReportService) *ReportsController {
	return &ReportsController{reportService: reportService}
}

func (ctrl *ReportsController) DownloadExcel(c *gin.Context) {
	filePath, err := ctrl.reportService.GenerateAttendanceExcelReport(1, 1, 4)
	if err != nil {
		utils.SendError(c, http.StatusInternalServerError, "Failed to generate Excel report")
		return
	}

	c.FileAttachment(filePath, "attendance_report.xlsx")
}

func (ctrl *ReportsController) DownloadPDF(c *gin.Context) {
	filePath, err := ctrl.reportService.GenerateAttendancePDFReport(1, 1, 4)
	if err != nil {
		utils.SendError(c, http.StatusInternalServerError, "Failed to generate PDF report")
		return
	}

	c.FileAttachment(filePath, "attendance_report.pdf")
}
