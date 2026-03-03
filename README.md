# BakeWell — v1.0.1

BakeWell is a full-stack blog and subscription platform deployed on AWS.

## Overview

Version 1.0.1 introduces secure admin authentication and dynamic blog content powered by Amazon RDS.

The application includes:

- React (Vite + TypeScript) frontend
- Node.js (Express) REST API
- JWT-based authentication
- bcrypt password hashing
- Amazon RDS (MySQL) database
- Nginx reverse proxy on EC2

## Architecture

User → Nginx (EC2) → React (dist) → /api → Node API → RDS (MySQL)

## Key Features

- Secure admin login
- Protected blog publishing
- Dynamic blog rendering from database
- Contact and subscription storage
- Production-style reverse proxy setup

## Version

**v1.0.1** — First authenticated, database-driven release.
