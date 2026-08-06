package models

import (
	"time"

	"gorm.io/gorm"
)

type Course struct {
	ID             uint           `gorm:"primaryKey;autoIncrement" json:"id"`
	DepartmentID   uint           `gorm:"not null;index" json:"department_id"`
	Department     *Department    `gorm:"foreignKey:DepartmentID" json:"department,omitempty"`
	Code           string         `gorm:"size:20;not null;uniqueIndex" json:"code"`
	Name           string         `gorm:"size:100;not null" json:"name"`
	DurationYears  int            `gorm:"default:4;not null" json:"duration_years"`
	TotalSemesters int            `gorm:"default:8;not null" json:"total_semesters"`
	Subjects       []Subject      `gorm:"foreignKey:CourseID" json:"subjects,omitempty"`
	CreatedAt      time.Time      `json:"created_at"`
	UpdatedAt      time.Time      `json:"updated_at"`
	DeletedAt      gorm.DeletedAt `gorm:"index" json:"-"`
}

func (Course) TableName() string {
	return "courses"
}
