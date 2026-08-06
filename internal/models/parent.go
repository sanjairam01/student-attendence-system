package models

import (
	"time"

	"gorm.io/gorm"
)

type Parent struct {
	ID         uint           `gorm:"primaryKey;autoIncrement" json:"id"`
	UserID     uint           `gorm:"not null;uniqueIndex" json:"user_id"`
	User       User           `gorm:"foreignKey:UserID" json:"user"`
	Occupation string         `gorm:"size:100" json:"occupation"`
	Address    string         `gorm:"type:text" json:"address"`
	Students   []Student      `gorm:"foreignKey:ParentID" json:"students,omitempty"`
	CreatedAt  time.Time      `json:"created_at"`
	UpdatedAt  time.Time      `json:"updated_at"`
	DeletedAt  gorm.DeletedAt `gorm:"index" json:"-"`
}

func (Parent) TableName() string {
	return "parents"
}
