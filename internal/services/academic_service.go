package services

import (
	"smart-attendance-system/internal/models"
	"smart-attendance-system/internal/repositories"
)

type AcademicService interface {
	GetDepartments() ([]models.Department, error)
	GetCourses(deptID uint) ([]models.Course, error)
	GetSubjects(courseID uint, semester int) ([]models.Subject, error)
}

type academicService struct {
	academicRepo repositories.AcademicRepository
}

func NewAcademicService(academicRepo repositories.AcademicRepository) AcademicService {
	return &academicService{academicRepo: academicRepo}
}

func (s *academicService) GetDepartments() ([]models.Department, error) {
	return s.academicRepo.ListDepartments()
}

func (s *academicService) GetCourses(deptID uint) ([]models.Course, error) {
	return s.academicRepo.ListCoursesByDept(deptID)
}

func (s *academicService) GetSubjects(courseID uint, semester int) ([]models.Subject, error) {
	return s.academicRepo.ListSubjectsByCourse(courseID, semester)
}
