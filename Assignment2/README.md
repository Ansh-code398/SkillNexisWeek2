# Assignment 2: User Authentication API

User registration and authentication REST API built with Bun, Express, MongoDB (`mongodb://127.0.0.1:27017/auth_db`), bcryptjs password encryption, and JWT token authentication.

## Features
- User registration with password hashing using `bcryptjs` (salt rounds: 10).
- User login with password verification and JWT token issuing.
- JWT Protected Routes (`/api/auth/me` and `/api/auth/profile`) using custom Bearer token middleware.
- Input validation (valid email format, min password length, duplicate email prevention).
- Postman Collection ready for testing (`postman/auth_api.postman_collection.json`).

## Environment Variables
Create a `.env` file in the root of `Assignment2/`:
```env
PORT=5002
MONGO_URI=mongodb://127.0.0.1:27017/auth_db
JWT_SECRET=super_secret_jwt_key_skillnexis_week2
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

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/` | Public | Health check |
| `POST` | `/api/auth/register` | Public | Register new user (returns JWT & user payload) |
| `POST` | `/api/auth/login` | Public | Login user (returns JWT & user payload) |
| `GET` | `/api/auth/profile` | Protected (JWT) | Get currently logged in user profile |

## Testing with Postman
Import `postman/auth_api.postman_collection.json` into Postman. Registering or logging in will automatically capture and set the `authToken` collection variable for protected route requests.
