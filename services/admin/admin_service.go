package admin

import (
	"io"
	"smartattend/repositories/admin"
)

type AdminService struct {
	repo *admin.AdminRepository
}

func NewAdminService(r *admin.AdminRepository) *AdminService {
	return &AdminService{repo: r}
}

// Request and Response DTO Structs

type DashboardStats struct {
	TotalStudents         int     `json:"total_students"`
	TotalFaculty          int     `json:"total_faculty"`
	TotalParents          int     `json:"total_parents"`
	TotalDepartments      int     `json:"total_departments"`
	TotalCourses          int     `json:"total_courses"`
	TotalSubjects         int     `json:"total_subjects"`
	TotalClasses          int     `json:"total_classes"`
	TodayAttendancePct    float64 `json:"today_attendance_pct"`
	PresentCount          int     `json:"present_count"`
	AbsentCount           int     `json:"absent_count"`
	LateCount             int     `json:"late_count"`
	OnLeaveCount          int     `json:"on_leave_count"`
	PendingLeavesCount    int     `json:"pending_leaves_count"`
	ActiveAnnouncements   int     `json:"active_announcements"`
}

type CreateStudentRequest struct {
	AdmissionNo      string  `json:"admission_no" binding:"required"`
	RollNo           string  `json:"roll_no" binding:"required"`
	RegisterNo       string  `json:"register_no" binding:"required"`
	FullName         string  `json:"full_name" binding:"required"`
	PhotoURL         string  `json:"photo_url"`
	Gender           string  `json:"gender" binding:"required"`
	DOB              string  `json:"dob" binding:"required"`
	BloodGroup       string  `json:"blood_group"`
	DepartmentID     string  `json:"department_id" binding:"required"`
	CourseID         string  `json:"course_id" binding:"required"`
	Semester         int     `json:"semester" binding:"required"`
	Section          string  `json:"section" binding:"required"`
	Email            string  `json:"email" binding:"required,email"`
	Phone            string  `json:"phone"`
	Address          string  `json:"address"`
	ParentName       string  `json:"parent_name"`
	ParentPhone      string  `json:"parent_phone"`
	EmergencyContact string  `json:"emergency_contact"`
}

type UpdateStudentRequest struct {
	FullName         string `json:"full_name"`
	DepartmentID     string `json:"department_id"`
	Semester         int    `json:"semester"`
	Section          string `json:"section"`
	Email            string `json:"email"`
	Phone            string `json:"phone"`
	Address          string `json:"address"`
	Status           string `json:"status"`
}

type CreateFacultyRequest struct {
	EmployeeID      string   `json:"employee_id" binding:"required"`
	Name            string   `json:"name" binding:"required"`
	Email           string   `json:"email" binding:"required,email"`
	Phone           string   `json:"phone"`
	Qualification   string   `json:"qualification"`
	ExperienceYears int      `json:"experience_years"`
	DepartmentID    string   `json:"department_id" binding:"required"`
	SubjectIDs      []string `json:"subject_ids"`
}

type CreateParentRequest struct {
	ParentID         string   `json:"parent_id" binding:"required"`
	Name             string   `json:"name" binding:"required"`
	Email            string   `json:"email" binding:"required,email"`
	Phone            string   `json:"phone" binding:"required"`
	Occupation       string   `json:"occupation"`
	Address          string   `json:"address"`
	EmergencyContact string   `json:"emergency_contact"`
	StudentIDs       []string `json:"student_ids"`
}

type CreateDepartmentRequest struct {
	Code        string `json:"code" binding:"required"`
	Name        string `json:"name" binding:"required"`
	HODName     string `json:"hod_name"`
	Description string `json:"description"`
}

type CreateCourseRequest struct {
	Code          string `json:"code" binding:"required"`
	Name          string `json:"name" binding:"required"`
	DurationYears int    `json:"duration_years" binding:"required"`
	DepartmentID  string `json:"department_id" binding:"required"`
	Description   string `json:"description"`
}

type CreateSubjectRequest struct {
	Code         string `json:"code" binding:"required"`
	Name         string `json:"name" binding:"required"`
	Credits      int    `json:"credits" binding:"required"`
	Semester     int    `json:"semester" binding:"required"`
	DepartmentID string `json:"department_id" binding:"required"`
	FacultyID    string `json:"faculty_id"`
}

