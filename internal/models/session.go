package models

import (
	"time"

	"gorm.io/gorm"
)

type Session struct {
	ID        string         `gorm:"size:100;primaryKey" json:"id"`
	UserID    uint           `gorm:"not null;index" json:"user_id"`
	User      *User          `gorm:"foreignKey:UserID" json:"user,omitempty"`
	IPAddress string         `gorm:"size:45;not null" json:"ip_address"`
	UserAgent string         `gorm:"type:text;not null" json:"user_agent"`
	ExpiresAt time.Time      `gorm:"not null" json:"expires_at"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

func (Session) TableName() string {
	return "sessions"
}
