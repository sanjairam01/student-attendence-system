package services

import (
	"smart-attendance-system/internal/models"
	"smart-attendance-system/internal/repositories"
)

type SettingsService interface {
	GetSetting(key string) (string, error)
	SaveSetting(key string, value string, description string) error
	ListSettings() ([]models.SystemSetting, error)
}

type settingsService struct {
	systemRepo repositories.SystemRepository
}

func NewSettingsService(systemRepo repositories.SystemRepository) SettingsService {
	return &settingsService{systemRepo: systemRepo}
}

func (s *settingsService) GetSetting(key string) (string, error) {
	return s.systemRepo.GetSetting(key)
}

func (s *settingsService) SaveSetting(key string, value string, description string) error {
	return s.systemRepo.SetSetting(key, value, description)
}

func (s *settingsService) ListSettings() ([]models.SystemSetting, error) {
	return s.systemRepo.GetAllSettings()
}
