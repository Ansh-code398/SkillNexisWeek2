# Week 2: Backend Development (Node.js, Express & MongoDB with Bun)

This repository contains the assignments and mini project for Week 2 of the SkillNexis curriculum, built with Bun and connected to a local MongoDB instance.

## Directory Structure
- [Assignment1/](file:///Volumes/Development/Internships/SkillNexis/Week2/Assignment1)
  - **To-Do List REST API**
  - Full CRUD operations for managing tasks with Express and local MongoDB (`mongodb://127.0.0.1:27017/todo_db`).
  - Filter by completion status (`?completed=true`) and priority (`?priority=high`).
  - Postman collection included (`postman/todo_api.postman_collection.json`).
- [Assignment2/](file:///Volumes/Development/Internships/SkillNexis/Week2/Assignment2)
  - **User Authentication API**
  - Registration and login routes with password hashing via `bcryptjs` and token-based authentication with `jsonwebtoken`.
  - JWT-protected `/profile` route and auth middleware.
  - Postman collection included (`postman/auth_api.postman_collection.json`).
- [MiniProject/](file:///Volumes/Development/Internships/SkillNexis/Week2/MiniProject)
  - **Notes App Backend**
  - Multi-tenant REST API for notes taking with complete CRUD operations.
  - Secured routes with JWT authentication and strict user ownership isolation.
  - Keyword search, tag filtering, pinned notes prioritization, and distinct tags endpoint.
  - Postman collection included (`postman/notes_api.postman_collection.json`).

## Database Configuration
All applications connect to the local MongoDB server:
- Assignment 1: `mongodb://127.0.0.1:27017/todo_db`
- Assignment 2: `mongodb://127.0.0.1:27017/auth_db`
- Mini Project: `mongodb://127.0.0.1:27017/notes_db`

## Quick Start (with Bun)

### Assignment 1
```bash
cd Assignment1
bun install
bun run dev # runs on http://localhost:5001 with hot reload
```

### Assignment 2
```bash
cd Assignment2
bun install
bun run dev # runs on http://localhost:5002 with hot reload
```

### Mini Project
```bash
cd MiniProject
bun install
bun run dev # runs on http://localhost:5003 with hot reload
```
