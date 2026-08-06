package repositories

import (
	"smart-attendance-system/internal/models"

	"gorm.io/gorm"
)

type SystemRepository interface {
	GetSetting(key string) (string, error)
	SetSetting(key string, value string, description string) error
	GetAllSettings() ([]models.SystemSetting, error)
}

type systemRepository struct {
	db *gorm.DB
}

func NewSystemRepository(db *gorm.DB) SystemRepository {
	return &systemRepository{db: db}
}

func (r *systemRepository) GetSetting(key string) (string, error) {
	var setting models.SystemSetting
	err := r.db.Where("setting_key = ?", key).First(&setting).Error
	if err != nil {
		return "", err
	}
	return setting.SettingValue, nil
}

func (r *systemRepository) SetSetting(key string, value string, description string) error {
	var setting models.SystemSetting
	err := r.db.Where("setting_key = ?", key).First(&setting).Error
	if err == nil {
		setting.SettingValue = value
		if description != "" {
			setting.Description = description
		}
		return r.db.Save(&setting).Error
	}
	return r.db.Create(&models.SystemSetting{
		SettingKey:   key,
		SettingValue: value,
		Description:  description,
	}).Error
}

func (r *systemRepository) GetAllSettings() ([]models.SystemSetting, error) {
	var settings []models.SystemSetting
	err := r.db.Find(&settings).Error
	return settings, err
}
