package services

import (
	"smart-attendance-system/internal/models"
	"smart-attendance-system/internal/repositories"
)

type FacultyService interface {
	GetFacultyProfile(userID uint) (*models.Faculty, error)
	GetAssignedClasses(facultyID uint) ([]models.Class, error)
}

type facultyService struct {
	facultyRepo  repositories.FacultyRepository
	academicRepo repositories.AcademicRepository
}

func NewFacultyService(facultyRepo repositories.FacultyRepository, academicRepo repositories.AcademicRepository) FacultyService {
	return &facultyService{facultyRepo: facultyRepo, academicRepo: academicRepo}
}

func (s *facultyService) GetFacultyProfile(userID uint) (*models.Faculty, error) {
	return s.facultyRepo.FindByUserID(userID)
}

func (s *facultyService) GetAssignedClasses(facultyID uint) ([]models.Class, error) {
	return s.academicRepo.ListClassesByFaculty(facultyID)
}
