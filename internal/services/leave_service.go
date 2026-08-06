package services

import (
	"fmt"

	"smart-attendance-system/internal/models"
	"smart-attendance-system/internal/repositories"
	"smart-attendance-system/internal/utils"
)

type LeaveService interface {
	ApplyLeave(studentUserID uint, dto models.LeaveRequestDTO, proofURL string) (*models.LeaveRequest, error)
	GetStudentLeaves(studentUserID uint) ([]models.LeaveRequest, error)
	GetPendingLeaves() ([]models.LeaveRequest, error)
	ReviewLeave(facultyUserID uint, leaveID uint, dto models.ReviewLeaveDTO) error
}

type leaveService struct {
	leaveRepo   repositories.LeaveRepository
	studentRepo repositories.StudentRepository
	facultyRepo repositories.FacultyRepository
}

func NewLeaveService(leaveRepo repositories.LeaveRepository, studentRepo repositories.StudentRepository, facultyRepo repositories.FacultyRepository) LeaveService {
	return &leaveService{leaveRepo: leaveRepo, studentRepo: studentRepo, facultyRepo: facultyRepo}
}

func (s *leaveService) ApplyLeave(studentUserID uint, dto models.LeaveRequestDTO, proofURL string) (*models.LeaveRequest, error) {
	student, err := s.studentRepo.FindByUserID(studentUserID)
	if err != nil {
		return nil, fmt.Errorf("student record not found: %w", err)
	}

	startDate, err := utils.ParseDate(dto.StartDate)
	if err != nil {
		return nil, fmt.Errorf("invalid start date: %w", err)
	}

	endDate, err := utils.ParseDate(dto.EndDate)
	if err != nil {
		return nil, fmt.Errorf("invalid end date: %w", err)
	}

	leave := &models.LeaveRequest{
		StudentID:        student.ID,
		StartDate:        startDate,
		EndDate:          endDate,
		Reason:           dto.Reason,
		ProofDocumentURL: proofURL,
		Status:           models.LeavePending,
	}

	if err := s.leaveRepo.Create(leave); err != nil {
		return nil, err
	}

	return leave, nil
}

func (s *leaveService) GetStudentLeaves(studentUserID uint) ([]models.LeaveRequest, error) {
	student, err := s.studentRepo.FindByUserID(studentUserID)
	if err != nil {
		return nil, err
	}
	return s.leaveRepo.ListByStudent(student.ID)
}

func (s *leaveService) GetPendingLeaves() ([]models.LeaveRequest, error) {
	return s.leaveRepo.ListPending()
}

func (s *leaveService) ReviewLeave(facultyUserID uint, leaveID uint, dto models.ReviewLeaveDTO) error {
	faculty, _ := s.facultyRepo.FindByUserID(facultyUserID)

	leave, err := s.leaveRepo.FindByID(leaveID)
	if err != nil {
		return err
	}

	leave.Status = dto.Status
	if faculty != nil {
		leave.ReviewedByFacultyID = &faculty.ID
	}
	if dto.RejectionReason != "" {
		leave.RejectionReason = dto.RejectionReason
	}

	return s.leaveRepo.Update(leave)
}
