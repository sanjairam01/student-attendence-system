package repositories

import (
	"smart-attendance-system/internal/models"

	"gorm.io/gorm"
)

type FacultyRepository interface {
	Create(faculty *models.Faculty) error
	FindByID(id uint) (*models.Faculty, error)
	FindByUserID(userID uint) (*models.Faculty, error)
	ListAll() ([]models.Faculty, error)
	CountTotal() (int64, error)
}

type facultyRepository struct {
	db *gorm.DB
}

func NewFacultyRepository(db *gorm.DB) FacultyRepository {
	return &facultyRepository{db: db}
}

func (r *facultyRepository) Create(faculty *models.Faculty) error {
	return r.db.Create(faculty).Error
}

func (r *facultyRepository) FindByID(id uint) (*models.Faculty, error) {
	var faculty models.Faculty
	err := r.db.Preload("User").Preload("Department").First(&faculty, id).Error
	if err != nil {
		return nil, err
	}
	return &faculty, nil
}

func (r *facultyRepository) FindByUserID(userID uint) (*models.Faculty, error) {
	var faculty models.Faculty
	err := r.db.Preload("User").Preload("Department").Where("user_id = ?", userID).First(&faculty).Error
	if err != nil {
		return nil, err
	}
	return &faculty, nil
}

func (r *facultyRepository) ListAll() ([]models.Faculty, error) {
	var list []models.Faculty
	err := r.db.Preload("User").Preload("Department").Find(&list).Error
	return list, err
}

func (r *facultyRepository) CountTotal() (int64, error) {
	var count int64
	err := r.db.Model(&models.Faculty{}).Count(&count).Error
	return count, err
}