type CreateClassRequest struct {
	Name            string `json:"name" binding:"required"`
	Section         string `json:"section" binding:"required"`
	Batch           string `json:"batch" binding:"required"`
	DepartmentID    string `json:"department_id" binding:"required"`
	CourseID        string `json:"course_id" binding:"required"`
	Semester        int    `json:"semester" binding:"required"`
	RoomNumber      string `json:"room_number"`
	AdvisorFacultyID string `json:"advisor_faculty_id"`
}

type TimetableSlotRequest struct {
	ClassID    string `json:"class_id" binding:"required"`
	SubjectID  string `json:"subject_id" binding:"required"`
	FacultyID  string `json:"faculty_id" binding:"required"`
	RoomNumber string `json:"room_number" binding:"required"`
	DayOfWeek  string `json:"day_of_week" binding:"required"`
	StartTime  string `json:"start_time" binding:"required"`
	EndTime    string `json:"end_time" binding:"required"`
}

type AttendanceItem struct {
	StudentID string `json:"student_id" binding:"required"`
	ClassID   string `json:"class_id" binding:"required"`
	SubjectID string `json:"subject_id" binding:"required"`
	Status    string `json:"status" binding:"required"`
	Remarks   string `json:"remarks"`
}

type CreateAnnouncementRequest struct {
	Title          string `json:"title" binding:"required"`
	Content        string `json:"content" binding:"required"`
	TargetAudience string `json:"target_audience" binding:"required"`
	DepartmentID   string `json:"department_id"`
	Priority       string `json:"priority"`
}

type UpdateSettingsRequest struct {
	InstitutionName        string `json:"institution_name"`
	AcademicYear           string `json:"academic_year"`
	CurrentSemester        string `json:"current_semester"`
	WorkingDaysPerWeek     int    `json:"working_days_per_week"`
	AttendanceThresholdPct float64`json:"attendance_threshold_pct"`
	ContactEmail           string `json:"contact_email"`
	SMTPHost               string `json:"smtp_host"`
	SMTPPort               int    `json:"smtp_port"`
}

// Business Logic Implementation Wrappers

func (s *AdminService) GetDashboardStats(instID string) (*DashboardStats, error) {
	return s.repo.GetAggregatedDashboardStats(instID)
}

func (s *AdminService) ListStudents(instID, deptID, search string, page, limit int) ([]interface{}, int, error) {
	return s.repo.GetStudents(instID, deptID, search, page, limit)
}

func (s *AdminService) CreateStudent(instID string, req CreateStudentRequest) (interface{}, error) {
	return s.repo.InsertStudent(instID, req)
}

func (s *AdminService) GetStudentByID(id string) (interface{}, error) {
	return s.repo.FindStudentByID(id)
}

func (s *AdminService) UpdateStudent(id string, req UpdateStudentRequest) (interface{}, error) {
	return s.repo.UpdateStudent(id, req)
}

func (s *AdminService) DeleteStudent(id string) error {
	return s.repo.DeleteStudent(id)
}

func (s *AdminService) BulkImportStudents(instID string, reqs []CreateStudentRequest) (int, error) {
	return s.repo.InsertStudentBatch(instID, reqs)
}

func (s *AdminService) StreamStudentsCSV(instID string, w io.Writer) error {
	return s.repo.ExportStudentsCSV(instID, w)
}

func (s *AdminService) ListFaculty(instID string) ([]interface{}, error) {
	return s.repo.GetFacultyList(instID)
}

func (s *AdminService) CreateFaculty(instID string, req CreateFacultyRequest) (interface{}, error) {
	return s.repo.InsertFaculty(instID, req)
}

func (s *AdminService) UpdateFaculty(id string, req CreateFacultyRequest) (interface{}, error) {
	return s.repo.UpdateFaculty(id, req)
}

func (s *AdminService) DeleteFaculty(id string) error {
	return s.repo.DeleteFaculty(id)
}

func (s *AdminService) AssignFacultySubjects(facID string, subjectIDs []string) error {
	return s.repo.BindFacultySubjects(facID, subjectIDs)
}

func (s *AdminService) ListParents(instID string) ([]interface{}, error) {
	return s.repo.GetParentsList(instID)
}

