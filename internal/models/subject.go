package models

import (
	"time"

	"gorm.io/gorm"
)

type Subject struct {
	ID        uint           `gorm:"primaryKey;autoIncrement" json:"id"`
	CourseID  uint           `gorm:"not null;index" json:"course_id"`
	Course    *Course        `gorm:"foreignKey:CourseID" json:"course,omitempty"`
	Code      string         `gorm:"size:20;not null;uniqueIndex" json:"code"`
	Name      string         `gorm:"size:150;not null" json:"name"`
	Semester  int            `gorm:"not null" json:"semester"`
	Credits   int            `gorm:"default:3;not null" json:"credits"`
	Type      string         `gorm:"size:20;default:'Theory'" json:"type"` // Theory, Practical, Elective
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

func (Subject) TableName() string {
	return "subjects"
}
