package admin

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"smartattend/services/admin"
)

type AdminController struct {
	service *admin.AdminService
}

func NewAdminController(srv *admin.AdminService) *AdminController {
	return &AdminController{service: srv}
}

// GetDashboardStats returns aggregated metric counts for the institution.
func (c *AdminController) GetDashboardStats(ctx *gin.Context) {
	institutionID := ctx.GetString("institution_id")
	stats, err := c.service.GetDashboardStats(institutionID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch dashboard metrics", "details": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"status": "success", "data": stats})
}

// ListStudents retrieves paginated students with search and department filtering.
func (c *AdminController) ListStudents(ctx *gin.Context) {
	institutionID := ctx.GetString("institution_id")
	deptID := ctx.Query("department_id")
	search := ctx.Query("search")
	page, _ := strconv.Atoi(ctx.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(ctx.DefaultQuery("limit", "20"))

	students, total, err := c.service.ListStudents(institutionID, deptID, search, page, limit)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to list students", "details": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"status": "success",
		"data":   students,
		"meta": gin.H{
			"total": total,
			"page":  page,
			"limit": limit,
		},
	})
}

// CreateStudent handles student registration.
func (c *AdminController) CreateStudent(ctx *gin.Context) {
	var req admin.CreateStudentRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload", "details": err.Error()})
		return
	}

	student, err := c.service.CreateStudent(ctx.GetString("institution_id"), req)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create student", "details": err.Error()})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"status": "success", "message": "Student registered successfully", "data": student})
}

// GetStudentByID retrieves detailed profile and academic history.
func (c *AdminController) GetStudentByID(ctx *gin.Context) {
	id := ctx.Param("id")
	student, err := c.service.GetStudentByID(id)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Student record not found"})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"status": "success", "data": student})
}

// UpdateStudent updates student demographic and academic info.
func (c *AdminController) UpdateStudent(ctx *gin.Context) {
	id := ctx.Param("id")
	var req admin.UpdateStudentRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	updated, err := c.service.UpdateStudent(id, req)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update student"})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"status": "success", "message": "Student updated", "data": updated})
}

// DeleteStudent removes a student record.
func (c *AdminController) DeleteStudent(ctx *gin.Context) {
	id := ctx.Param("id")
	if err := c.service.DeleteStudent(id); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete student"})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"status": "success", "message": "Student record deleted"})
}

// BulkImportStudents handles CSV/JSON import of student batches.
func (c *AdminController) BulkImportStudents(ctx *gin.Context) {
	var req []admin.CreateStudentRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON batch structure"})
		return
	}

	count, err := c.service.BulkImportStudents(ctx.GetString("institution_id"), req)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Bulk import failed", "details": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"status": "success", "message": strconv.Itoa(count) + " students imported successfully"})
}

// ExportStudentsCSV handles CSV report streaming.
func (c *AdminController) ExportStudentsCSV(ctx *gin.Context) {
	ctx.Header("Content-Disposition", "attachment; filename=students_export.csv")
	ctx.Header("Content-Type", "text/csv")
	_ = c.service.StreamStudentsCSV(ctx.GetString("institution_id"), ctx.Writer)
}

// ListFaculty lists faculty members.
func (c *AdminController) ListFaculty(ctx *gin.Context) {
	facultyList, err := c.service.ListFaculty(ctx.GetString("institution_id"))
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch faculty"})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"status": "success", "data": facultyList})
}

// CreateFaculty handles faculty registration.
func (c *AdminController) CreateFaculty(ctx *gin.Context) {
	var req admin.CreateFacultyRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid faculty payload"})
		return
	}
	fac, err := c.service.CreateFaculty(ctx.GetString("institution_id"), req)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create faculty member"})
		return
	}
	ctx.JSON(http.StatusCreated, gin.H{"status": "success", "data": fac})
}

// UpdateFaculty updates faculty details.
func (c *AdminController) UpdateFaculty(ctx *gin.Context) {
	id := ctx.Param("id")
	var req admin.CreateFacultyRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}
	updated, err := c.service.UpdateFaculty(id, req)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update faculty"})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"status": "success", "data": updated})
}

// DeleteFaculty removes a faculty record.
func (c *AdminController) DeleteFaculty(ctx *gin.Context) {
	id := ctx.Param("id")
	if err := c.service.DeleteFaculty(id); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete faculty"})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"status": "success", "message": "Faculty deleted"})
}

// AssignFacultySubjects binds teaching subjects to a faculty member.
func (c *AdminController) AssignFacultySubjects(ctx *gin.Context) {
	id := ctx.Param("id")
	var req struct {
		SubjectIDs []string `json:"subject_ids" binding:"required"`
	}
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Subject IDs required"})
		return
	}
	if err := c.service.AssignFacultySubjects(id, req.SubjectIDs); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to assign subjects"})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"status": "success", "message": "Subjects assigned successfully"})
}

