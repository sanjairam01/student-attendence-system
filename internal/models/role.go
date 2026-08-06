package models

import (
	"time"

	"gorm.io/gorm"
)

const (
	RoleSuperAdmin = "SuperAdmin"
	RoleAdmin      = "Admin"
	RoleFaculty    = "Faculty"
	RoleStudent    = "Student"
	RoleParent     = "Parent"
)

type Role struct {
	ID          uint           `gorm:"primaryKey;autoIncrement" json:"id"`
	Name        string         `gorm:"size:50;not null;uniqueIndex" json:"name"`
	Description string         `gorm:"size:255" json:"description"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"-"`
}

func (Role) TableName() string {
	return "roles"
}
