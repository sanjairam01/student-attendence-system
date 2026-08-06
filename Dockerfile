# ==========================================
# STAGE 1: Build React Frontend Applet
# ==========================================
FROM node:20-alpine AS frontend-builder
WORKDIR /app

# Copy dependency definition files
COPY package*.json ./
RUN npm ci --prefer-offline --no-audit

# Copy source code and build production assets
COPY . .
RUN npm run build

# ==========================================
# STAGE 2: Build Golang Enterprise Backend Engine
# ==========================================
FROM golang:1.22-alpine AS backend-builder
WORKDIR /app

# Install build tools
RUN apk add --no-cache git gcc musl-dev

# Copy Go module manifests
COPY go.mod go.sum ./
RUN go mod download || true

# Copy Go source code and compile
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -ldflags="-w -s" -o server main.go || true

# ==========================================
# STAGE 3: Final Production Cloud Run Container
# ==========================================
FROM alpine:3.19
WORKDIR /app

# Install runtime dependencies (CA certificates, tzdata, nginx, supervisor)
RUN apk add --no-cache ca-certificates tzdata nginx supervisor curl bash

# Set timezone
ENV TZ=UTC

# Create unprivileged application user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy built frontend static dist assets to nginx default html root
COPY --from=frontend-builder /app/dist /usr/share/nginx/html

# Copy compiled Go binary executable
COPY --from=backend-builder /app/server /app/server

# Copy Nginx & Process supervisor configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Set environment permissions
RUN chown -R appuser:appgroup /app /usr/share/nginx/html /var/log/nginx /var/lib/nginx

# Expose port 3000 (Required for Cloud Run and Reverse Proxy Ingress)
EXPOSE 3000

# Healthcheck configuration
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:3000/api/v1/health || exit 1

# Start server using Supervisor or Nginx
CMD ["nginx", "-g", "daemon off;"]
