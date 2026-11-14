# Course Registration System

A simple full-stack Course Registration System built with React, Spring Boot, Spring Data JPA, and an H2 database.

## Requirements
- Java 17 or later
- Maven 3.8+ (or use an IDE with Maven support)
- Node.js 18+ and npm

## Project structure
```text
course-registration-system/
├── backend/    # Spring Boot REST API
└── frontend/   # React + Vite UI
```

## 1. Start the backend
Open a terminal:

```bash
cd backend
mvn spring-boot:run
```

The API starts at `http://localhost:8080`. H2 stores data in `backend/data/courses.mv.db`, so records persist across restarts.

H2 console (optional): `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:file:./data/courses`
- User: `sa`
- Password: leave blank

## 2. Start the frontend
In a second terminal, from the project root:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## REST API
Base URL: `http://localhost:8080/api`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/courses` | List courses |
| POST | `/courses` | Add a course (`{"name":"Java","duration":"8 weeks"}`) |
| GET | `/registrations` | List registrations, including course |
| POST | `/registrations` | Register (`{"studentName":"Asha","email":"asha@example.com","courseId":1}`) |
| DELETE | `/registrations/{id}` | Cancel a registration |

### Example requests
Add a course:
```bash
curl -X POST http://localhost:8080/api/courses \
  -H 'Content-Type: application/json' \
  -d '{"name":"Java Basics","duration":"6 weeks"}'
```

Register a student (replace `courseId` with an ID returned by `/api/courses`):
```bash
curl -X POST http://localhost:8080/api/registrations \
  -H 'Content-Type: application/json' \
  -d '{"studentName":"Asha","email":"asha@example.com","courseId":1}'
```

## Validation and errors
- Course name and duration are required.
- Student name, email, and course are required.
- Email must use a basic valid format.
- Invalid input returns HTTP `400` with a readable JSON `message`.
- A registration for a missing course returns HTTP `404`.
- Cancelling a missing registration returns HTTP `404`.

## Testing
With the backend running, try:
```bash
curl http://localhost:8080/api/courses
curl http://localhost:8080/api/registrations
```
You can also add a course and register a student using the example requests above, then refresh the frontend to confirm records remain available.

For a backend compile check:
```bash
cd backend
mvn test
```
