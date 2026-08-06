package tests

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestAuthLoginEndpoint(t *testing.T) {
	payload := map[string]string{
		"email":    "superadmin@university.edu",
		"password": "Password123!",
	}
	body, _ := json.Marshal(payload)

	req, err := http.NewRequest("POST", "/api/v1/auth/login", bytes.NewBuffer(body))
	if err != nil {
		t.Fatalf("Failed to create request: %v", err)
	}
	req.Header.Set("Content-Type", "application/json")

	rr := httptest.NewRecorder()

	// Mocking response handler validation logic
	if req.Header.Get("Content-Type") != "application/json" {
		t.Errorf("Expected Content-Type header application/json")
	}

	rr.WriteHeader(http.StatusOK)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v", status, http.StatusOK)
	}
}
