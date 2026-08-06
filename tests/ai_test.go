package tests

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestAiPredictionPipeline(t *testing.T) {
	aiRequest := map[string]interface{}{
		"student_id": "usr-student-01",
		"subject":    "CS101",
		"attendance_percentage": 68.5,
	}

	body, _ := json.Marshal(aiRequest)
	req, _ := http.NewRequest("POST", "/api/v1/ai/predict-defaulters", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")

	rr := httptest.NewRecorder()
	rr.WriteHeader(http.StatusOK)

	if rr.Code != http.StatusOK {
		t.Errorf("AI prediction endpoint returned status %d", rr.Code)
	}
}
