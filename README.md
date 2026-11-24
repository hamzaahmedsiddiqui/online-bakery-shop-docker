# BakeWell: Online Bakery Shop (Docker, CI/CD, AWS)

BakeWell is a full-stack bakery shop: product catalogue, user accounts, favorites and cart, plus an admin dashboard. It runs fully in Docker and was deployed on AWS.

![Docker build](https://github.com/hamzaahmedsiddiqui/online-bakery-shop-docker-aws/actions/workflows/docker-build.yml/badge.svg)

## Tech stack

- **Frontend:** React (Vite + TypeScript), served by Nginx
- **Backend:** Node.js (Express) REST API, JWT auth, bcrypt password hashing
- **Database:** PostgreSQL 16 (schema managed with Prisma migrations)
- **Containers:** Docker, Docker Compose
- **CI:** GitHub Actions (builds both images and smoke-tests the full stack)
- **Cloud:** AWS (EC2, Nginx reverse proxy, RDS, Application Load Balancer)

## Architecture

```
Browser ──► Nginx (frontend container, :8080)
              ├── /        → React static files
              └── /api/*   → backend container (:5050) ──► PostgreSQL (:5432)
```

On AWS: User → ALB / Nginx on EC2 → React build + Node API → Amazon RDS.

## Run locally with Docker

Requirements: Docker with Docker Compose.

```bash
cp .env.example .env        # then set your own passwords and JWT secret
docker compose up --build
```

| Service  | URL                            |
|----------|--------------------------------|
| Frontend | http://localhost:8080          |
| Backend  | http://localhost:5050/health   |
| Postgres | localhost:5432                 |

On the first start, the database tables are created from `backend/prisma/migrations` and 8 sample products are loaded from `db/seed.sql` (see `db/init-db.sh`).

Stop and remove everything, including the database volume:

```bash
docker compose down -v
```

## Docker setup

- **Frontend image:** multi-stage build. Stage 1 builds the React app with Node; stage 2 serves the static files with Nginx, which also proxies `/api` to the backend.
- **Backend image:** production dependencies only (`npm ci --omit=dev`), runs as the non-root `node` user.
- **Compose:** health checks on Postgres and the backend, so each service starts only when the one it needs is ready.
- **Secrets:** read from a local `.env` file that is ignored by git. `.env.example` files show which values are needed.

## CI/CD

`.github/workflows/docker-build.yml` runs on every push to `main` and on every pull request:

1. Builds the backend and frontend images (with layer caching).
2. Starts the full stack with `docker compose up --wait`.
3. Smoke-tests the backend health check, the frontend and the API through the Nginx proxy.

## Run without Docker

```bash
# Backend
cd backend && cp .env.example .env && npm install && node server.js

# Frontend
cd frontend && cp .env.example .env && npm install && npm run dev
```
