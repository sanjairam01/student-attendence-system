package utils

import (
	"fmt"
	"mime/multipart"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// UploadFile handles file upload validation and storage
func UploadFile(c *gin.Context, file *multipart.FileHeader, subDir string) (string, error) {
	uploadBaseDir := "./uploads"
	targetDir := filepath.Join(uploadBaseDir, subDir)

	if err := os.MkdirAll(targetDir, 0755); err != nil {
		return "", fmt.Errorf("failed to create upload directory: %w", err)
	}

	ext := strings.ToLower(filepath.Ext(file.Filename))
	allowedExtensions := map[string]bool{
		".jpg": true, ".jpeg": true, ".png": true, ".pdf": true, ".docx": true, ".xlsx": true,
	}

	if !allowedExtensions[ext] {
		return "", fmt.Errorf("invalid file type: %s", ext)
	}

	newFileName := fmt.Sprintf("%d_%s%s", time.Now().Unix(), uuid.New().String()[:8], ext)
	destination := filepath.Join(targetDir, newFileName)

	if err := c.SaveUploadedFile(file, destination); err != nil {
		return "", fmt.Errorf("failed to save uploaded file: %w", err)
	}

	return destination, nil
}
