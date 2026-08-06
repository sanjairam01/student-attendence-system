package models

// LoginRequest DTO for user authentication
type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
}

// LoginResponse DTO returned upon successful login
type LoginResponse struct {
	Token        string `json:"token"`
	RefreshToken string `json:"refresh_token,omitempty"`
	User         User   `json:"user"`
}

// RegisterUserRequest DTO for creating new system users
type RegisterUserRequest struct {
	RoleID    uint   `json:"role_id" binding:"required"`
	Email     string `json:"email" binding:"required,email"`
	Password  string `json:"password" binding:"required,min=6"`
	FirstName string `json:"first_name" binding:"required"`
	LastName  string `json:"last_name" binding:"required"`
	Phone     string `json:"phone"`
}

// MarkAttendanceRecord DTO for individual student attendance status
type MarkAttendanceRecord struct {
	StudentID uint   `json:"student_id" binding:"required"`
	Status    string `json:"status" binding:"required"` // Present, Absent, Late, Excused
	Remarks   string `json:"remarks"`
}

// BulkAttendanceRequest DTO for batch class attendance entry
type BulkAttendanceRequest struct {
	ClassID      uint                   `json:"class_id" binding:"required"`
	Date         string                 `json:"date" binding:"required"` // YYYY-MM-DD
	MarkedMethod string                 `json:"marked_method"`
	Records      []MarkAttendanceRecord `json:"records" binding:"required"`
}

// LeaveRequestDTO for submitting leave request
type LeaveRequestDTO struct {
	StartDate string `json:"start_date" binding:"required"`
	EndDate   string `json:"end_date" binding:"required"`
	Reason    string `json:"reason" binding:"required"`
}

// ReviewLeaveDTO for faculty/admin review
type ReviewLeaveDTO struct {
	Status          string `json:"status" binding:"required"` // Approved, Rejected
	RejectionReason string `json:"rejection_reason"`
}

// DashboardStatsDTO response
type DashboardStatsDTO struct {
	TotalStudents       int64   `json:"total_students"`
	TotalFaculty        int64   `json:"total_faculty"`
	TotalDepartments    int64   `json:"total_departments"`
	TodayClassesCount   int64   `json:"today_classes_count"`
	AverageAttendance   float64 `json:"average_attendance_percentage"`
	DeficitStudentsCount int64  `json:"deficit_students_count"`
}
