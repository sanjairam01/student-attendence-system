package services

import (
	"smart-attendance-system/internal/models"
	"smart-attendance-system/internal/repositories"
)

type NotificationService interface {
	GetUserNotifications(userID uint) ([]models.Notification, error)
	MarkRead(notificationID uint, userID uint) error
	SendNotification(userID uint, title, message, nType string) error
}

type notificationService struct {
	notifRepo repositories.NotificationRepository
}

func NewNotificationService(notifRepo repositories.NotificationRepository) NotificationService {
	return &notificationService{notifRepo: notifRepo}
}

func (s *notificationService) GetUserNotifications(userID uint) ([]models.Notification, error) {
	return s.notifRepo.ListByUser(userID)
}

func (s *notificationService) MarkRead(notificationID uint, userID uint) error {
	return s.notifRepo.MarkAsRead(notificationID, userID)
}

func (s *notificationService) SendNotification(userID uint, title, message, nType string) error {
	return s.notifRepo.Create(&models.Notification{
		UserID:  userID,
		Title:   title,
		Message: message,
		Type:    nType,
		IsRead:  false,
	})
}
