package services

import (
	"smart-attendance-system/internal/models"
	"smart-attendance-system/internal/repositories"
)

type StudentService interface {
	GetStudentProfile(userID uint) (*models.Student, error)
	GetStudentAttendanceStats(studentID uint) (int, int, float64, error)
	ListStudents(deptID, courseID, semester uint) ([]models.Student, error)
}

type studentService struct {
	studentRepo    repositories.StudentRepository
	attendanceRepo repositories.AttendanceRepository
}

func NewStudentService(studentRepo repositories.StudentRepository, attendanceRepo repositories.AttendanceRepository) StudentService {
	return &studentService{studentRepo: studentRepo, attendanceRepo: attendanceRepo}
}

func (s *studentService) GetStudentProfile(userID uint) (*models.Student, error) {
	return s.studentRepo.FindByUserID(userID)
}

func (s *studentService) GetStudentAttendanceStats(studentID uint) (int, int, float64, error) {
	return s.attendanceRepo.GetStudentSummary(studentID)
}

func (s *studentService) ListStudents(deptID, courseID, semester uint) ([]models.Student, error) {
	return s.studentRepo.ListByDepartmentAndCourse(deptID, courseID, semester)
}
