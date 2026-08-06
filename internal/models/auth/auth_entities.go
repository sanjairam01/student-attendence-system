package auth

import (
	"time"

	"gorm.io/gorm"
)

type PasswordReset struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	Email     string         `gorm:"size:100;not null;index" json:"email"`
	OTP       string         `gorm:"size:10;not null" json:"otp"`
	Token     string         `gorm:"size:255;not null;unique" json:"token"`
	IsUsed    bool           `gorm:"default:false" json:"is_used"`
	ExpiresAt time.Time      `gorm:"not null" json:"expires_at"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

type EmailVerification struct {
	ID         uint           `gorm:"primaryKey" json:"id"`
	UserID     uint           `gorm:"not null" json:"user_id"`
	Token      string         `gorm:"size:255;not null;unique" json:"token"`
	IsVerified bool           `gorm:"default:false" json:"is_verified"`
	ExpiresAt  time.Time      `gorm:"not null" json:"expires_at"`
	CreatedAt  time.Time      `json:"created_at"`
	UpdatedAt  time.Time      `json:"updated_at"`
	DeletedAt  gorm.DeletedAt `gorm:"index" json:"-"`
}

type LoginHistory struct {
	ID            uint           `gorm:"primaryKey" json:"id"`
	UserID        uint           `gorm:"not null" json:"user_id"`
	IPAddress     string         `gorm:"size:45;not null" json:"ip_address"`
	UserAgent     string         `gorm:"type:text;not null" json:"user_agent"`
	Status        string         `gorm:"size:20;not null" json:"status"` // Success, Failed
	RoleAttempted string         `gorm:"size:50;not null" json:"role_attempted"`
	CreatedAt     time.Time      `json:"created_at"`
	UpdatedAt     time.Time      `json:"updated_at"`
	DeletedAt     gorm.DeletedAt `gorm:"index" json:"-"`
}

type RefreshToken struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	UserID    uint           `gorm:"not null" json:"user_id"`
	Token     string         `gorm:"size:500;not null;unique" json:"token"`
	IsRevoked bool           `gorm:"default:false" json:"is_revoked"`
	ExpiresAt time.Time      `gorm:"not null" json:"expires_at"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

type Permission struct {
	ID          uint           `gorm:"primaryKey" json:"id"`
	Name        string         `gorm:"size:100;not null;unique" json:"name"`
	Module      string         `gorm:"size:50;not null" json:"module"`
	Description string         `gorm:"size:255" json:"description"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"-"`
}

type RolePermission struct {
	ID           uint           `gorm:"primaryKey" json:"id"`
	RoleID       uint           `gorm:"not null" json:"role_id"`
	PermissionID uint           `gorm:"not null" json:"permission_id"`
	CreatedAt    time.Time      `json:"created_at"`
	UpdatedAt    time.Time      `json:"updated_at"`
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"-"`
}

// Request & Response Data Transfer Objects (DTOs)

type MultiRoleLoginRequest struct {
	Email      string `json:"email" binding:"required,email"`
	Password   string `json:"password" binding:"required,min=8"`
	Role       string `json:"role" binding:"required"`
	RememberMe bool   `json:"remember_me"`
}

type AuthResponse struct {
	Success      bool        `json:"success"`
	Message      string      `json:"message"`
	AccessToken  string      `json:"access_token,omitempty"`
	RefreshToken string      `json:"refresh_token,omitempty"`
	ExpiresIn    int64       `json:"expires_in,omitempty"`
	User         interface{} `json:"user,omitempty"`
}

type ForgotPasswordRequest struct {
	Email string `json:"email" binding:"required,email"`
}

type VerifyOTPRequest struct {
	Email string `json:"email" binding:"required,email"`
	OTP   string `json:"otp" binding:"required,len=6"`
}

type ResetPasswordRequest struct {
	Email       string `json:"email" binding:"required,email"`
	Token       string `json:"token" binding:"required"`
	NewPassword string `json:"new_password" binding:"required,min=8"`
}

type RefreshTokenRequest struct {
	RefreshToken string `json:"refresh_token" binding:"required"`
}

type CreateUserDTO struct {
	Name         string `json:"name" binding:"required"`
	Email        string `json:"email" binding:"required,email"`
	Password     string `json:"password" binding:"required,min=8"`
	Phone        string `json:"phone"`
	RoleID       uint   `json:"role_id" binding:"required"`
	DepartmentID *uint  `json:"department_id"`
}
