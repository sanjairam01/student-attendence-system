package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	ID                uint           `gorm:"primaryKey;autoIncrement" json:"id"`
	RoleID            uint           `gorm:"not null;index" json:"role_id"`
	Role              Role           `gorm:"foreignKey:RoleID" json:"role,omitempty"`
	Email             string         `gorm:"size:100;not null;uniqueIndex" json:"email"`
	PasswordHash      string         `gorm:"size:255;not null" json:"-"`
	FirstName         string         `gorm:"size:50;not null" json:"first_name"`
	LastName          string         `gorm:"size:50;not null" json:"last_name"`
	Phone             string         `gorm:"size:20" json:"phone"`
	IsActive          bool           `gorm:"default:true" json:"is_active"`
	IsVerified        bool           `gorm:"default:false" json:"is_verified"`
	VerificationToken string         `gorm:"size:255" json:"-"`
	AvatarURL         string         `gorm:"size:255" json:"avatar_url"`
	LastLogin         *time.Time     `json:"last_login"`
	CreatedAt         time.Time      `json:"created_at"`
	UpdatedAt         time.Time      `json:"updated_at"`
	DeletedAt         gorm.DeletedAt `gorm:"index" json:"-"`
}

func (User) TableName() string {
	return "users"
}

func (u *User) FullName() string {
	return u.FirstName + " " + u.LastName
}
