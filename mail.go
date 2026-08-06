package main

import (
	"smart-attendance-system/internal/utils"
)

// SendEmail dispatches SMTP emails
func SendEmail(to string, subject string, body string) error {
	return utils.SendEmailNotification(to, subject, body)
}
