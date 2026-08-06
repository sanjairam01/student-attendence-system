package utils

import (
	"fmt"
	"net/smtp"

	"smart-attendance-system/internal/config"
)

// SendEmailNotification sends an HTML email over SMTP using configured credentials
func SendEmailNotification(toEmail string, subject string, htmlBody string) error {
	cfg := config.GlobalConfig
	if cfg == nil || cfg.SMTP.Host == "" {
		return fmt.Errorf("SMTP settings not configured")
	}

	auth := smtp.PlainAuth("", cfg.SMTP.Username, cfg.SMTP.Password, cfg.SMTP.Host)

	header := make(map[string]string)
	header["From"] = fmt.Sprintf("%s <%s>", cfg.SMTP.FromName, cfg.SMTP.FromAddress)
	header["To"] = toEmail
	header["Subject"] = subject
	header["MIME-Version"] = "1.0"
	header["Content-Type"] = "text/html; charset=\"utf-8\""

	message := ""
	for k, v := range header {
		message += fmt.Sprintf("%s: %s\r\n", k, v)
	}
	message += "\r\n" + htmlBody

	addr := fmt.Sprintf("%s:%d", cfg.SMTP.Host, cfg.SMTP.Port)
	err := smtp.SendMail(addr, auth, cfg.SMTP.FromAddress, []string{toEmail}, []byte(message))
	if err != nil {
		return fmt.Errorf("failed to dispatch email: %w", err)
	}

	return nil
}
