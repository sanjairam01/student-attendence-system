# Clean Architecture Specifications

## Clean Architecture Principles in Smart Attendance System

1. **Entities Layer (`internal/models`)**: Contains core enterprise data models (User, Student, Faculty, Attendance, Course, etc.) without external dependencies.
2. **Use Cases / Service Layer (`internal/services`)**: Encapsulates application specific business rules (e.g., calculating percentage thresholds, attendance eligibility, leave reviews).
3. **Interface Adapters / Controllers & Repositories (`internal/controllers`, `internal/repositories`)**: Converts data between the HTTP format and domain models.
4. **Frameworks & Drivers (`internal/routes`, `internal/middleware`, `internal/database`)**: Gin framework routing, MySQL database drivers, JWT utilities.

## Database Entity Relationships

- **Department** (1) -> (*) **Course**
- **Course** (1) -> (*) **Subject**
- **Subject** (1) -> (*) **Class**
- **Faculty** (1) -> (*) **Class**
- **Student** (1) -> (*) **Attendance**
- **Class** (1) -> (*) **Attendance**
