package services

import (
	"fmt"
	"time"

	"smart-attendance-system/internal/models"
	"smart-attendance-system/internal/repositories"
	"smart-attendance-system/internal/utils"
)

type AttendanceService interface {
	MarkBulkAttendance(facultyUserID uint, req models.BulkAttendanceRequest) error
	GetClassAttendance(classID uint, dateStr string) ([]models.Attendance, error)
}

type attendanceService struct {
	attendanceRepo repositories.AttendanceRepository
	facultyRepo    repositories.FacultyRepository
}

func NewAttendanceService(attendanceRepo repositories.AttendanceRepository, facultyRepo repositories.FacultyRepository) AttendanceService {
	return &attendanceService{attendanceRepo: attendanceRepo, facultyRepo: facultyRepo}
}

func (s *attendanceService) MarkBulkAttendance(facultyUserID uint, req models.BulkAttendanceRequest) error {
	faculty, err := s.facultyRepo.FindByUserID(facultyUserID)
	if err != nil {
		return fmt.Errorf("faculty record not found for user: %w", err)
	}

	date, err := utils.ParseDate(req.Date)
	if err != nil {
		return fmt.Errorf("invalid date format: %w", err)
	}

	method := req.MarkedMethod
	if method == "" {
		method = "Manual"
	}

	var records []models.Attendance
	for _, rec := range req.Records {
		records = append(records, models.Attendance{
			ClassID:      req.ClassID,
			StudentID:    rec.StudentID,
			FacultyID:    faculty.ID,
			Date:         date,
			Status:       rec.Status,
			Remarks:      rec.Remarks,
			MarkedMethod: method,
		})
	}

	return s.attendanceRepo.SaveBatch(records)
}

func (s *attendanceService) GetClassAttendance(classID uint, dateStr string) ([]models.Attendance, error) {
	date, err := utils.ParseDate(dateStr)
	if err != nil {
		date = time.Now()
	}
	return s.attendanceRepo.GetClassAttendanceForDate(classID, date)
}
