package models

import (
	"time"

	"gorm.io/gorm"
)

const (
	AttendancePresent = "Present"
	AttendanceAbsent  = "Absent"
	AttendanceLate    = "Late"
	AttendanceExcused = "Excused"
)

type Attendance struct {
	ID           uint           `gorm:"primaryKey;autoIncrement" json:"id"`
	ClassID      uint           `gorm:"not null;index" json:"class_id"`
	Class        *Class         `gorm:"foreignKey:ClassID" json:"class,omitempty"`
	StudentID    uint           `gorm:"not null;index" json:"student_id"`
	Student      *Student       `gorm:"foreignKey:StudentID" json:"student,omitempty"`
	FacultyID    uint           `gorm:"not null;index" json:"faculty_id"`
	Faculty      *Faculty       `gorm:"foreignKey:FacultyID" json:"faculty,omitempty"`
	Date         time.Time      `gorm:"type:date;not null;index" json:"date"`
	Status       string         `gorm:"size:20;default:'Present';not null;index" json:"status"`
	Remarks      string         `gorm:"size:255" json:"remarks,omitempty"`
	MarkedMethod string         `gorm:"size:20;default:'Manual'" json:"marked_method"` // Manual, QR, Biometric, Web
	CreatedAt    time.Time      `json:"created_at"`
	UpdatedAt    time.Time      `json:"updated_at"`
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"-"`
}

func (Attendance) TableName() string {
	return "attendance"
}
