package models

import (
	"time"

	"gorm.io/gorm"
)

type SystemSetting struct {
	ID          uint           `gorm:"primaryKey;autoIncrement" json:"id"`
	SettingKey  string         `gorm:"size:100;not null;uniqueIndex" json:"setting_key"`
	SettingValue string        `gorm:"type:text;not null" json:"setting_value"`
	Description string         `gorm:"size:255" json:"description"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"-"`
}

func (SystemSetting) TableName() string {
	return "system_settings"
}