// ListParents lists parents and linked students.
func (c *AdminController) ListParents(ctx *gin.Context) {
	parents, err := c.service.ListParents(ctx.GetString("institution_id"))
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch parents"})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"status": "success", "data": parents})
}

// CreateParent creates a parent account.
func (c *AdminController) CreateParent(ctx *gin.Context) {
	var req admin.CreateParentRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid parent data"})
		return
	}
	parent, err := c.service.CreateParent(ctx.GetString("institution_id"), req)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create parent"})
		return
	}
	ctx.JSON(http.StatusCreated, gin.H{"status": "success", "data": parent})
}

// UpdateParent updates parent record.
func (c *AdminController) UpdateParent(ctx *gin.Context) {
	id := ctx.Param("id")
	var req admin.CreateParentRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid payload"})
		return
	}
	updated, err := c.service.UpdateParent(id, req)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update parent"})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"status": "success", "data": updated})
}

// DeleteParent deletes parent record.
func (c *AdminController) DeleteParent(ctx *gin.Context) {
	id := ctx.Param("id")
	if err := c.service.DeleteParent(id); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete parent"})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"status": "success", "message": "Parent record deleted"})
}

// LinkParentChildren links multiple student IDs to a parent profile.
func (c *AdminController) LinkParentChildren(ctx *gin.Context) {
	id := ctx.Param("id")
	var req struct {
		StudentIDs []string `json:"student_ids" binding:"required"`
	}
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Student IDs array required"})
		return
	}
	if err := c.service.LinkParentChildren(id, req.StudentIDs); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to link children"})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"status": "success", "message": "Children linked to parent profile"})
}

// Academic Endpoints
func (c *AdminController) ListDepartments(ctx *gin.Context) {
	data, _ := c.service.ListDepartments(ctx.GetString("institution_id"))
	ctx.JSON(http.StatusOK, gin.H{"status": "success", "data": data})
}
func (c *AdminController) CreateDepartment(ctx *gin.Context) {
	var req admin.CreateDepartmentRequest
	_ = ctx.ShouldBindJSON(&req)
	dept, _ := c.service.CreateDepartment(ctx.GetString("institution_id"), req)
	ctx.JSON(http.StatusCreated, gin.H{"status": "success", "data": dept})
}

func (c *AdminController) ListCourses(ctx *gin.Context) {
	data, _ := c.service.ListCourses(ctx.GetString("institution_id"))
	ctx.JSON(http.StatusOK, gin.H{"status": "success", "data": data})
}
func (c *AdminController) CreateCourse(ctx *gin.Context) {
	var req admin.CreateCourseRequest
	_ = ctx.ShouldBindJSON(&req)
	crs, _ := c.service.CreateCourse(ctx.GetString("institution_id"), req)
	ctx.JSON(http.StatusCreated, gin.H{"status": "success", "data": crs})
}

func (c *AdminController) ListSubjects(ctx *gin.Context) {
	data, _ := c.service.ListSubjects(ctx.GetString("institution_id"))
	ctx.JSON(http.StatusOK, gin.H{"status": "success", "data": data})
}
func (c *AdminController) CreateSubject(ctx *gin.Context) {
	var req admin.CreateSubjectRequest
	_ = ctx.ShouldBindJSON(&req)
	sub, _ := c.service.CreateSubject(ctx.GetString("institution_id"), req)
	ctx.JSON(http.StatusCreated, gin.H{"status": "success", "data": sub})
}

func (c *AdminController) ListClasses(ctx *gin.Context) {
	data, _ := c.service.ListClasses(ctx.GetString("institution_id"))
	ctx.JSON(http.StatusOK, gin.H{"status": "success", "data": data})
}
func (c *AdminController) CreateClass(ctx *gin.Context) {
	var req admin.CreateClassRequest
	_ = ctx.ShouldBindJSON(&req)
	cls, _ := c.service.CreateClass(ctx.GetString("institution_id"), req)
	ctx.JSON(http.StatusCreated, gin.H{"status": "success", "data": cls})
}

// Timetable & Attendance
func (c *AdminController) GetTimetable(ctx *gin.Context) {
	data, _ := c.service.GetTimetable(ctx.GetString("institution_id"))
	ctx.JSON(http.StatusOK, gin.H{"status": "success", "data": data})
}
func (c *AdminController) CreateTimetableSlot(ctx *gin.Context) {
	var req admin.TimetableSlotRequest
	_ = ctx.ShouldBindJSON(&req)
	slot, _ := c.service.CreateTimetableSlot(ctx.GetString("institution_id"), req)
	ctx.JSON(http.StatusCreated, gin.H{"status": "success", "data": slot})
}
func (c *AdminController) CheckTimetableConflict(ctx *gin.Context) {
	var req admin.TimetableSlotRequest
	_ = ctx.ShouldBindJSON(&req)
	hasConflict, msg := c.service.CheckConflict(ctx.GetString("institution_id"), req)
	ctx.JSON(http.StatusOK, gin.H{"has_conflict": hasConflict, "message": msg})
}

