package models

import (
	"time"

	"gorm.io/gorm"
)

type Class struct {
	ID           uint           `gorm:"primaryKey;autoIncrement" json:"id"`
	SubjectID    uint           `gorm:"not null;index" json:"subject_id"`
	Subject      *Subject       `gorm:"foreignKey:SubjectID" json:"subject,omitempty"`
	FacultyID    uint           `gorm:"not null;index" json:"faculty_id"`
	Faculty      *Faculty       `gorm:"foreignKey:FacultyID" json:"faculty,omitempty"`
	AcademicYear string         `gorm:"size:20;not null" json:"academic_year"`
	Semester     int            `gorm:"not null" json:"semester"`
	Section      string         `gorm:"size:10;not null" json:"section"`
	RoomNo       string         `gorm:"size:50" json:"room_no"`
	CreatedAt    time.Time      `json:"created_at"`
	UpdatedAt    time.Time      `json:"updated_at"`
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"-"`
}

func (Class) TableName() string {
	return "classes"
}
