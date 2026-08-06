import React, { useState } from 'react';
import { Code2, Copy, Check } from 'lucide-react';

export const ReportsGoSourceViewer: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'controller' | 'service' | 'repository' | 'models' | 'sql'>('controller');

  const files = {
    controller: `package controllers

import (
	"net/http"
	"time"

	"apex/services"
	"apex/types"
	"github.com/gin-gonic/gin"
)

type ReportsController struct {
	reportsService services.IReportsService
}

func NewReportsController(service services.IReportsService) *ReportsController {
	return &ReportsController{reportsService: service}
}

// GetDashboardAnalytics calculates institutional KPIs and daily trends
func (rc *ReportsController) GetDashboardAnalytics(c *gin.Context) {
	stats, err := rc.reportsService.CalculateDashboardKPIs()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to calculate analytics", "details": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": "success", "data": stats})
}

// GeneratePDFReport exports official attendance document stream
func (rc *ReportsController) GeneratePDFReport(c *gin.Context) {
	deptID := c.Query("department_id")
	startDate := c.Query("start_date")
	endDate := c.Query("end_date")

	pdfBytes, err := rc.reportsService.ExportPDFStatement(deptID, startDate, endDate)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Report compilation failed", "details": err.Error()})
		return
	}

	c.Header("Content-Type", "application/pdf")
	c.Header("Content-Disposition", "attachment; filename=Apex_Attendance_Report.pdf")
	c.Data(http.StatusOK, "application/pdf", pdfBytes)
}

// GetDefaultersList fetches students below 75% cutoff
func (rc *ReportsController) GetDefaultersList(c *gin.Context) {
	defaulters, err := rc.reportsService.GetDefaulterStudents(0.75)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch defaulters"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": "success", "data": defaulters})
}`,
    service: `package services

import (
	"fmt"
	"apex/models"
	"apex/repositories"
)

type IReportsService interface {
	CalculateDashboardKPIs() (*models.OverviewKPI, error)
	ExportPDFStatement(deptID, startDate, endDate string) ([]byte, error)
	GetDefaulterStudents(cutoffPct float64) ([]models.DefaulterStudent, error)
}

type ReportsService struct {
	repo repositories.IReportsRepository
}

func NewReportsService(repo repositories.IReportsRepository) IReportsService {
	return &ReportsService{repo: repo}
}

func (s *ReportsService) CalculateDashboardKPIs() (*models.OverviewKPI, error) {
	return s.repo.FetchDashboardKPIsFromDB()
}

func (s *ReportsService) GetDefaulterStudents(cutoffPct float64) ([]models.DefaulterStudent, error) {
	return s.repo.FetchDefaultersBelowThreshold(cutoffPct)
}

func (s *ReportsService) ExportPDFStatement(deptID, startDate, endDate string) ([]byte, error) {
	records, err := s.repo.FetchFilteredReportRecords(deptID, startDate, endDate)
	if err != nil {
		return nil, err
	}
	// Emulating PDF compilation engine
	pdfData := []byte(fmt.Sprintf("%%PDF-1.7 Output Records: %d", len(records)))
	return pdfData, nil
}`,
    repository: `package repositories

import (
	"database/sql"
	"apex/models"
)

type IReportsRepository interface {
	FetchDashboardKPIsFromDB() (*models.OverviewKPI, error)
	FetchDefaultersBelowThreshold(threshold float64) ([]models.DefaulterStudent, error)
	FetchFilteredReportRecords(deptID, startDate, endDate string) ([]models.DetailedRecord, error)
}

type ReportsRepository struct {
	db *sql.DB
}

func NewReportsRepository(db *sql.DB) IReportsRepository {
	return &ReportsRepository{db: db}
}

func (r *ReportsRepository) FetchDashboardKPIsFromDB() (*models.OverviewKPI, error) {
	query := \`
		SELECT 
			(SELECT COUNT(*) FROM students) as total_students,
			(SELECT COUNT(*) FROM faculty) as total_faculty,
			(SELECT COUNT(*) FROM departments) as total_depts
	\`
	var kpi models.OverviewKPI
	err := r.db.QueryRow(query).Scan(&kpi.TotalStudents, &kpi.TotalFaculty, &kpi.TotalDepartments)
	if err != nil {
		return nil, err
	}
	return &kpi, nil
}

func (r *ReportsRepository) FetchDefaultersBelowThreshold(threshold float64) ([]models.DefaulterStudent, error) {
	query := \`
		SELECT s.id, s.roll_number, s.full_name, s.department, s.overall_attendance_pct
		FROM student_attendance_stats s
		WHERE s.overall_attendance_pct < $1
		ORDER BY s.overall_attendance_pct ASC
	\`
	rows, err := r.db.Query(query, threshold*100)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var defaulters []models.DefaulterStudent
	for rows.Next() {
		var d models.DefaulterStudent
		if err := rows.Scan(&d.ID, &d.RollNumber, &d.FullName, &d.Department, &d.AttendancePct); err == nil {
			defaulters = append(defaulters, d)
		}
	}
	return defaulters, nil
}

func (r *ReportsRepository) FetchFilteredReportRecords(deptID, startDate, endDate string) ([]models.DetailedRecord, error) {
	return []models.DetailedRecord{}, nil
}`,
    models: `package models

import "time"

type OverviewKPI struct {
	TotalStudents    int     \`json:"total_students"\`
	TotalFaculty     int     \`json:"total_faculty"\`
	TotalDepartments int     \`json:"total_departments"\`
	TodayPercentage  float64 \`json:"today_percentage"\`
}

type DefaulterStudent struct {
	ID            string  \`json:"id"\`
	RollNumber    string  \`json:"roll_number"\`
	FullName      string  \`json:"full_name"\`
	Department    string  \`json:"department"\`
	AttendancePct float64 \`json:"attendance_pct"\`
}

type ScheduledReportJob struct {
	ID          string    \`json:"id"\`
	Title       string    \`json:"title"\`
	Frequency   string    \`json:"frequency"\`
	Recipients  []string  \`json:"recipients"\`
	Format      string    \`json:"format"\`
	NextRunTime time.Time \`json:"next_run_time"\`
	Status      string    \`json:"status"\`
}`,
    sql: `-- APEX ATTENDANCE DATABASE SCHEMA MIGRATION: REPORTS & ANALYTICS

CREATE TABLE IF NOT EXISTS reports (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    report_type VARCHAR(50) NOT NULL,
    created_by VARCHAR(64) NOT NULL,
    filters_json JSONB,
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS analytics_cache (
    cache_key VARCHAR(128) PRIMARY KEY,
    analytics_data JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS scheduled_reports (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    frequency VARCHAR(30) NOT NULL, -- DAILY, WEEKLY, MONTHLY
    recipients TEXT[] NOT NULL,
    format VARCHAR(20) DEFAULT 'PDF',
    status VARCHAR(20) DEFAULT 'ACTIVE',
    next_run TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_scheduled_reports_status ON scheduled_reports(status);
CREATE INDEX idx_reports_type ON reports(report_type);
`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(files[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Code2 className="w-5 h-5 text-cyan-400" />
            <span>Go (Golang) Reports & Analytics Backend Service</span>
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Clean Architecture Controller, Service, SQL Repository, and DB Schema for analytics calculations.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="px-4 py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs shadow-lg flex items-center gap-2"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Copied!' : 'Copy Go Source'}</span>
        </button>
      </div>

      <div className="rounded-3xl bg-slate-950 border border-white/10 overflow-hidden shadow-2xl">
        <div className="p-3 bg-slate-900 border-b border-white/10 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('controller')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition ${
              activeTab === 'controller'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            reports_controller.go
          </button>
          <button
            onClick={() => setActiveTab('service')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition ${
              activeTab === 'service'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            reports_service.go
          </button>
          <button
            onClick={() => setActiveTab('repository')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition ${
              activeTab === 'repository'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            reports_repository.go
          </button>
          <button
            onClick={() => setActiveTab('models')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition ${
              activeTab === 'models'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            models.go
          </button>
          <button
            onClick={() => setActiveTab('sql')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition ${
              activeTab === 'sql'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            schema.sql
          </button>
        </div>

        <pre className="p-6 text-xs font-mono text-cyan-300 bg-slate-950 overflow-x-auto custom-scrollbar leading-relaxed">
          {files[activeTab]}
        </pre>
      </div>
    </div>
  );
};
