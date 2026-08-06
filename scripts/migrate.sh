#!/bin/bash
# Script to run database migrations against MySQL instance
echo "Running database schema migration..."
mysql -h ${DB_HOST:-127.0.0.1} -P ${DB_PORT:-3306} -u ${DB_USER:-root} -p${DB_PASSWORD} ${DB_NAME:-smart_attendance_db} < migrations/000001_init_schema.up.sql
mysql -h ${DB_HOST:-127.0.0.1} -P ${DB_PORT:-3306} -u ${DB_USER:-root} -p${DB_PASSWORD} ${DB_NAME:-smart_attendance_db} < migrations/seeds.sql
echo "Migration and seeding completed successfully!"
