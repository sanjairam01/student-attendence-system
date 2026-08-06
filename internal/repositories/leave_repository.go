package repositories

import (
	"smart-attendance-system/internal/models"

	"gorm.io/gorm"
)

type LeaveRepository interface {
	Create(leave *models.LeaveRequest) error
	FindByID(id uint) (*models.LeaveRequest, error)
	ListByStudent(studentID uint) ([]models.LeaveRequest, error)
	ListPending() ([]models.LeaveRequest, error)
	Update(leave *models.LeaveRequest) error
}

type leaveRepository struct {
	db *gorm.DB
}

func NewLeaveRepository(db *gorm.DB) LeaveRepository {
	return &leaveRepository{db: db}
}

func (r *leaveRepository) Create(leave *models.LeaveRequest) error {
	return r.db.Create(leave).Error
}

func (r *leaveRepository) FindByID(id uint) (*models.LeaveRequest, error) {
	var leave models.LeaveRequest
	err := r.db.Preload("Student").Preload("Student.User").First(&leave, id).Error
	if err != nil {
		return nil, err
	}
	return &leave, nil
}

func (r *leaveRepository) ListByStudent(studentID uint) ([]models.LeaveRequest, error) {
	var list []models.LeaveRequest
	err := r.db.Where("student_id = ?", studentID).Order("created_at desc").Find(&list).Error
	return list, err
}

func (r *leaveRepository) ListPending() ([]models.LeaveRequest, error) {
	var list []models.LeaveRequest
	err := r.db.Preload("Student").Preload("Student.User").Where("status = ?", models.LeavePending).Order("created_at asc").Find(&list).Error
	return list, err
}

func (r *leaveRepository) Update(leave *models.LeaveRequest) error {
	return r.db.Save(leave).Error
}
