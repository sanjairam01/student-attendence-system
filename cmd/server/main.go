package main

import (
	"log"

	"smart-attendance-system/internal/config"
	"smart-attendance-system/internal/controllers"
	authCtrl "smart-attendance-system/internal/controllers/auth"
	"smart-attendance-system/internal/database"
	"smart-attendance-system/internal/repositories"
	authRepo "smart-attendance-system/internal/repositories/auth"
	"smart-attendance-system/internal/routes"
	"smart-attendance-system/internal/services"
	authServ "smart-attendance-system/internal/services/auth"
)

func main() {
	log.Println("🚀 Starting Smart Attendance Server with Auth Module from cmd/server...")

	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("Config load error: %v", err)
	}

	db, _ := database.ConnectDB(cfg)

	authRepository := authRepo.NewAuthRepository(db)
	userRepo := repositories.NewUserRepository(db)
	studentRepo := repositories.NewStudentRepository(db)
	facultyRepo := repositories.NewFacultyRepository(db)
	attendanceRepo := repositories.NewAttendanceRepository(db)
	academicRepo := repositories.NewAcademicRepository(db)
	leaveRepo := repositories.NewLeaveRepository(db)
	notifRepo := repositories.NewNotificationRepository(db)
	systemRepo := repositories.NewSystemRepository(db)

	authServiceModule := authServ.NewAuthService(authRepository)
	authService := services.NewAuthService(userRepo)
	studentService := services.NewStudentService(studentRepo, attendanceRepo)
	facultyService := services.NewFacultyService(facultyRepo, academicRepo)
	attendanceService := services.NewAttendanceService(attendanceRepo, facultyRepo)
	academicService := services.NewAcademicService(academicRepo)
	leaveService := services.NewLeaveService(leaveRepo, studentRepo, facultyRepo)
	reportService := services.NewReportService(studentRepo, attendanceRepo)
	notifService := services.NewNotificationService(notifRepo)
	dashboardService := services.NewDashboardService(studentRepo, facultyRepo, academicRepo, attendanceRepo)
	settingsService := services.NewSettingsService(systemRepo)

	_ = leaveService

	server := config.NewServer(cfg)
	routes.SetupRoutes(server.Engine, &routes.RouteDeps{
		AuthCtrl:         authCtrl.NewAuthController(authServiceModule),
		LegacyAuthCtrl:   controllers.NewAuthController(authService),
		StudentCtrl:      controllers.NewStudentController(studentService),
		FacultyCtrl:      controllers.NewFacultyController(facultyService),
		AdminCtrl:        controllers.NewAdminController(academicService, studentService),
		SuperAdminCtrl:   controllers.NewSuperAdminController(dashboardService, settingsService),
		AttendanceCtrl:   controllers.NewAttendanceController(attendanceService),
		ReportsCtrl:      controllers.NewReportsController(reportService),
		DashboardCtrl:    controllers.NewDashboardController(dashboardService),
		SettingsCtrl:     controllers.NewSettingsController(settingsService),
		NotificationCtrl: controllers.NewNotificationController(notifService),
	})

	if err := server.Start(); err != nil {
		log.Fatalf("Server stopped: %v", err)
	}
}
