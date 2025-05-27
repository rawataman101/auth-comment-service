# Auth & Comment Permission Service

A Node.js backend service that handles:
- JWT-based authentication (access + refresh)
- Role-based comment permissions (`read`, `write`, `delete`)
- Secure password handling
- Session and token management

---

## Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT for Auth
- Postman & Curl for testing

---

## Setup Instructions

Signup
```bash
git clone https://github.com/<your-username>/auth-comment-service.git
cd auth-comment-service
npm install

## Curl commands
```bash
curl -X POST http://localhost:5000/api/auth/signup \
-H "Content-Type: application/json" \
-d '{
  "name": "Aman",
  "email": "aman@gmail.com",
  "password": "amna123"
}'
```
Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "alice@example.com",
  "password": "password123"
}'
```

