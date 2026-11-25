# Mini Project: Notes App Backend

A secured, multi-tenant Notes App Backend REST API built with Bun, Express, local MongoDB (`mongodb://127.0.0.1:27017/notes_db`), and JWT Authentication.

## Features
- **User Authentication**: Register & login with bcrypt password hashing and signed JWT bearer tokens.
- **Data Isolation**: Notes are linked to specific users (`user: ObjectId`). Users can only access, modify, or delete their own notes.
- **Full CRUD for Notes**:
  - Create note with title, content, tags, color, and pinned status.
  - Read all notes (with title/content regex keyword search and tag filtering).
  - Read single note by ID (with ownership verification).
  - Update note (with ownership verification).
  - Delete note (with ownership verification).
  - Fetch all unique tags used by the authenticated user (`/api/notes/tags`).
- **Postman Ready**: Pre-built Postman collection for immediate testing (`postman/notes_api.postman_collection.json`).

## Environment Variables
Create a `.env` file in the root of `MiniProject/`:
```env
PORT=5003
MONGO_URI=mongodb://127.0.0.1:27017/notes_db
JWT_SECRET=super_secret_notes_jwt_key_skillnexis_week2
JWT_EXPIRE=7d
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

### Authentication Routes (`/api/auth`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register new user |
| `POST` | `/api/auth/login` | Public | Login user and retrieve JWT |
| `GET` | `/api/auth/me` | Protected | Get current user profile |

### Notes Routes (`/api/notes`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/notes` | Protected | Get notes (`?search=...`, `?tag=...`, `?isPinned=...`) |
| `GET` | `/api/notes/tags` | Protected | Get distinct tags for the authenticated user |
| `GET` | `/api/notes/:id` | Protected | Get single note by ID (owner only) |
| `POST` | `/api/notes` | Protected | Create a new note |
| `PUT` | `/api/notes/:id` | Protected | Update note (owner only) |
| `DELETE` | `/api/notes/:id` | Protected | Delete note (owner only) |

## Testing with Postman
Import `postman/notes_api.postman_collection.json` into Postman. Requests will automatically capture and reuse the `authToken` and `noteId` variables.
