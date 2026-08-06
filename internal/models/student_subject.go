package models

import (
	"time"

	"gorm.io/gorm"
)

type StudentSubject struct {
	ID           uint           `gorm:"primaryKey;autoIncrement" json:"id"`
	StudentID    uint           `gorm:"not null;index" json:"student_id"`
	Student      *Student       `gorm:"foreignKey:StudentID" json:"student,omitempty"`
	SubjectID    uint           `gorm:"not null;index" json:"subject_id"`
	Subject      *Subject       `gorm:"foreignKey:SubjectID" json:"subject,omitempty"`
	AcademicYear string         `gorm:"size:20;not null" json:"academic_year"`
	CreatedAt    time.Time      `json:"created_at"`
	UpdatedAt    time.Time      `json:"updated_at"`
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"-"`
}

func (StudentSubject) TableName() string {
	return "student_subjects"
}
