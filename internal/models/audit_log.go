package models

import (
	"time"

	"gorm.io/gorm"
)

type AuditLog struct {
	ID        uint           `gorm:"primaryKey;autoIncrement" json:"id"`
	UserID    *uint          `gorm:"index" json:"user_id,omitempty"`
	User      *User          `gorm:"foreignKey:UserID" json:"user,omitempty"`
	Action    string         `gorm:"size:100;not null" json:"action"`
	Module    string         `gorm:"size:50;not null" json:"module"`
	IPAddress string         `gorm:"size:45" json:"ip_address"`
	Details   string         `gorm:"type:text" json:"details"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

func (AuditLog) TableName() string {
	return "audit_logs"
}
