
# Backend — Developer Directory API

## Quick start
1. Copy `.env.example` to `.env` and fill values.
2. `npm install`
3. `npm run dev`

## Endpoints
- POST /api/auth/signup
- POST /api/auth/login
- GET /api/auth/me
- GET /api/developers
- POST /api/developers
- GET /api/developers/:id
- PUT /api/developers/:id
- DELETE /api/developers/:id

Protected routes require Authorization: Bearer <token> header.
