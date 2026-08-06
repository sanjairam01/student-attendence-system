package models

import (
	"time"

	"gorm.io/gorm"
)

type Student struct {
	ID              uint           `gorm:"primaryKey;autoIncrement" json:"id"`
	UserID          uint           `gorm:"not null;uniqueIndex" json:"user_id"`
	User            User           `gorm:"foreignKey:UserID" json:"user"`
	ParentID        *uint          `gorm:"index" json:"parent_id,omitempty"`
	Parent          *Parent        `gorm:"foreignKey:ParentID" json:"parent,omitempty"`
	DepartmentID    uint           `gorm:"not null;index" json:"department_id"`
	Department      *Department    `gorm:"foreignKey:DepartmentID" json:"department,omitempty"`
	CourseID        uint           `gorm:"not null;index" json:"course_id"`
	Course          *Course        `gorm:"foreignKey:CourseID" json:"course,omitempty"`
	RollNumber      string         `gorm:"size:50;not null;uniqueIndex" json:"roll_number"`
	RegistrationNo  string         `gorm:"size:50;not null;uniqueIndex" json:"registration_no"`
	CurrentSemester int            `gorm:"default:1;not null" json:"current_semester"`
	Section         string         `gorm:"size:10;default:'A';not null" json:"section"`
	BatchYear       int            `gorm:"not null" json:"batch_year"`
	DOB             *time.Time     `json:"dob,omitempty"`
	Gender          string         `gorm:"size:10;default:'Male'" json:"gender"`
	BloodGroup      string         `gorm:"size:5" json:"blood_group,omitempty"`
	CreatedAt       time.Time      `json:"created_at"`
	UpdatedAt       time.Time      `json:"updated_at"`
	DeletedAt       gorm.DeletedAt `gorm:"index" json:"-"`
}

func (Student) TableName() string {
	return "students"
}
