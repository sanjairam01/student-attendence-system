package utils

import (
	"fmt"
	"os"
	"path/filepath"

	"github.com/xuri/excelize/v2"
)

type AttendanceReportRow struct {
	RollNo      string
	StudentName string
	Department  string
	Subject     string
	TotalClasses int
	Attended    int
	Percentage  float64
	Status      string
}

// GenerateAttendanceExcel builds an XLSX report file from attendance records
func GenerateAttendanceExcel(rows []AttendanceReportRow, outputPath string) (string, error) {
	f := excelize.NewFile()
	defer func() {
		_ = f.Close()
	}()

	sheetName := "Attendance Summary"
	index, err := f.NewSheet(sheetName)
	if err != nil {
		return "", err
	}
	f.SetActiveSheet(index)
	_ = f.DeleteSheet("Sheet1")

	// Set Headers
	headers := []string{"Roll No", "Student Name", "Department", "Subject", "Total Classes", "Attended", "Percentage (%)", "Status"}
	for i, header := range headers {
		cell := fmt.Sprintf("%c1", 'A'+i)
		_ = f.SetCellValue(sheetName, cell, header)
	}

	// Populate Rows
	for rIdx, row := range rows {
		rowNum := rIdx + 2
		_ = f.SetCellValue(sheetName, fmt.Sprintf("A%d", rowNum), row.RollNo)
		_ = f.SetCellValue(sheetName, fmt.Sprintf("B%d", rowNum), row.StudentName)
		_ = f.SetCellValue(sheetName, fmt.Sprintf("C%d", rowNum), row.Department)
		_ = f.SetCellValue(sheetName, fmt.Sprintf("D%d", rowNum), row.Subject)
		_ = f.SetCellValue(sheetName, fmt.Sprintf("E%d", rowNum), row.TotalClasses)
		_ = f.SetCellValue(sheetName, fmt.Sprintf("F%d", rowNum), row.Attended)
		_ = f.SetCellValue(sheetName, fmt.Sprintf("G%d", rowNum), fmt.Sprintf("%.2f%%", row.Percentage))
		_ = f.SetCellValue(sheetName, fmt.Sprintf("H%d", rowNum), row.Status)
	}

	if err := os.MkdirAll(filepath.Dir(outputPath), 0755); err != nil {
		return "", err
	}

	if err := f.SaveAs(outputPath); err != nil {
		return "", fmt.Errorf("failed to save Excel report: %w", err)
	}

	return outputPath, nil
}
