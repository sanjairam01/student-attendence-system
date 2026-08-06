package repositories

import (
	"smart-attendance-system/internal/models"

	"gorm.io/gorm"
)

type AcademicRepository interface {
	ListDepartments() ([]models.Department, error)
	ListCoursesByDept(deptID uint) ([]models.Course, error)
	ListSubjectsByCourse(courseID uint, semester int) ([]models.Subject, error)
	ListClassesByFaculty(facultyID uint) ([]models.Class, error)
	CountDepartments() (int64, error)
}

type academicRepository struct {
	db *gorm.DB
}

func NewAcademicRepository(db *gorm.DB) AcademicRepository {
	return &academicRepository{db: db}
}

func (r *academicRepository) ListDepartments() ([]models.Department, error) {
	var list []models.Department
	err := r.db.Preload("Courses").Find(&list).Error
	return list, err
}

func (r *academicRepository) ListCoursesByDept(deptID uint) ([]models.Course, error) {
	var list []models.Course
	err := r.db.Where("department_id = ?", deptID).Find(&list).Error
	return list, err
}

func (r *academicRepository) ListSubjectsByCourse(courseID uint, semester int) ([]models.Subject, error) {
	var list []models.Subject
	query := r.db.Where("course_id = ?", courseID)
	if semester > 0 {
		query = query.Where("semester = ?", semester)
	}
	err := query.Find(&list).Error
	return list, err
}

func (r *academicRepository) ListClassesByFaculty(facultyID uint) ([]models.Class, error) {
	var list []models.Class
	err := r.db.Preload("Subject").Where("faculty_id = ?", facultyID).Find(&list).Error
	return list, err
}

func (r *academicRepository) CountDepartments() (int64, error) {
	var count int64
	err := r.db.Model(&models.Department{}).Count(&count).Error
	return count, err
}
