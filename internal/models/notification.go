package models

import (
	"time"

	"gorm.io/gorm"
)

type Notification struct {
	ID        uint           `gorm:"primaryKey;autoIncrement" json:"id"`
	UserID    uint           `gorm:"not null;index" json:"user_id"`
	User      *User          `gorm:"foreignKey:UserID" json:"user,omitempty"`
	Title     string         `gorm:"size:150;not null" json:"title"`
	Message   string         `gorm:"type:text;not null" json:"message"`
	Type      string         `gorm:"size:20;default:'Info'" json:"type"` // Info, Warning, Alert, Attendance, Leave
	IsRead    bool           `gorm:"default:false" json:"is_read"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

func (Notification) TableName() string {
	return "notifications"
}
