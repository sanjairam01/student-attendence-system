package repositories

import (
	"smart-attendance-system/internal/models"

	"gorm.io/gorm"
)

type AuditRepository interface {
	LogAction(log *models.AuditLog) error
	ListLogs(limit int) ([]models.AuditLog, error)
}

type auditRepository struct {
	db *gorm.DB
}

func NewAuditRepository(db *gorm.DB) AuditRepository {
	return &auditRepository{db: db}
}

func (r *auditRepository) LogAction(log *models.AuditLog) error {
	return r.db.Create(log).Error
}

func (r *auditRepository) ListLogs(limit int) ([]models.AuditLog, error) {
	var logs []models.AuditLog
	err := r.db.Preload("User").Order("created_at desc").Limit(limit).Find(&logs).Error
	return logs, err
}
