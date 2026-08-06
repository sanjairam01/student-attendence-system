package models

import (
	"time"

	"gorm.io/gorm"
)

type Admin struct {
	ID          uint           `gorm:"primaryKey;autoIncrement" json:"id"`
	UserID      uint           `gorm:"not null;uniqueIndex" json:"user_id"`
	User        User           `gorm:"foreignKey:UserID" json:"user"`
	EmployeeID  string         `gorm:"size:50;not null;uniqueIndex" json:"employee_id"`
	Designation string         `gorm:"size:100;default:'Administrator'" json:"designation"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"-"`
}

func (Admin) TableName() string {
	return "admins"
}
