package routes

import (
	"github.com/gin-gonic/gin"
	"smartattend/controllers/admin"
	"smartattend/middleware"
)

// RegisterAdminRoutes sets up all RESTful API endpoints for the Admin Module.
// Role authorization ensures only users with the 'ADMIN' role can execute these actions.
func RegisterAdminRoutes(router *gin.Engine, adminCtrl *admin.AdminController) {
	adminGroup := router.Group("/api/v1/admin")
	adminGroup.Use(middleware.JWTAuthMiddleware(), middleware.RequireRole("ADMIN"))
	{
		// Dashboard Metrics
		adminGroup.GET("/dashboard/stats", adminCtrl.GetDashboardStats)

		// Student Management CRUD
		adminGroup.GET("/students", adminCtrl.ListStudents)
		adminGroup.POST("/students", adminCtrl.CreateStudent)
		adminGroup.GET("/students/:id", adminCtrl.GetStudentByID)
		adminGroup.PUT("/students/:id", adminCtrl.UpdateStudent)
		adminGroup.DELETE("/students/:id", adminCtrl.DeleteStudent)
		adminGroup.POST("/students/import", adminCtrl.BulkImportStudents)
		adminGroup.GET("/students/export", adminCtrl.ExportStudentsCSV)

		// Faculty Management CRUD
		adminGroup.GET("/faculty", adminCtrl.ListFaculty)
		adminGroup.POST("/faculty", adminCtrl.CreateFaculty)
		adminGroup.PUT("/faculty/:id", adminCtrl.UpdateFaculty)
		adminGroup.DELETE("/faculty/:id", adminCtrl.DeleteFaculty)
		adminGroup.POST("/faculty/:id/assign-subjects", adminCtrl.AssignFacultySubjects)

		// Parent Management CRUD
		adminGroup.GET("/parents", adminCtrl.ListParents)
		adminGroup.POST("/parents", adminCtrl.CreateParent)
		adminGroup.PUT("/parents/:id", adminCtrl.UpdateParent)
		adminGroup.DELETE("/parents/:id", adminCtrl.DeleteParent)
		adminGroup.POST("/parents/:id/link-children", adminCtrl.LinkParentChildren)

		// Department, Course, Subject, Class Management
		adminGroup.GET("/departments", adminCtrl.ListDepartments)
		adminGroup.POST("/departments", adminCtrl.CreateDepartment)
		adminGroup.GET("/courses", adminCtrl.ListCourses)
		adminGroup.POST("/courses", adminCtrl.CreateCourse)
		adminGroup.GET("/subjects", adminCtrl.ListSubjects)
		adminGroup.POST("/subjects", adminCtrl.CreateSubject)
		adminGroup.GET("/classes", adminCtrl.ListClasses)
		adminGroup.POST("/classes", adminCtrl.CreateClass)

		// Timetable Management
		adminGroup.GET("/timetable", adminCtrl.GetTimetable)
		adminGroup.POST("/timetable/slots", adminCtrl.CreateTimetableSlot)
		adminGroup.POST("/timetable/check-conflict", adminCtrl.CheckTimetableConflict)

		// Attendance Operations
		adminGroup.GET("/attendance", adminCtrl.GetAttendanceRecords)
		adminGroup.POST("/attendance/mark", adminCtrl.MarkAttendance)
		adminGroup.PUT("/attendance/:id", adminCtrl.UpdateAttendance)

		// Leave Requests Approval Workflow
		adminGroup.GET("/leaves", adminCtrl.ListLeaveRequests)
		adminGroup.PUT("/leaves/:id/status", adminCtrl.UpdateLeaveStatus)

		// Announcements & Notifications
		adminGroup.GET("/announcements", adminCtrl.ListAnnouncements)
		adminGroup.POST("/announcements", adminCtrl.CreateAnnouncement)
		adminGroup.POST("/notifications/trigger-warning", adminCtrl.TriggerLowAttendanceWarning)

		// Reports & Analytics
		adminGroup.GET("/reports/attendance-summary", adminCtrl.GetAttendanceSummaryReport)
		adminGroup.GET("/reports/defaulters", adminCtrl.GetDefaultersReport)
		adminGroup.GET("/analytics/trends", adminCtrl.GetAttendanceTrendsAnalytics)

		// Institutional Profile & Settings
		adminGroup.GET("/settings", adminCtrl.GetSettings)
		adminGroup.PUT("/settings", adminCtrl.UpdateSettings)
	}
}
