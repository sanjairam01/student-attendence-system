package services

import (
	"fmt"
	"path/filepath"

	"smart-attendance-system/internal/repositories"
	"smart-attendance-system/internal/utils"
)

type ReportService interface {
	GenerateAttendanceExcelReport(deptID, courseID uint, semester int) (string, error)
	GenerateAttendancePDFReport(deptID, courseID uint, semester int) (string, error)
}

type reportService struct {
	studentRepo    repositories.StudentRepository
	attendanceRepo repositories.AttendanceRepository
}

func NewReportService(studentRepo repositories.StudentRepository, attendanceRepo repositories.AttendanceRepository) ReportService {
	return &reportService{studentRepo: studentRepo, attendanceRepo: attendanceRepo}
}

func (s *reportService) gatherReportRows(deptID, courseID uint, semester int) ([]utils.AttendanceReportRow, error) {
	students, err := s.studentRepo.ListByDepartmentAndCourse(deptID, courseID, uint(semester))
	if err != nil {
		return nil, err
	}

	var rows []utils.AttendanceReportRow
	for _, st := range students {
		total, attended, pct, _ := s.attendanceRepo.GetStudentSummary(st.ID)
		status := "Eligible"
		if pct < 75.0 {
			status = "Deficit (Warning)"
		}

		rows = append(rows, utils.AttendanceReportRow{
			RollNo:       st.RollNumber,
			StudentName:  st.User.FullName(),
			Department:   st.Department.Code,
			Subject:      "All Enrolled Subjects",
			TotalClasses: total,
			Attended:     attended,
			Percentage:   pct,
			Status:       status,
		})
	}
	return rows, nil
}

func (s *reportService) GenerateAttendanceExcelReport(deptID, courseID uint, semester int) (string, error) {
	rows, err := s.gatherReportRows(deptID, courseID, semester)
	if err != nil {
		return "", err
	}

	outPath := filepath.Join("./reports", fmt.Sprintf("Attendance_Report_%d.xlsx", timeNowUnix()))
	return utils.GenerateAttendanceExcel(rows, outPath)
}

func (s *reportService) GenerateAttendancePDFReport(deptID, courseID uint, semester int) (string, error) {
	rows, err := s.gatherReportRows(deptID, courseID, semester)
	if err != nil {
		return "", err
	}

	outPath := filepath.Join("./reports", fmt.Sprintf("Attendance_Report_%d.pdf", timeNowUnix()))
	return utils.GenerateAttendancePDF("Smart Attendance Official Report", rows, outPath)
}

func timeNowUnix() int64 {
	return 1700000000
}
