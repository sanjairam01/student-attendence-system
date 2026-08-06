package models

import (
	"time"

	"gorm.io/gorm"
)

type Faculty struct {
	ID             uint           `gorm:"primaryKey;autoIncrement" json:"id"`
	UserID         uint           `gorm:"not null;uniqueIndex" json:"user_id"`
	User           User           `gorm:"foreignKey:UserID" json:"user"`
	DepartmentID   uint           `gorm:"not null;index" json:"department_id"`
	Department     *Department    `gorm:"foreignKey:DepartmentID" json:"department,omitempty"`
	EmployeeCode   string         `gorm:"size:50;not null;uniqueIndex" json:"employee_code"`
	Designation    string         `gorm:"size:100;not null" json:"designation"`
	Specialization string         `gorm:"size:150" json:"specialization"`
	JoiningDate    *time.Time     `json:"joining_date"`
	CreatedAt      time.Time      `json:"created_at"`
	UpdatedAt      time.Time      `json:"updated_at"`
	DeletedAt      gorm.DeletedAt `gorm:"index" json:"-"`
}

func (Faculty) TableName() string {
	return "faculty"
}
