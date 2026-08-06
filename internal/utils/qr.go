package utils

import (
	"fmt"
	"os"
	"path/filepath"

	"github.com/skip2/go-qrcode"
)

// GenerateQRCodePNG generates a PNG QR Code image for classroom automated check-ins
func GenerateQRCodePNG(content string, size int, outputPath string) (string, error) {
	if err := os.MkdirAll(filepath.Dir(outputPath), 0755); err != nil {
		return "", err
	}

	err := qrcode.WriteFile(content, qrcode.Medium, size, outputPath)
	if err != nil {
		return "", fmt.Errorf("failed to generate QR code: %w", err)
	}

	return outputPath, nil
}
