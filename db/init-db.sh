#!/bin/sh
# Runs once, the first time the Postgres container starts with an empty volume.
# 1. Applies the Prisma migration files in order so the tables exist.
# 2. Loads sample products (db/seed.sql), if present.
set -e
for f in $(ls /migrations/*/migration.sql | sort); do
  echo "Applying $f"
  psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" -f "$f"
done

if [ -f /seed/seed.sql ]; then
  echo "Loading sample data"
  psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" -f /seed/seed.sql
fi
