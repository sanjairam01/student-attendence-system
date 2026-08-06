package utils

import (
	"time"
)

const (
	DateFormatYYYYMMDD = "2006-01-02"
	TimeFormatHHMMSS   = "15:04:05"
	DateTimeISO8601    = "2006-01-02T15:04:05Z07:00"
)

// FormatDate returns YYYY-MM-DD formatted date string
func FormatDate(t time.Time) string {
	return t.Format(DateFormatYYYYMMDD)
}

// FormatTime returns HH:MM:SS formatted time string
func FormatTime(t time.Time) string {
	return t.Format(TimeFormatHHMMSS)
}

// ParseDate converts YYYY-MM-DD string into time.Time object
func ParseDate(dateStr string) (time.Time, error) {
	return time.Parse(DateFormatYYYYMMDD, dateStr)
}

// GetStartOfDay returns 00:00:00 time for a given time
func GetStartOfDay(t time.Time) time.Time {
	return time.Date(t.Year(), t.Month(), t.Day(), 0, 0, 0, 0, t.Location())
}

// GetEndOfDay returns 23:59:59.999999999 time for a given time
func GetEndOfDay(t time.Time) time.Time {
	return time.Date(t.Year(), t.Month(), t.Day(), 23, 59, 59, 999999999, t.Location())
}