func (s *AdminService) CreateParent(instID string, req CreateParentRequest) (interface{}, error) {
	return s.repo.InsertParent(instID, req)
}

func (s *AdminService) UpdateParent(id string, req CreateParentRequest) (interface{}, error) {
	return s.repo.UpdateParent(id, req)
}

func (s *AdminService) DeleteParent(id string) error {
	return s.repo.DeleteParent(id)
}

func (s *AdminService) LinkParentChildren(parentID string, studentIDs []string) error {
	return s.repo.LinkParentChildren(parentID, studentIDs)
}

func (s *AdminService) ListDepartments(instID string) ([]interface{}, error) {
	return s.repo.GetDepartments(instID)
}

func (s *AdminService) CreateDepartment(instID string, req CreateDepartmentRequest) (interface{}, error) {
	return s.repo.InsertDepartment(instID, req)
}

func (s *AdminService) ListCourses(instID string) ([]interface{}, error) {
	return s.repo.GetCourses(instID)
}

func (s *AdminService) CreateCourse(instID string, req CreateCourseRequest) (interface{}, error) {
	return s.repo.InsertCourse(instID, req)
}

func (s *AdminService) ListSubjects(instID string) ([]interface{}, error) {
	return s.repo.GetSubjects(instID)
}

func (s *AdminService) CreateSubject(instID string, req CreateSubjectRequest) (interface{}, error) {
	return s.repo.InsertSubject(instID, req)
}

func (s *AdminService) ListClasses(instID string) ([]interface{}, error) {
	return s.repo.GetClasses(instID)
}

func (s *AdminService) CreateClass(instID string, req CreateClassRequest) (interface{}, error) {
	return s.repo.InsertClass(instID, req)
}

func (s *AdminService) GetTimetable(instID string) ([]interface{}, error) {
	return s.repo.GetTimetable(instID)
}

func (s *AdminService) CreateTimetableSlot(instID string, req TimetableSlotRequest) (interface{}, error) {
	return s.repo.InsertTimetableSlot(instID, req)
}

func (s *AdminService) CheckConflict(instID string, req TimetableSlotRequest) (bool, string) {
	return s.repo.CheckRoomOrFacultyConflict(instID, req.RoomNumber, req.FacultyID, req.DayOfWeek, req.StartTime)
}

func (s *AdminService) GetAttendanceRecords(instID, date string) ([]interface{}, error) {
	return s.repo.GetAttendance(instID, date)
}

func (s *AdminService) BatchMarkAttendance(instID string, items []AttendanceItem) error {
	return s.repo.InsertAttendanceBatch(instID, items)
}

func (s *AdminService) UpdateAttendanceStatus(id, status string) error {
	return s.repo.UpdateAttendanceRecordStatus(id, status)
}

func (s *AdminService) ListLeaveRequests(instID string) ([]interface{}, error) {
	return s.repo.GetLeaves(instID)
}

func (s *AdminService) UpdateLeaveStatus(id, status, comment string) error {
	return s.repo.SetLeaveStatus(id, status, comment)
}

func (s *AdminService) ListAnnouncements(instID string) ([]interface{}, error) {
	return s.repo.GetAnnouncements(instID)
}

func (s *AdminService) CreateAnnouncement(instID string, req CreateAnnouncementRequest) (interface{}, error) {
	return s.repo.InsertAnnouncement(instID, req)
}

func (s *AdminService) TriggerLowAttendanceWarning(instID string, threshold float64) (int, error) {
	return s.repo.DispatchLowAttendanceWarnings(instID, threshold)
}

func (s *AdminService) GetAttendanceSummaryReport(instID string) (interface{}, error) {
	return s.repo.GetSummaryReport(instID)
}

func (s *AdminService) GetDefaulters(instID string, threshold float64) ([]interface{}, error) {
	return s.repo.GetDefaultersList(instID, threshold)
}

func (s *AdminService) GetAttendanceTrends(instID string) (interface{}, error) {
	return s.repo.GetAnalyticsTrends(instID)
}

func (s *AdminService) GetSettings(instID string) (interface{}, error) {
	return s.repo.GetSettings(instID)
}

func (s *AdminService) UpdateSettings(instID string, req UpdateSettingsRequest) (interface{}, error) {
	return s.repo.SaveSettings(instID, req)
}
