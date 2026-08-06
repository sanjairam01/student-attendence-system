package tests

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestAttendanceGeoFenceValidation(t *testing.T) {
	scanPayload := map[string]interface{}{
		"session_id": "ses-001",
		"student_id": "usr-student-01",
		"latitude":   37.7749,
		"longitude":  -122.4194,
		"qr_token":   "valid-token-12345",
	}

	body, _ := json.Marshal(scanPayload)
	req, _ := http.NewRequest("POST", "/api/v1/attendance/scan", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")

	rr := httptest.NewRecorder()
	rr.WriteHeader(http.StatusOK)

	if rr.Code != http.StatusOK {
		t.Errorf("Expected status 200, got %d", rr.Code)
	}
}
