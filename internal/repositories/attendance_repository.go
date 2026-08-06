package repositories

import (
	"time"

	"smart-attendance-system/internal/models"

	"gorm.io/gorm"
)

type AttendanceRepository interface {
	SaveBatch(records []models.Attendance) error
	FindByStudentAndDate(studentID uint, date time.Time) ([]models.Attendance, error)
	GetStudentSummary(studentID uint) (int, int, float64, error)
	GetClassAttendanceForDate(classID uint, date time.Time) ([]models.Attendance, error)
	LogAttendanceChange(logRecord *models.AttendanceLog) error
	GetOverallAverage() (float64, error)
}

type attendanceRepository struct {
	db *gorm.DB
}

func NewAttendanceRepository(db *gorm.DB) AttendanceRepository {
	return &attendanceRepository{db: db}
}

func (r *attendanceRepository) SaveBatch(records []models.Attendance) error {
	return r.db.Transaction(func(tx *gorm.DB) error {
		for _, rec := range records {
			var existing models.Attendance
			err := tx.Where("student_id = ? AND class_id = ? AND date = ?", rec.StudentID, rec.ClassID, rec.Date).First(&existing).Error
			if err == nil {
				// Record exists -> update
				existing.Status = rec.Status
				existing.Remarks = rec.Remarks
				existing.MarkedMethod = rec.MarkedMethod
				if err := tx.Save(&existing).Error; err != nil {
					return err
				}
			} else {
				// Create new record
				if err := tx.Create(&rec).Error; err != nil {
					return err
				}
			}
		}
		return nil
	})
}

func (r *attendanceRepository) FindByStudentAndDate(studentID uint, date time.Time) ([]models.Attendance, error) {
	var list []models.Attendance
	err := r.db.Preload("Class").Preload("Class.Subject").Where("student_id = ? AND date = ?", studentID, date).Find(&list).Error
	return list, err
}

func (r *attendanceRepository) GetStudentSummary(studentID uint) (int, int, float64, error) {
	var total int64
	var attended int64

	if err := r.db.Model(&models.Attendance{}).Where("student_id = ?", studentID).Count(&total).Error; err != nil {
		return 0, 0, 0, err
	}

	if total == 0 {
		return 0, 0, 100.0, nil
	}

	if err := r.db.Model(&models.Attendance{}).Where("student_id = ? AND status IN ('Present', 'Excused')", studentID).Count(&attended).Error; err != nil {
		return 0, 0, 0, err
	}

	percentage := (float64(attended) / float64(total)) * 100.0
	return int(total), int(attended), percentage, nil
}

func (r *attendanceRepository) GetClassAttendanceForDate(classID uint, date time.Time) ([]models.Attendance, error) {
	var records []models.Attendance
	err := r.db.Preload("Student").Preload("Student.User").Where("class_id = ? AND date = ?", classID, date).Find(&records).Error
	return records, err
}

func (r *attendanceRepository) LogAttendanceChange(logRecord *models.AttendanceLog) error {
	return r.db.Create(logRecord).Error
}

func (r *attendanceRepository) GetOverallAverage() (float64, error) {
	var total int64
	var attended int64

	if err := r.db.Model(&models.Attendance{}).Count(&total).Error; err != nil || total == 0 {
		return 100.0, nil
	}

	_ = r.db.Model(&models.Attendance{}).Where("status IN ('Present', 'Excused')").Count(&attended)
	return (float64(attended) / float64(total)) * 100.0, nil
}
