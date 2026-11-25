# Assignment 1: To-Do List REST API

RESTful API for managing tasks and to-do items using Bun, Express, and local MongoDB (`mongodb://127.0.0.1:27017/todo_db`).

## Features
- Full CRUD operations for tasks (create, read all/one, update, delete).
- Filter tasks by status (`?completed=true|false`) and priority (`?priority=low|medium|high`).
- Input validation and centralized error handling (handles invalid ObjectIDs and validation failures cleanly).
- Postman Collection ready for testing (`postman/todo_api.postman_collection.json`).

## Environment Variables
Create a `.env` file in the root of `Assignment1/`:
```env
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/todo_db
```

## Installation & Running with Bun

```bash
# Install dependencies
bun install

# Start production server
bun start

# Or start development server with bun hot-reload
bun run dev
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | API Health Check |
| `GET` | `/api/tasks` | Get all tasks (supports `?completed=true` & `?priority=high`) |
| `GET` | `/api/tasks/:id` | Get single task by ID |
| `POST` | `/api/tasks` | Create a new task |
| `PUT` | `/api/tasks/:id` | Update a task |
| `DELETE` | `/api/tasks/:id` | Delete a task |

## Testing with Postman
Import the file `postman/todo_api.postman_collection.json` into Postman. The collection has pre-configured requests and dynamic variable setting for `taskId`.
