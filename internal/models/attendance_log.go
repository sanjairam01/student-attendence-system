package models

import (
	"time"

	"gorm.io/gorm"
)

type AttendanceLog struct {
	ID               uint           `gorm:"primaryKey;autoIncrement" json:"id"`
	AttendanceID     uint           `gorm:"not null;index" json:"attendance_id"`
	Attendance       *Attendance    `gorm:"foreignKey:AttendanceID" json:"attendance,omitempty"`
	ChangedByUserID uint           `gorm:"not null;index" json:"changed_by_user_id"`
	ChangedByUser    *User          `gorm:"foreignKey:ChangedByUserID" json:"changed_by_user,omitempty"`
	OldStatus        string         `gorm:"size:20;not null" json:"old_status"`
	NewStatus        string         `gorm:"size:20;not null" json:"new_status"`
	Reason           string         `gorm:"type:text" json:"reason"`
	CreatedAt        time.Time      `json:"created_at"`
	UpdatedAt        time.Time      `json:"updated_at"`
	DeletedAt        gorm.DeletedAt `gorm:"index" json:"-"`
}

func (AttendanceLog) TableName() string {
	return "attendance_logs"
}
