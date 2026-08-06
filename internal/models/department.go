package models

import (
	"time"

	"gorm.io/gorm"
)

type Department struct {
	ID          uint           `gorm:"primaryKey;autoIncrement" json:"id"`
	Code        string         `gorm:"size:20;not null;uniqueIndex" json:"code"`
	Name        string         `gorm:"size:100;not null" json:"name"`
	Description string         `gorm:"type:text" json:"description"`
	Courses     []Course       `gorm:"foreignKey:DepartmentID" json:"courses,omitempty"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"-"`
}

func (Department) TableName() string {
	return "departments"
}
