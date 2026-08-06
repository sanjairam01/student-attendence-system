import React, { useState } from 'react';
import { Code2, Copy, Check, Server, FileCode, Shield } from 'lucide-react';

export const StudentGoSourceViewer: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeFile, setActiveFile] = useState<'controller' | 'service' | 'repository' | 'routes'>('controller');

  const files = {
    controller: `package controllers

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"apex/services"
	"apex/models"
)

type StudentController struct {
	studentService services.IStudentService
}

func NewStudentController(service services.IStudentService) *StudentController {
	return &StudentController{studentService: service}
}

// GetStudentDashboard retrieves attendance summary & timetable for student
func (sc *StudentController) GetStudentDashboard(c *gin.Context) {
	studentID := c.GetString("user_id")

	dashboard, err := sc.studentService.GetDashboardData(studentID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch student dashboard", "details": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "success", "data": dashboard})
}

// ApplyLeave submits a new leave application
func (sc *StudentController) ApplyLeave(c *gin.Context) {
	var req models.StudentLeaveRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload", "details": err.Error()})
		return
	}

	req.StudentID = c.GetString("user_id")

	leave, err := sc.studentService.ApplyLeave(&req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to submit leave application"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"status": "success", "data": leave})
}`,
    service: `package services

import (
	"apex/models"
	"apex/repositories"
)

type IStudentService interface {
	GetDashboardData(studentID string) (*models.StudentDashboardDTO, error)
	ApplyLeave(req *models.StudentLeaveRequest) (*models.LeaveApplication, error)
}

type StudentService struct {
	studentRepo repositories.IStudentRepository
}

func NewStudentService(repo repositories.IStudentRepository) IStudentService {
	return &StudentService{studentRepo: repo}
}

func (s *StudentService) GetDashboardData(studentID string) (*models.StudentDashboardDTO, error) {
	return s.studentRepo.FetchDashboardSummary(studentID)
}

func (s *StudentService) ApplyLeave(req *models.StudentLeaveRequest) (*models.LeaveApplication, error) {
	return s.studentRepo.CreateLeaveRecord(req)
}`,
    repository: `package repositories

import (
	"database/sql"
	"apex/models"
)

type IStudentRepository interface {
	FetchDashboardSummary(studentID string) (*models.StudentDashboardDTO, error)
	CreateLeaveRecord(req *models.StudentLeaveRequest) (*models.LeaveApplication, error)
}

type StudentRepository struct {
	db *sql.DB
}

func NewStudentRepository(db *sql.DB) IStudentRepository {
	return &StudentRepository{db: db}
}

func (r *StudentRepository) FetchDashboardSummary(studentID string) (*models.StudentDashboardDTO, error) {
	query := \`
		SELECT s.id, s.roll_number, s.full_name, s.overall_attendance_pct
		FROM students s
		WHERE s.id = $1 AND s.is_active = true
	\`
	var dto models.StudentDashboardDTO
	err := r.db.QueryRow(query, studentID).Scan(&dto.ID, &dto.RollNumber, &dto.FullName, &dto.OverallAttendancePct)
	if err != nil {
		return nil, err
	}
	return &dto, nil
}

func (r *StudentRepository) CreateLeaveRecord(req *models.StudentLeaveRequest) (*models.LeaveApplication, error) {
	query := \`
		INSERT INTO student_leaves (student_id, leave_type, start_date, end_date, days_count, reason, status)
		VALUES ($1, $2, $3, $4, $5, $6, 'Pending')
		RETURNING id, status, applied_on
	\`
	leave := &models.LeaveApplication{
		LeaveType: req.LeaveType,
		StartDate: req.StartDate,
		EndDate:   req.EndDate,
		DaysCount: req.DaysCount,
		Reason:    req.Reason,
	}
	err := r.db.QueryRow(query, req.StudentID, req.LeaveType, req.StartDate, req.EndDate, req.DaysCount, req.Reason).
		Scan(&leave.ID, &leave.Status, &leave.AppliedOn)
	return leave, err
}`,
    routes: `package routes

import (
	"github.com/gin-gonic/gin"
	"apex/controllers"
	"apex/middleware"
)

func RegisterStudentRoutes(router *gin.RouterGroup, studentCtrl *controllers.StudentController) {
	studentGroup := router.Group("/student")
	studentGroup.Use(middleware.JWTMiddleware(), middleware.RoleGuard("Student"))
	{
		studentGroup.GET("/dashboard", studentCtrl.GetStudentDashboard)
		studentGroup.POST("/leave", studentCtrl.ApplyLeave)
	}
}`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(files[activeFile]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Context Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Code2 className="w-5 h-5 text-emerald-400" />
            <span>Go (Golang) Clean Architecture Backend - Student Module</span>
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Production-ready RESTful endpoints using Gin framework, GORM/SQL repository layer, and JWT security guards.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="px-4 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-lg flex items-center gap-2"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Copied Code!' : 'Copy Go Source'}</span>
        </button>
      </div>

      {/* Code Viewer Panel */}
      <div className="rounded-3xl bg-slate-950 border border-white/10 overflow-hidden shadow-2xl">
        <div className="p-3 bg-slate-900 border-b border-white/10 flex items-center gap-2">
          <button
            onClick={() => setActiveFile('controller')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition ${
              activeFile === 'controller'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            student_controller.go
          </button>
          <button
            onClick={() => setActiveFile('service')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition ${
              activeFile === 'service'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            student_service.go
          </button>
          <button
            onClick={() => setActiveFile('repository')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition ${
              activeFile === 'repository'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            student_repository.go
          </button>
          <button
            onClick={() => setActiveFile('routes')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition ${
              activeFile === 'routes'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            student_routes.go
          </button>
        </div>

        <pre className="p-6 text-xs font-mono text-emerald-300 bg-slate-950 overflow-x-auto custom-scrollbar leading-relaxed">
          {files[activeFile]}
        </pre>
      </div>
    </div>
  );
};
