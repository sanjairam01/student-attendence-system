package utils

import (
	"fmt"
	"os"
	"path/filepath"

	"github.com/jung-kurt/gofpdf"
)

// GenerateAttendancePDF builds a formatted PDF attendance report
func GenerateAttendancePDF(title string, rows []AttendanceReportRow, outputPath string) (string, error) {
	pdf := gofpdf.New("P", "mm", "A4", "")
	pdf.AddPage()

	// Title
	pdf.SetFont("Arial", "B", 16)
	pdf.Cell(190, 10, title)
	pdf.Ln(12)

	// Header Table
	pdf.SetFont("Arial", "B", 10)
	pdf.SetFillColor(230, 230, 230)
	pdf.CellFormat(30, 8, "Roll No", "1", 0, "C", true, 0, "")
	pdf.CellFormat(45, 8, "Student", "1", 0, "L", true, 0, "")
	pdf.CellFormat(35, 8, "Subject", "1", 0, "L", true, 0, "")
	pdf.CellFormat(25, 8, "Total", "1", 0, "C", true, 0, "")
	pdf.CellFormat(25, 8, "Attended", "1", 0, "C", true, 0, "")
	pdf.CellFormat(30, 8, "Percentage", "1", 1, "C", true, 0, "")

	// Rows
	pdf.SetFont("Arial", "", 9)
	for _, row := range rows {
		pdf.CellFormat(30, 7, row.RollNo, "1", 0, "C", false, 0, "")
		pdf.CellFormat(45, 7, row.StudentName, "1", 0, "L", false, 0, "")
		pdf.CellFormat(35, 7, row.Subject, "1", 0, "L", false, 0, "")
		pdf.CellFormat(25, 7, fmt.Sprintf("%d", row.TotalClasses), "1", 0, "C", false, 0, "")
		pdf.CellFormat(25, 7, fmt.Sprintf("%d", row.Attended), "1", 0, "C", false, 0, "")
		pdf.CellFormat(30, 7, fmt.Sprintf("%.2f%%", row.Percentage), "1", 1, "C", false, 0, "")
	}

	if err := os.MkdirAll(filepath.Dir(outputPath), 0755); err != nil {
		return "", err
	}

	err := pdf.OutputFileAndClose(outputPath)
	if err != nil {
		return "", fmt.Errorf("failed to save PDF report: %w", err)
	}

	return outputPath, nil
}
