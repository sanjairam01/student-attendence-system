import React, { useState } from 'react';
import { Code2, Copy, Check, FileCode, Database, Layers, Server, Globe } from 'lucide-react';

export const FacultyGoSourceViewer: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [selectedFile, setSelectedFile] = useState<
    'routes' | 'controller' | 'service' | 'repository' | 'models' | 'sql' | 'html' | 'js'
  >('routes');

  const files = {
    routes: {
      name: 'routes/faculty.go',
      language: 'go',
      code: `package routes

import (
	"github.com/gin-gonic/gin"
	"smart-attendance/controllers/faculty"
	"smart-attendance/middleware"
)

// RegisterFacultyRoutes registers all secure REST API endpoints for Faculty Role
func RegisterFacultyRoutes(r *gin.Engine, fc *faculty.FacultyController) {
	facultyGroup := r.Group("/api/v1/faculty")
	facultyGroup.Use(middleware.JWTAuthMiddleware(), middleware.FacultyRoleAuthorization())
	{
		// Profile & Authentication
		facultyGroup.GET("/profile", fc.GetProfile)
		facultyGroup.PUT("/profile", fc.UpdateProfile)
		facultyGroup.PUT("/change-password", fc.ChangePassword)

		// Classes & Assigned Subjects
		facultyGroup.GET("/classes", fc.GetAssignedClasses)
		facultyGroup.GET("/subjects", fc.GetAssignedSubjects)
		facultyGroup.GET("/classes/:id/students", fc.GetClassStudents)

		// Attendance Core APIs
		facultyGroup.POST("/attendance/mark", fc.MarkAttendance)
		facultyGroup.PUT("/attendance/sessions/:id", fc.UpdateAttendanceSession)
		facultyGroup.DELETE("/attendance/sessions/:id", fc.DeleteAttendanceSession)
		facultyGroup.GET("/attendance/sessions", fc.GetAttendanceHistory)
		facultyGroup.GET("/attendance/sessions/:id", fc.GetAttendanceSessionDetails)

		// Smart QR & Geofence Attendance APIs
		facultyGroup.POST("/attendance/qr/generate", fc.GenerateQRToken)
		facultyGroup.POST("/attendance/qr/scan", fc.ProcessQRScan)

		// Timetable & Schedule
		facultyGroup.GET("/timetable", fc.GetFacultyTimetable)

		// Leave Management APIs
		facultyGroup.POST("/leaves", fc.ApplyLeave)
		facultyGroup.GET("/leaves", fc.GetLeaveHistory)
		facultyGroup.DELETE("/leaves/:id", fc.CancelLeave)

		// Announcements & Notifications
		facultyGroup.GET("/announcements", fc.GetAnnouncements)
		facultyGroup.GET("/notifications", fc.GetNotifications)
		facultyGroup.PUT("/notifications/read", fc.MarkNotificationsRead)

		// Reports & Analytics APIs
		facultyGroup.POST("/reports/generate", fc.GenerateReport)
		facultyGroup.GET("/analytics/summary", fc.GetAnalyticsSummary)
	}
}`,
    },
    controller: {
      name: 'controllers/faculty/faculty_controller.go',
      language: 'go',
      code: `package faculty

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"smart-attendance/models"
	"smart-attendance/services/faculty"
)

type FacultyController struct {
	service *faculty.FacultyService
}

func NewFacultyController(s *faculty.FacultyService) *FacultyController {
	return &FacultyController{service: s}
}

// MarkAttendance handles creation of new faculty attendance session with validation
func (fc *FacultyController) MarkAttendance(c *gin.Context) {
	facultyID := c.GetString("user_id") // From JWT Context

	var req models.MarkAttendanceRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	session, err := fc.service.MarkSessionAttendance(c.Request.Context(), facultyID, &req)
	if err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Attendance finalized successfully",
		"data":    session,
	})
}

// GenerateQRToken provisions live dynamic encrypted QR token
func (fc *FacultyController) GenerateQRToken(c *gin.Context) {
	facultyID := c.GetString("user_id")

	var req models.QRGenRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	qrSession, err := fc.service.CreateQRSession(c.Request.Context(), facultyID, &req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Dynamic QR token generated",
		"data":    qrSession,
	})
}`,
    },
    service: {
      name: 'services/faculty/faculty_service.go',
      language: 'go',
      code: `package faculty

import (
	"context"
	"errors"
	"fmt"
	"time"
	"smart-attendance/models"
	"smart-attendance/repositories/faculty"
)

type FacultyService struct {
	repo *faculty.FacultyRepository
}

func NewFacultyService(r *faculty.FacultyRepository) *FacultyService {
	return &FacultyService{repo: r}
}

func (s *FacultyService) MarkSessionAttendance(ctx context.Context, facultyID string, req *models.MarkAttendanceRequest) (*models.FacultyAttendanceSession, error) {
	// 1. Validate Faculty Assignment to Subject & Class
	isAssigned, err := s.repo.ValidateSubjectAssignment(ctx, facultyID, req.SubjectID, req.ClassID)
	if err != nil || !isAssigned {
		return nil, errors.New("unauthorized: subject not assigned to this faculty member")
	}

	// 2. Prevent Duplicate Attendance Session
	exists, err := s.repo.CheckDuplicateSession(ctx, req.ClassID, req.SubjectID, req.Date, req.TimeSlot)
	if err != nil {
		return nil, err
	}
	if exists {
		return nil, errors.New("duplicate session: attendance for this slot has already been finalized")
	}

	// 3. Save Session & Insert Records in SQL Transaction
	return s.repo.SaveAttendanceTransaction(ctx, facultyID, req)
}`,
    },
    repository: {
      name: 'repositories/faculty/faculty_repository.go',
      language: 'go',
      code: `package faculty

import (
	"context"
	"database/sql"
	"smart-attendance/models"
)

type FacultyRepository struct {
	db *sql.DB
}

func NewFacultyRepository(db *sql.DB) *FacultyRepository {
	return &FacultyRepository{db: db}
}

func (r *FacultyRepository) CheckDuplicateSession(ctx context.Context, classID, subjectID, date, timeSlot string) (bool, error) {
	query := \`SELECT COUNT(*) FROM faculty_attendance WHERE class_id = $1 AND subject_id = $2 AND session_date = $3 AND time_slot = $4\`
	var count int
	err := r.db.QueryRowContext(ctx, query, classID, subjectID, date, timeSlot).Scan(&count)
	return count > 0, err
}`,
    },
    models: {
      name: 'models/faculty_models.go',
      language: 'go',
      code: `package models

import "time"

type MarkAttendanceRequest struct {
	ClassID   string                   \`json:"class_id" binding:"required"\`
	SubjectID string                   \`json:"subject_id" binding:"required"\`
	Date      string                   \`json:"date" binding:"required"\`
	TimeSlot  string                   \`json:"time_slot" binding:"required"\`
	Records   []StudentAttendanceInput \`json:"records" binding:"required"\`
}

type StudentAttendanceInput struct {
	StudentID string \`json:"student_id" binding:"required"\`
	Status    string \`json:"status" binding:"required"\` // Present, Absent, Late, Medical
	Remarks   string \`json:"remarks"\`
}

type QRGenRequest struct {
	ClassID     string  \`json:"class_id" binding:"required"\`
	SubjectID   string  \`json:"subject_id" binding:"required"\`
	GPSLat      float64 \`json:"gps_latitude"\`
	GPSLong     float64 \`json:"gps_longitude"\`
	RadiusMeter float64 \`json:"radius_meters"\`
}`,
    },
    sql: {
      name: 'db/faculty_schema.sql',
      language: 'sql',
      code: `-- Smart Attendance Faculty Database Schema
CREATE TABLE IF NOT EXISTS faculty_attendance (
    id VARCHAR(64) PRIMARY KEY,
    faculty_id VARCHAR(64) NOT NULL REFERENCES faculty(id),
    class_id VARCHAR(64) NOT NULL,
    subject_id VARCHAR(64) NOT NULL,
    session_date DATE NOT NULL,
    time_slot VARCHAR(50) NOT NULL,
    total_students INT NOT NULL,
    present_count INT NOT NULL,
    absent_count INT NOT NULL,
    late_count INT NOT NULL,
    medical_count INT NOT NULL,
    attendance_pct NUMERIC(5,2) NOT NULL,
    attendance_mode VARCHAR(30) DEFAULT 'Manual',
    status VARCHAR(20) DEFAULT 'Completed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS attendance_logs (
    id VARCHAR(64) PRIMARY KEY,
    session_id VARCHAR(64) NOT NULL REFERENCES faculty_attendance(id) ON DELETE CASCADE,
    student_id VARCHAR(64) NOT NULL,
    status VARCHAR(30) NOT NULL,
    remarks TEXT,
    marked_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS qr_attendance (
    session_id VARCHAR(64) PRIMARY KEY,
    qr_token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    gps_lat NUMERIC(10,6),
    gps_long NUMERIC(10,6),
    max_radius_m NUMERIC(6,2) DEFAULT 50.00
);`,
    },
    html: {
      name: 'templates/faculty/faculty-dashboard.html',
      language: 'html',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Faculty Dashboard | Smart Attendance</title>
    <link rel="stylesheet" href="/static/faculty/faculty.css">
    <script src="/static/faculty/attendance.js" defer></script>
</head>
<body class="bg-slate-950 text-white font-sans">
    <main className="p-8">
        <h1>Faculty Portal</h1>
        <div id="qr-container" class="glass-card"></div>
    </main>
</body>
</html>`,
    },
    js: {
      name: 'static/faculty/qr-attendance.js',
      language: 'javascript',
      code: `// QR Attendance Frontend Realtime Websocket Listener
async function initLiveQRStream(sessionId) {
  const socket = new WebSocket(\`wss://\${location.host}/api/v1/faculty/qr/live/\${sessionId}\`);
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    document.getElementById('scanned-count').innerText = data.scannedCount;
  };
}`,
    },
  };

  const currentFile = files[selectedFile];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header Context */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md font-mono text-[10px] font-black uppercase bg-cyan-500/20 text-cyan-300">
              Clean Architecture
            </span>
            <h2 className="text-xl font-black text-white">Go (Golang) Gin Faculty Module Codebase</h2>
          </div>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Production-grade RESTful APIs, controllers, services, transactional SQL schemas, and middleware.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="px-4 py-2.5 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs shadow-lg transition flex items-center gap-2"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-950" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Copied Source!' : 'Copy Code Snippet'}</span>
        </button>
      </div>

      {/* File Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-2 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl">
        {Object.entries(files).map(([key, file]) => (
          <button
            key={key}
            onClick={() => setSelectedFile(key as any)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-mono font-bold transition flex items-center gap-2 ${
              selectedFile === key
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>{file.name}</span>
          </button>
        ))}
      </div>

      {/* Code Display Area */}
      <div className="rounded-3xl bg-slate-950 border border-white/10 overflow-hidden shadow-2xl">
        <div className="px-5 py-3 bg-slate-900 border-b border-white/10 flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-cyan-400">{currentFile.name}</span>
          <span className="text-[10px] font-mono uppercase font-black text-slate-400">
            {currentFile.language}
          </span>
        </div>
        <pre className="p-6 text-xs font-mono text-cyan-100 overflow-x-auto custom-scrollbar leading-relaxed">
          <code>{currentFile.code}</code>
        </pre>
      </div>
    </div>
  );
};
