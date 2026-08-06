package config

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gin-gonic/gin"
)

// Server encapsulates HTTP server setup and graceful shutdown logic
type Server struct {
	Engine *gin.Engine
	Config *Config
	http   *http.Server
}

// NewServer initializes Gin engine and returns a Server instance
func NewServer(cfg *Config) *Server {
	if cfg.App.Env == "production" {
		gin.SetMode(gin.ReleaseMode)
	} else {
		gin.SetMode(gin.DebugMode)
	}

	engine := gin.New()

	return &Server{
		Engine: engine,
		Config: cfg,
	}
}

// Start begins serving HTTP requests with graceful shutdown listening
func (s *Server) Start() error {
	addr := fmt.Sprintf(":%s", s.Config.App.Port)

	s.http = &http.Server{
		Addr:           addr,
		Handler:        s.Engine,
		ReadTimeout:    15 * time.Second,
		WriteTimeout:   15 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}

	go func() {
		log.Printf("🚀 %s server listening on %s (%s mode)\n", s.Config.App.Name, addr, s.Config.App.Env)
		if err := s.http.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Server failed to start: %v\n", err)
		}
	}()

	// Wait for interrupt signal to gracefully shut down the server
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	log.Println("Shutting down HTTP server gracefully...")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := s.http.Shutdown(ctx); err != nil {
		log.Printf("Server forced shutdown error: %v\n", err)
		return err
	}

	log.Println("Server exiting complete.")
	return nil
}
