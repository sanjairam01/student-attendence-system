package auth

import (
	"errors"

	"smart-attendance-system/internal/models"
	authModels "smart-attendance-system/internal/models/auth"

	"gorm.io/gorm"
)

type AuthRepository interface {
	FindUserByEmail(email string) (*models.User, error)
	FindUserByID(id uint) (*models.User, error)
	CreateUser(user *models.User) error
	UpdateUser(user *models.User) error
	
	CreatePasswordReset(reset *authModels.PasswordReset) error
	FindPasswordResetByToken(email, token string) (*authModels.PasswordReset, error)
	MarkPasswordResetUsed(id uint) error
	
	CreateEmailVerification(ev *authModels.EmailVerification) error
	FindEmailVerificationByToken(token string) (*authModels.EmailVerification, error)
	MarkEmailVerified(id uint, userID uint) error
	
	RecordLoginHistory(lh *authModels.LoginHistory) error
	
	SaveRefreshToken(rt *authModels.RefreshToken) error
	FindRefreshToken(token string) (*authModels.RefreshToken, error)
	RevokeRefreshToken(token string) error
	
	GetRolePermissions(roleID uint) ([]string, error)
}

type authRepositoryImpl struct {
	db *gorm.DB
}

func NewAuthRepository(db *gorm.DB) AuthRepository {
	return &authRepositoryImpl{db: db}
}

func (r *authRepositoryImpl) FindUserByEmail(email string) (*models.User, error) {
	if r.db == nil {
		// Mock handling for non-db testing
		return nil, errors.New("database connection unavailable")
	}
	var user models.User
	err := r.db.Preload("Role").Where("email = ?", email).First(&user).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *authRepositoryImpl) FindUserByID(id uint) (*models.User, error) {
	if r.db == nil {
		return nil, errors.New("database connection unavailable")
	}
	var user models.User
	err := r.db.Preload("Role").First(&user, id).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *authRepositoryImpl) CreateUser(user *models.User) error {
	if r.db == nil {
		return nil
	}
	return r.db.Create(user).Error
}

func (r *authRepositoryImpl) UpdateUser(user *models.User) error {
	if r.db == nil {
		return nil
	}
	return r.db.Save(user).Error
}

func (r *authRepositoryImpl) CreatePasswordReset(reset *authModels.PasswordReset) error {
	if r.db == nil {
		return nil
	}
	return r.db.Create(reset).Error
}

func (r *authRepositoryImpl) FindPasswordResetByToken(email, token string) (*authModels.PasswordReset, error) {
	if r.db == nil {
		return nil, errors.New("database unavailable")
	}
	var pr authModels.PasswordReset
	err := r.db.Where("email = ? AND token = ? AND is_used = false AND expires_at > NOW()", email, token).First(&pr).Error
	if err != nil {
		return nil, err
	}
	return &pr, nil
}

func (r *authRepositoryImpl) MarkPasswordResetUsed(id uint) error {
	if r.db == nil {
		return nil
	}
	return r.db.Model(&authModels.PasswordReset{}).Where("id = ?", id).Update("is_used", true).Error
}

func (r *authRepositoryImpl) CreateEmailVerification(ev *authModels.EmailVerification) error {
	if r.db == nil {
		return nil
	}
	return r.db.Create(ev).Error
}

func (r *authRepositoryImpl) FindEmailVerificationByToken(token string) (*authModels.EmailVerification, error) {
	if r.db == nil {
		return nil, errors.New("database unavailable")
	}
	var ev authModels.EmailVerification
	err := r.db.Where("token = ? AND is_verified = false AND expires_at > NOW()", token).First(&ev).Error
	if err != nil {
		return nil, err
	}
	return &ev, nil
}

func (r *authRepositoryImpl) MarkEmailVerified(id uint, userID uint) error {
	if r.db == nil {
		return nil
	}
	err := r.db.Model(&authModels.EmailVerification{}).Where("id = ?", id).Update("is_verified", true).Error
	if err != nil {
		return err
	}
	return r.db.Model(&models.User{}).Where("id = ?", userID).Update("status", "Active").Error
}

func (r *authRepositoryImpl) RecordLoginHistory(lh *authModels.LoginHistory) error {
	if r.db == nil {
		return nil
	}
	return r.db.Create(lh).Error
}

func (r *authRepositoryImpl) SaveRefreshToken(rt *authModels.RefreshToken) error {
	if r.db == nil {
		return nil
	}
	return r.db.Create(rt).Error
}

func (r *authRepositoryImpl) FindRefreshToken(token string) (*authModels.RefreshToken, error) {
	if r.db == nil {
		return nil, errors.New("database unavailable")
	}
	var rt authModels.RefreshToken
	err := r.db.Where("token = ? AND is_revoked = false AND expires_at > NOW()", token).First(&rt).Error
	if err != nil {
		return nil, err
	}
	return &rt, nil
}

func (r *authRepositoryImpl) RevokeRefreshToken(token string) error {
	if r.db == nil {
		return nil
	}
	return r.db.Model(&authModels.RefreshToken{}).Where("token = ?", token).Update("is_revoked", true).Error
}

func (r *authRepositoryImpl) GetRolePermissions(roleID uint) ([]string, error) {
	if r.db == nil {
		// Mock permissions per role ID
		switch roleID {
		case 1:
			return []string{"*"}, nil
		case 2:
			return []string{"manage_institution", "view_reports", "manage_users"}, nil
		case 3:
			return []string{"mark_attendance", "view_classes", "manage_profile"}, nil
		case 4:
			return []string{"view_attendance", "view_profile", "apply_leave"}, nil
		case 5:
			return []string{"view_child_attendance"}, nil
		}
		return []string{}, nil
	}

	var perms []string
	err := r.db.Table("permissions").
		Select("permissions.name").
		Joins("JOIN role_permissions ON role_permissions.permission_id = permissions.id").
		Where("role_permissions.role_id = ?", roleID).
		Scan(&perms).Error

	return perms, err
}
