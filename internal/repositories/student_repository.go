package repositories

import (
	"smart-attendance-system/internal/models"

	"gorm.io/gorm"
)

type StudentRepository interface {
	Create(student *models.Student) error
	FindByID(id uint) (*models.Student, error)
	FindByUserID(userID uint) (*models.Student, error)
	FindByRollNumber(rollNo string) (*models.Student, error)
	ListByDepartmentAndCourse(deptID, courseID, semester uint) ([]models.Student, error)
	Update(student *models.Student) error
	Delete(id uint) error
	CountTotal() (int64, error)
}

type studentRepository struct {
	db *gorm.DB
}

func NewStudentRepository(db *gorm.DB) StudentRepository {
	return &studentRepository{db: db}
}

func (r *studentRepository) Create(student *models.Student) error {
	return r.db.Create(student).Error
}

func (r *studentRepository) FindByID(id uint) (*models.Student, error) {
	var student models.Student
	err := r.db.Preload("User").Preload("User.Role").Preload("Department").Preload("Course").Preload("Parent").Preload("Parent.User").First(&student, id).Error
	if err != nil {
		return nil, err
	}
	return &student, nil
}

func (r *studentRepository) FindByUserID(userID uint) (*models.Student, error) {
	var student models.Student
	err := r.db.Preload("User").Preload("Department").Preload("Course").Where("user_id = ?", userID).First(&student).Error
	if err != nil {
		return nil, err
	}
	return &student, nil
}

func (r *studentRepository) FindByRollNumber(rollNo string) (*models.Student, error) {
	var student models.Student
	err := r.db.Preload("User").Preload("Department").Preload("Course").Where("roll_number = ?", rollNo).First(&student).Error
	if err != nil {
		return nil, err
	}
	return &student, nil
}

func (r *studentRepository) ListByDepartmentAndCourse(deptID, courseID, semester uint) ([]models.Student, error) {
	var students []models.Student
	query := r.db.Preload("User").Preload("Department").Preload("Course")

	if deptID > 0 {
		query = query.Where("department_id = ?", deptID)
	}
	if courseID > 0 {
		query = query.Where("course_id = ?", courseID)
	}
	if semester > 0 {
		query = query.Where("current_semester = ?", semester)
	}

	err := query.Find(&students).Error
	return students, err
}

func (r *studentRepository) Update(student *models.Student) error {
	return r.db.Save(student).Error
}

func (r *studentRepository) Delete(id uint) error {
	return r.db.Delete(&models.Student{}, id).Error
}

func (r *studentRepository) CountTotal() (int64, error) {
	var count int64
	err := r.db.Model(&models.Student{}).Count(&count).Error
	return count, err
}
