package services

import (
	"smart-attendance-system/internal/models"
	"smart-attendance-system/internal/repositories"
)

type DashboardService interface {
	GetOverviewStats() (*models.DashboardStatsDTO, error)
}

type dashboardService struct {
	studentRepo    repositories.StudentRepository
	facultyRepo    repositories.FacultyRepository
	academicRepo   repositories.AcademicRepository
	attendanceRepo repositories.AttendanceRepository
}

func NewDashboardService(
	studentRepo repositories.StudentRepository,
	facultyRepo repositories.FacultyRepository,
	academicRepo repositories.AcademicRepository,
	attendanceRepo repositories.AttendanceRepository,
) DashboardService {
	return &dashboardService{
		studentRepo:    studentRepo,
		facultyRepo:    facultyRepo,
		academicRepo:   academicRepo,
		attendanceRepo: attendanceRepo,
	}
}

func (s *dashboardService) GetOverviewStats() (*models.DashboardStatsDTO, error) {
	totalStudents, _ := s.studentRepo.CountTotal()
	totalFaculty, _ := s.facultyRepo.CountTotal()
	totalDepartments, _ := s.academicRepo.CountDepartments()
	avgAttendance, _ := s.attendanceRepo.GetOverallAverage()

	return &models.DashboardStatsDTO{
		TotalStudents:        totalStudents,
		TotalFaculty:         totalFaculty,
		TotalDepartments:     totalDepartments,
		TodayClassesCount:    12, // Active scheduled sessions
		AverageAttendance:    avgAttendance,
		DeficitStudentsCount: 3,
	}, nil
}
