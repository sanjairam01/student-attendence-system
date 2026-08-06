package services

import (
	"errors"
	"fmt"
	"time"

	"smart-attendance-system/internal/models"
	"smart-attendance-system/internal/repositories"
	"smart-attendance-system/internal/utils"
)

type AuthService interface {
	Login(req models.LoginRequest) (*models.LoginResponse, error)
	Register(req models.RegisterUserRequest) (*models.User, error)
}

type authService struct {
	userRepo repositories.UserRepository
}

func NewAuthService(userRepo repositories.UserRepository) AuthService {
	return &authService{userRepo: userRepo}
}

func (s *authService) Login(req models.LoginRequest) (*models.LoginResponse, error) {
	user, err := s.userRepo.FindByEmail(req.Email)
	if err != nil {
		return nil, errors.New("invalid credentials")
	}

	if !user.IsActive {
		return nil, errors.New("user account is deactivated")
	}

	if !utils.CheckPasswordHash(req.Password, user.PasswordHash) {
		return nil, errors.New("invalid credentials")
	}

	token, err := utils.GenerateJWTToken(user.ID, user.Role.Name, user.Email)
	if err != nil {
		return nil, fmt.Errorf("failed to generate access token: %w", err)
	}

	refreshToken, _ := utils.GenerateRefreshToken(user.ID)

	now := time.Now()
	user.LastLogin = &now
	_ = s.userRepo.Update(user)

	return &models.LoginResponse{
		Token:        token,
		RefreshToken: refreshToken,
		User:         *user,
	}, nil
}

func (s *authService) Register(req models.RegisterUserRequest) (*models.User, error) {
	existing, _ := s.userRepo.FindByEmail(req.Email)
	if existing != nil {
		return nil, errors.New("email address is already registered")
	}

	hashedPassword, err := utils.HashPassword(req.Password)
	if err != nil {
		return nil, err
	}

	user := &models.User{
		RoleID:       req.RoleID,
		Email:        req.Email,
		PasswordHash: hashedPassword,
		FirstName:    req.FirstName,
		LastName:     req.LastName,
		Phone:        req.Phone,
		IsActive:     true,
		IsVerified:   true,
	}

	if err := s.userRepo.Create(user); err != nil {
		return nil, err
	}

	return user, nil
}
