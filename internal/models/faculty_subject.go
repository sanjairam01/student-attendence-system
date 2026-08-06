package models

import (
	"time"

	"gorm.io/gorm"
)

type FacultySubject struct {
	ID           uint           `gorm:"primaryKey;autoIncrement" json:"id"`
	FacultyID    uint           `gorm:"not null;index" json:"faculty_id"`
	Faculty      *Faculty       `gorm:"foreignKey:FacultyID" json:"faculty,omitempty"`
	SubjectID    uint           `gorm:"not null;index" json:"subject_id"`
	Subject      *Subject       `gorm:"foreignKey:SubjectID" json:"subject,omitempty"`
	AcademicYear string         `gorm:"size:20;not null" json:"academic_year"`
	CreatedAt    time.Time      `json:"created_at"`
	UpdatedAt    time.Time      `json:"updated_at"`
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"-"`
}

func (FacultySubject) TableName() string {
	return "faculty_subjects"
}
