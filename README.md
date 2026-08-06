# Smart Attendance Management System Enterprise 🚀

[![Go Version](https://img.shields.io/badge/Go-1.22+-00ADD8?style=flat&logo=go)](https://golang.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?style=flat&logo=tailwindcss)](https://tailwindcss.com)
[![Docker Ready](https://img.shields.io/badge/Docker-Multi--stage-2496ED?style=flat&logo=docker)](https://www.docker.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

An enterprise-grade, multi-role academic attendance engineering platform built for universities and colleges. Combines real-time location geo-fencing, dynamic rotating QR code validation, biometric fingerprint/facial AI verification, predictive student risk intelligence with Gemini AI, and comprehensive multi-role access control (Super Admin, Admin, Faculty, Student, Parent).

---

## 🏛️ System Architecture

```
                               ┌───────────────────────────────────────────────┐
                               │           Client Interfaces / PWA             │
                               │  (SuperAdmin, Admin, Faculty, Student, Parent) │
                               └──────────────────────┬────────────────────────┘
                                                      │ HTTPS / WSS
                                                      ▼
                               ┌───────────────────────────────────────────────┐
                               │       Nginx Reverse Proxy & Rate Limiter      │
                               └──────────────────────┬────────────────────────┘
                                                      │
                                                      ▼
                               ┌───────────────────────────────────────────────┐
                               │           Golang Gin REST API Engine          │
                               │   (JWT Auth, Geo-Fence Calc, AI Proxy)       │
                               └──────────────┬─────────────────┬──────────────┘
                                              │                 │
                      ┌───────────────────────┴─┐             ┌─┴──────────────────────┐
                      ▼                         ▼             ▼                        ▼
           ┌─────────────────────┐   ┌──────────────────┐  ┌─────────────────┐  ┌─────────────┐
           │ MySQL 8.0 Database  │   │ Redis Cache      │  │ Google Gemini   │  │ WebSockets  │
           │ (Durable Storage)   │   │ (Session/Limits) │  │ AI Engine       │  │ Engine      │
           └─────────────────────┘   └──────────────────┘  └─────────────────┘  └─────────────┘
```

---

## ✨ Key Enterprise Capabilities

### 👑 1. Multi-Role Authorization Suite
- **Super Admin**: Institution setup, global audit logs, system telemetry, database backup/recovery.
- **Admin**: Department management, course allocation, faculty assignments, schedule authoring.
- **Faculty**: Instant QR generation, geo-fenced session initiation, attendance override, leave approval.
- **Student**: Interactive PWA QR scanner, geo-fence GPS verification, attendance status dashboard, leave application.
- **Parent**: Direct parent monitoring portal, real-time absence alerts, performance tracking.

### 📍 2. Geo-Fenced & Rotating QR Attendance Verification
- **Dynamic QR Code**: Cryptographically signed rotating token preventing proxy attendance screenshots.
- **Haversine Geo-Fence**: Real-time GPS distance verification against classroom bounds (e.g. 50-meter radius limit).
- **Biometric & Facial Confidence**: Confidence scoring algorithm ensuring physical attendance authenticity.

### 🤖 3. AI Attendance Intelligence Engine
- **Predictive Defaulter Analysis**: Early detection of students falling below attendance thresholds (e.g. 75%).
- **Automated Risk Mitigation**: Context-aware intervention recommendations generated via Google Gemini AI.
- **Natural Language Query Hub**: Direct conversational queries over institutional records.

### 📊 4. Advanced Analytics & Export Hub
- **Formats Supported**: Exportable PDF, CSV, Excel reports by subject, department, or date range.
- **Visual Analytics**: Interactive attendance trends using Recharts data visualization.

---

## 🛠️ Technology Stack

- **Backend Runtime**: Go (Golang) 1.22+ with Gin Web Framework & GORM
- **Frontend Framework**: React 18 with TypeScript & Vite
- **Styling & UI**: Tailwind CSS v4, Lucide Icons, Framer Motion
- **Database Engine**: MySQL 8.0 / PostgreSQL / Cloud SQL
- **Caching & Rate Limiting**: Redis 7.2
- **AI Engine**: Google Gemini API Integration (`@google/genai`)
- **Containerization**: Docker, Docker Compose, Nginx

---

## ⚡ Quick Start with Docker Compose

### Prerequisites
- Docker Engine 24+ & Docker Compose v2+
- Node.js 20+ (for local frontend development)
- Go 1.22+ (for local backend development)

### 1. Clone & Configure Environment
```bash
cp .env.example .env
```

### 2. Launch Stack via Docker Compose
```bash
docker-compose up -d --build
```

Access the application in your browser:
- **Application UI**: `http://localhost:3000`
- **API Health Check**: `http://localhost:3000/api/v1/health`

---

## 📂 Repository Structure

```
├── Dockerfile                  # Multi-stage production container build
├── docker-compose.yml          # Container orchestration (App + MySQL + Redis)
├── nginx.conf                  # Nginx reverse proxy & rate limiting
├── database/
│   ├── schema_production.sql   # Production DDL schema with indexes
│   └── seed_production.sql     # Initial seed data for all roles
├── docs/
│   └── openapi.yaml            # OpenAPI 3.0 API Specification
├── public/
│   ├── manifest.json           # PWA Web Manifest
│   └── sw.js                   # PWA Service Worker
├── src/
│   ├── components/             # React visual design components
│   │   ├── superadmin/         # Super Admin governance components
│   │   ├── admin/              # Academic Admin management components
│   │   ├── faculty/            # Faculty session & marking controls
│   │   ├── student/            # Student PWA scanner & stats
│   │   ├── parent/             # Parent monitoring portal
│   │   ├── ai/                 # AI Attendance Intelligence Hub
│   │   ├── reports/            # Export & Analytics Hub
│   │   └── system/             # System Telemetry & Backups
│   ├── App.tsx                 # Main Application router & entry
│   └── main.tsx                # React DOM Mount Point
├── tests/                      # Go unit & integration test suite
│   ├── auth_test.go
│   ├── attendance_test.go
│   └── ai_test.go
└── package.json                # Frontend package dependencies
```

---

## 🔒 Security Hardening

- **JWT Tokens**: Signed with HS256 algorithm and 24-hour expiration.
- **OWASP Headers**: CSP, X-Frame-Options SAMEORIGIN, X-Content-Type-Options.
- **Bcrypt Hashing**: User passwords hashed with salt cost factor 12.
- **SQL Injection Guard**: Parameterized GORM queries and strict input sanitization.
- **Rate Limiting**: Nginx and Redis token bucket rate limiting (30 req/s API, 5 req/s Auth).

---

## 📄 License

This enterprise platform is released under the MIT License.
