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
	log.Println("🚀 Initializing Smart Attendance Management System (Auth Module Enabled)...")

	// 1. Load Environmental Configuration
	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("Failed to load environment configuration: %v", err)
	}

	// 2. Connect MySQL Database Pool (GORM)
	db, err := database.ConnectDB(cfg)
	if err != nil {
		log.Printf("Warning: Database connection deferred (%v). Running with mock repository bindings.", err)
	} else {
		defer database.CloseDB(db)
	}

	// 3. Initialize Repositories
	authRepository := authRepo.NewAuthRepository(db)
	userRepo := repositories.NewUserRepository(db)
	studentRepo := repositories.NewStudentRepository(db)
	facultyRepo := repositories.NewFacultyRepository(db)
	attendanceRepo := repositories.NewAttendanceRepository(db)
	academicRepo := repositories.NewAcademicRepository(db)
	leaveRepo := repositories.NewLeaveRepository(db)
	notifRepo := repositories.NewNotificationRepository(db)
	systemRepo := repositories.NewSystemRepository(db)

	// 4. Initialize Services
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

	// 5. Initialize Controllers
	authControllerModule := authCtrl.NewAuthController(authServiceModule)
	authController := controllers.NewAuthController(authService)
	studentCtrl := controllers.NewStudentController(studentService)
	facultyCtrl := controllers.NewFacultyController(facultyService)
	adminCtrl := controllers.NewAdminController(academicService, studentService)
	superAdminCtrl := controllers.NewSuperAdminController(dashboardService, settingsService)
	attendanceCtrl := controllers.NewAttendanceController(attendanceService)
	reportsCtrl := controllers.NewReportsController(reportService)
	dashboardCtrl := controllers.NewDashboardController(dashboardService)
	settingsCtrl := controllers.NewSettingsController(settingsService)
	notifCtrl := controllers.NewNotificationController(notifService)

	// 6. Setup HTTP Router & Routes
	server := config.NewServer(cfg)
	routes.SetupRoutes(server.Engine, &routes.RouteDeps{
		AuthCtrl:         authControllerModule,
		LegacyAuthCtrl:   authController,
		StudentCtrl:      studentCtrl,
		FacultyCtrl:      facultyCtrl,
		AdminCtrl:        adminCtrl,
		SuperAdminCtrl:   superAdminCtrl,
		AttendanceCtrl:   attendanceCtrl,
		ReportsCtrl:      reportsCtrl,
		DashboardCtrl:    dashboardCtrl,
		SettingsCtrl:     settingsCtrl,
		NotificationCtrl: notifCtrl,
	})

	_ = leaveService

	// 7. Start HTTP Server with Graceful Shutdown
	if err := server.Start(); err != nil {
		log.Fatalf("Server shutdown with error: %v", err)
	}
}
