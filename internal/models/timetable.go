package models

import (
	"time"

	"gorm.io/gorm"
)

type Timetable struct {
	ID        uint           `gorm:"primaryKey;autoIncrement" json:"id"`
	ClassID   uint           `gorm:"not null;index" json:"class_id"`
	Class     *Class         `gorm:"foreignKey:ClassID" json:"class,omitempty"`
	DayOfWeek string         `gorm:"size:20;not null;index" json:"day_of_week"` // Monday..Saturday
	StartTime string         `gorm:"size:10;not null" json:"start_time"`        // HH:MM:SS
	EndTime   string         `gorm:"size:10;not null" json:"end_time"`          // HH:MM:SS
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

func (Timetable) TableName() string {
	return "timetables"
}
