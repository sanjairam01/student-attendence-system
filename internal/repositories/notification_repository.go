package repositories

import (
	"smart-attendance-system/internal/models"

	"gorm.io/gorm"
)

type NotificationRepository interface {
	Create(notification *models.Notification) error
	ListByUser(userID uint) ([]models.Notification, error)
	MarkAsRead(id uint, userID uint) error
}

type notificationRepository struct {
	db *gorm.DB
}

func NewNotificationRepository(db *gorm.DB) NotificationRepository {
	return &notificationRepository{db: db}
}

func (r *notificationRepository) Create(n *models.Notification) error {
	return r.db.Create(n).Error
}

func (r *notificationRepository) ListByUser(userID uint) ([]models.Notification, error) {
	var list []models.Notification
	err := r.db.Where("user_id = ?", userID).Order("created_at desc").Limit(50).Find(&list).Error
	return list, err
}

func (r *notificationRepository) MarkAsRead(id uint, userID uint) error {
	return r.db.Model(&models.Notification{}).Where("id = ? AND user_id = ?", id, userID).Update("is_read", true).Error
}