func (c *AdminController) GetAttendanceRecords(ctx *gin.Context) {
	data, _ := c.service.GetAttendanceRecords(ctx.GetString("institution_id"), ctx.Query("date"))
	ctx.JSON(http.StatusOK, gin.H{"status": "success", "data": data})
}
func (c *AdminController) MarkAttendance(ctx *gin.Context) {
	var req []admin.AttendanceItem
	_ = ctx.ShouldBindJSON(&req)
	_ = c.service.BatchMarkAttendance(ctx.GetString("institution_id"), req)
	ctx.JSON(http.StatusOK, gin.H{"status": "success", "message": "Attendance records saved"})
}
func (c *AdminController) UpdateAttendance(ctx *gin.Context) {
	id := ctx.Param("id")
	status := ctx.Query("status")
	_ = c.service.UpdateAttendanceStatus(id, status)
	ctx.JSON(http.StatusOK, gin.H{"status": "success", "message": "Status updated"})
}

// Leaves
func (c *AdminController) ListLeaveRequests(ctx *gin.Context) {
	leaves, _ := c.service.ListLeaveRequests(ctx.GetString("institution_id"))
	ctx.JSON(http.StatusOK, gin.H{"status": "success", "data": leaves})
}
func (c *AdminController) UpdateLeaveStatus(ctx *gin.Context) {
	id := ctx.Param("id")
	var req struct {
		Status  string `json:"status" binding:"required"`
		Comment string `json:"comment"`
	}
	_ = ctx.ShouldBindJSON(&req)
	_ = c.service.UpdateLeaveStatus(id, req.Status, req.Comment)
	ctx.JSON(http.StatusOK, gin.H{"status": "success", "message": "Leave application " + req.Status})
}

// Announcements & Warnings
func (c *AdminController) ListAnnouncements(ctx *gin.Context) {
	data, _ := c.service.ListAnnouncements(ctx.GetString("institution_id"))
	ctx.JSON(http.StatusOK, gin.H{"status": "success", "data": data})
}
func (c *AdminController) CreateAnnouncement(ctx *gin.Context) {
	var req admin.CreateAnnouncementRequest
	_ = ctx.ShouldBindJSON(&req)
	anc, _ := c.service.CreateAnnouncement(ctx.GetString("institution_id"), req)
	ctx.JSON(http.StatusCreated, gin.H{"status": "success", "data": anc})
}
func (c *AdminController) TriggerLowAttendanceWarning(ctx *gin.Context) {
	count, _ := c.service.TriggerLowAttendanceWarning(ctx.GetString("institution_id"), 75.0)
	ctx.JSON(http.StatusOK, gin.H{"status": "success", "message": strconv.Itoa(count) + " warning notifications dispatched via SMTP"})
}

// Reports & Analytics
func (c *AdminController) GetAttendanceSummaryReport(ctx *gin.Context) {
	data, _ := c.service.GetAttendanceSummaryReport(ctx.GetString("institution_id"))
	ctx.JSON(http.StatusOK, gin.H{"status": "success", "data": data})
}
func (c *AdminController) GetDefaultersReport(ctx *gin.Context) {
	defaulters, _ := c.service.GetDefaulters(ctx.GetString("institution_id"), 75.0)
	ctx.JSON(http.StatusOK, gin.H{"status": "success", "data": defaulters})
}
func (c *AdminController) GetAttendanceTrendsAnalytics(ctx *gin.Context) {
	trends, _ := c.service.GetAttendanceTrends(ctx.GetString("institution_id"))
	ctx.JSON(http.StatusOK, gin.H{"status": "success", "data": trends})
}

// Settings
func (c *AdminController) GetSettings(ctx *gin.Context) {
	cfg, _ := c.service.GetSettings(ctx.GetString("institution_id"))
	ctx.JSON(http.StatusOK, gin.H{"status": "success", "data": cfg})
}
func (c *AdminController) UpdateSettings(ctx *gin.Context) {
	var req admin.UpdateSettingsRequest
	_ = ctx.ShouldBindJSON(&req)
	updated, _ := c.service.UpdateSettings(ctx.GetString("institution_id"), req)
	ctx.JSON(http.StatusOK, gin.H{"status": "success", "data": updated})
}
