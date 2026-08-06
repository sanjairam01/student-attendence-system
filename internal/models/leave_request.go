package models

import (
	"time"

	"gorm.io/gorm"
)

const (
	LeavePending  = "Pending"
	LeaveApproved = "Approved"
	LeaveRejected = "Rejected"
)

type LeaveRequest struct {
	ID                   uint           `gorm:"primaryKey;autoIncrement" json:"id"`
	StudentID            uint           `gorm:"not null;index" json:"student_id"`
	Student              *Student       `gorm:"foreignKey:StudentID" json:"student,omitempty"`
	StartDate            time.Time      `gorm:"type:date;not null" json:"start_date"`
	EndDate              time.Time      `gorm:"type:date;not null" json:"end_date"`
	Reason               string         `gorm:"type:text;not null" json:"reason"`
	ProofDocumentURL     string         `gorm:"size:255" json:"proof_document_url,omitempty"`
	Status               string         `gorm:"size:20;default:'Pending';not null;index" json:"status"`
	ReviewedByFacultyID *uint          `gorm:"index" json:"reviewed_by_faculty_id,omitempty"`
	ReviewedByFaculty   *Faculty       `gorm:"foreignKey:ReviewedByFacultyID" json:"reviewed_by_faculty,omitempty"`
	RejectionReason      string         `gorm:"type:text" json:"rejection_reason,omitempty"`
	CreatedAt            time.Time      `json:"created_at"`
	UpdatedAt            time.Time      `json:"updated_at"`
	DeletedAt            gorm.DeletedAt `gorm:"index" json:"-"`
}

func (LeaveRequest) TableName() string {
	return "leave_requests"
}
