import React, { useState } from 'react';
import { Code2, Copy, Check } from 'lucide-react';

export const ParentGoSourceViewer: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeFile, setActiveFile] = useState<'controller' | 'service' | 'repository' | 'routes'>('controller');

  const files = {
    controller: `package controllers

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"apex/services"
)

type ParentController struct {
	parentService services.IParentService
}

func NewParentController(service services.IParentService) *ParentController {
	return &ParentController{parentService: service}
}

// GetChildSummary retrieves linked child's real-time attendance and academic status
func (pc *ParentController) GetChildSummary(c *gin.Context) {
	parentID := c.GetString("user_id")
	childID := c.Param("child_id")

	summary, err := pc.parentService.GetChildAttendanceSummary(parentID, childID)
	if err != nil {
		c.JSON(http.StatusForbidden, gin.H{"error": "Access denied or unlinked child ID", "details": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "success", "data": summary})
}`,
    service: `package services

import (
	"apex/models"
	"apex/repositories"
)

type IParentService interface {
	GetChildAttendanceSummary(parentID, childID string) (*models.ChildSummaryDTO, error)
}

type ParentService struct {
	parentRepo repositories.IParentRepository
}

func NewParentService(repo repositories.IParentRepository) IParentService {
	return &ParentService{parentRepo: repo}
}

func (s *ParentService) GetChildAttendanceSummary(parentID, childID string) (*models.ChildSummaryDTO, error) {
	return s.parentRepo.FetchChildSummaryForParent(parentID, childID)
}`,
    repository: `package repositories

import (
	"database/sql"
	"apex/models"
)

type IParentRepository interface {
	FetchChildSummaryForParent(parentID, childID string) (*models.ChildSummaryDTO, error)
}

type ParentRepository struct {
	db *sql.DB
}

func NewParentRepository(db *sql.DB) IParentRepository {
	return &ParentRepository{db: db}
}

func (r *ParentRepository) FetchChildSummaryForParent(parentID, childID string) (*models.ChildSummaryDTO, error) {
	query := \`
		SELECT s.id, s.roll_number, s.full_name, s.overall_attendance_pct
		FROM parent_student_links p
		JOIN students s ON p.student_id = s.id
		WHERE p.parent_id = $1 AND s.id = $2
	\`
	var dto models.ChildSummaryDTO
	err := r.db.QueryRow(query, parentID, childID).Scan(&dto.ID, &dto.RollNumber, &dto.FullName, &dto.AttendancePct)
	if err != nil {
		return nil, err
	}
	return &dto, nil
}`,
    routes: `package routes

import (
	"github.com/gin-gonic/gin"
	"apex/controllers"
	"apex/middleware"
)

func RegisterParentRoutes(router *gin.RouterGroup, parentCtrl *controllers.ParentController) {
	parentGroup := router.Group("/parent")
	parentGroup.Use(middleware.JWTMiddleware(), middleware.RoleGuard("Parent"))
	{
		parentGroup.GET("/child/:child_id/summary", parentCtrl.GetChildSummary)
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
            <span>Go (Golang) Clean Architecture Backend - Parent Module</span>
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Read-only child tracking API endpoints with parent-student security authorization guards.
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
            parent_controller.go
          </button>
          <button
            onClick={() => setActiveFile('service')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition ${
              activeFile === 'service'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            parent_service.go
          </button>
          <button
            onClick={() => setActiveFile('repository')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition ${
              activeFile === 'repository'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            parent_repository.go
          </button>
          <button
            onClick={() => setActiveFile('routes')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition ${
              activeFile === 'routes'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            parent_routes.go
          </button>
        </div>

        <pre className="p-6 text-xs font-mono text-emerald-300 bg-slate-950 overflow-x-auto custom-scrollbar leading-relaxed">
          {files[activeFile]}
        </pre>
      </div>
    </div>
  );
};
