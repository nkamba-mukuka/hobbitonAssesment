# Full-Stack Digital Wallet - Technical Assessment

## Tech Stack

- **Frontend**: React or Angular with TypeScript
- **Backend**: golan
- **Database**: Any relational database

---

## Task

Create a **digital wallet application** where users can:

1. Register and log in.
2. View their wallet balance.
3. Send money to other users.
4. View their transaction history.

---

## Technical Requirements

### Frontend

- Use **TypeScript**.
- Implement **form validation** for user inputs.
- Show **real-time balance updates** after transactions.
- Display a list of **transaction history**.
- Handle **loading and error states** gracefully.

### Backend

- Build a **RESTful API** using golan
- Implement **basic authentication** for user login.
- Use **database transactions** to ensure data consistency.
- Return **proper HTTP status codes** for API responses.

### Database

- Design a **relational schema** for users, wallets, and transactions.
- Ensure **data consistency** (e.g., prevent negative balances, handle concurrent transactions).

---

## Evaluation Criteria

1. **Code Quality (40%)**:
   - Clean, readable, and maintainable code.
   - Proper use of OOP principles.
2. **UI/UX Design (30%)**:
   - Intuitive and responsive user interface.
   - Good user experience (e.g., real-time updates, error handling).
3. **API Design (30%)**:
   - Well-defined RESTful endpoints.
   - Proper use of HTTP methods and status codes.

---

## Submission

- **Source code (GITHUB LINK)** send an email to tech@hobbiton.co.zm for both frontend and backend.
- **Setup instructions** to run the application locally.

---

## Time Limit

- **1 week** to complete the assignment.

---

## Notes

- Keep the implementation **simple** and focused on core features.
- Prioritize **code quality** over adding unnecessary features.
- Document your **database choice** and design decisions.

---

This assignment tests your ability to build a **full-stack application** while focusing on **code quality, API design, database consistency, and user experience**. Good luck!

# Hobbiton Wallet Backend

This is the backend service for the Hobbiton Digital Wallet application. It provides REST APIs for user authentication and transaction management.

## Technologies Used

- Go 1.21+
- PostgreSQL
- GORM (ORM)
- JWT for authentication
- Gorilla Mux for routing

## Project Structure

```
.
├── cmd/
│   └── api/            # Application entrypoint
├── internal/
│   ├── models/         # Data models
│   ├── handlers/       # HTTP handlers
│   ├── middleware/     # HTTP middleware
│   └── database/
│       └── migrations/ # Database migrations
├── config/            # Configuration files
└── .env.example       # Environment variables template
```

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/hobbiton-wallet-backend.git
   cd hobbiton-wallet-backend
   ```

2. Install dependencies:

   ```bash
   go mod download
   ```

3. Create and configure the environment variables:

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Set up the database:

   ```bash
   # Create the database
   createdb hobbiton_wallet

   # Run migrations (requires golang-migrate)
   migrate -database "${DATABASE_URL}" -path internal/database/migrations up
   ```

5. Run the server:
   ```bash
   go run cmd/api/main.go
   ```

## API Endpoints

### Public Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Protected Endpoints (Requires JWT Token)

- `GET /api/transactions` - Get user's transactions and balance
- `POST /api/transactions` - Create a new transaction

## Authentication

The API uses JWT for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-token>
```

## Development

1. Make sure you have Go 1.21+ installed
2. Install PostgreSQL and create a database
3. Install golang-migrate for database migrations
4. Copy .env.example to .env and update the values
5. Run the server in development mode:
   ```bash
   go run cmd/api/main.go
   ```

## Frontend Integration

This backend is designed to work with the Hobbiton Wallet frontend. The CORS middleware is configured to allow requests from any origin in development. For production, update the CORS configuration in `main.go`.
