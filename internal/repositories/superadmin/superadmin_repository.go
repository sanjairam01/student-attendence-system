package superadmin

import (
	"context"
)

type SuperAdminRepository struct{}

func NewSuperAdminRepository() *SuperAdminRepository {
	return &SuperAdminRepository{}
}

func (r *SuperAdminRepository) FetchStudents(ctx context.Context) ([]map[string]interface{}, error) {
	return []map[string]interface{}{
		{
			"id":             "STU-2026-001",
			"admission_no":   "ADM/2026/001",
			"roll_no":        "26CS01",
			"reg_no":         "REG20268801",
			"full_name":      "Alexander Wright",
			"gender":         "Male",
			"dob":            "2004-05-14",
			"email":          "alexander.wright@smartattend.edu",
			"phone":          "+1 (555) 234-5678",
			"parent_name":    "Arthur Wright",
			"parent_phone":   "+1 (555) 876-5432",
			"address":        "742 Evergreen Terrace, Springfield",
			"department":     "Computer Science & Engineering",
			"course":         "B.Tech Computer Science",
			"semester":       "Semester VI",
			"section":        "Section A",
			"blood_group":    "O+",
			"nationality":    "American",
			"status":         "Active",
			"attendance_pct": 96.8,
		},
		{
			"id":             "STU-2026-002",
			"admission_no":   "ADM/2026/002",
			"roll_no":        "26CS02",
			"reg_no":         "REG20268802",
			"full_name":      "Sophia Chen",
			"gender":         "Female",
			"dob":            "2004-09-22",
			"email":          "sophia.chen@smartattend.edu",
			"phone":          "+1 (555) 345-6789",
			"parent_name":    "David Chen",
			"parent_phone":   "+1 (555) 987-6543",
			"address":        "128 Silicon Way, San Jose, CA",
			"department":     "Computer Science & Engineering",
			"course":         "B.Tech Computer Science",
			"semester":       "Semester VI",
			"section":        "Section A",
			"blood_group":    "A+",
			"nationality":    "American",
			"status":         "Active",
			"attendance_pct": 98.2,
		},
	}, nil
}

func (r *SuperAdminRepository) InsertStudent(ctx context.Context, payload map[string]interface{}) (map[string]interface{}, error) {
	payload["id"] = "STU-2026-NEW"
	return payload, nil
}

func (r *SuperAdminRepository) UpdateStudent(ctx context.Context, id string, payload map[string]interface{}) (map[string]interface{}, error) {
	payload["id"] = id
	return payload, nil
}

func (r *SuperAdminRepository) DeleteStudent(ctx context.Context, id string) error {
	return nil
}

func (r *SuperAdminRepository) FetchFaculty(ctx context.Context) ([]map[string]interface{}, error) {
	return []map[string]interface{}{
		{
			"id":                "FAC-101",
			"full_name":         "Dr. Robert Miller",
			"email":             "robert.miller@smartattend.edu",
			"department":        "Computer Science & Engineering",
			"qualification":     "Ph.D. in Distributed Systems (MIT)",
			"experience":        "14 Years",
			"assigned_subjects": []string{"CS301 Networks", "CS402 Distributed OS"},
			"status":            "Active",
		},
	}, nil
}

func (r *SuperAdminRepository) FetchDepartments(ctx context.Context) ([]map[string]interface{}, error) {
	return []map[string]interface{}{
		{
			"id":            "DEP-01",
			"name":          "Computer Science & Engineering",
			"code":          "CSE",
			"head":          "Dr. Robert Miller",
			"student_count": 850,
			"faculty_count": 28,
		},
		{
			"id":            "DEP-02",
			"name":          "Electronics & Communication",
			"code":          "ECE",
			"head":          "Dr. Elena Rostova",
			"student_count": 620,
			"faculty_count": 22,
		},
	}, nil
}

func (r *SuperAdminRepository) FetchAuditLogs(ctx context.Context) ([]map[string]interface{}, error) {
	return []map[string]interface{}{
		{
			"timestamp": "2026-08-05 07:22:01",
			"user":      "superadmin@smartattend.edu",
			"action":    "SETTINGS_UPDATE",
			"details":   "Updated academic calendar semester dates",
			"ip_address": "192.168.1.100",
		},
		{
			"timestamp": "2026-08-05 07:15:30",
			"user":      "superadmin@smartattend.edu",
			"action":    "ROLE_ASSIGN",
			"details":   "Assigned Department Head permissions to Dr. Miller",
			"ip_address": "192.168.1.100",
		},
	}, nil
}
