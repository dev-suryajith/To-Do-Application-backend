# To-Do Application – Backend

A RESTful backend API for a full-stack To-Do application.  
This server handles user authentication and task management using JWT-based authorization.

---

## 🚀 Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcrypt

---

## ✨ Features
- User registration with secure password hashing
- User login with JWT authentication
- Protected routes using middleware
- Task CRUD operations
- Tasks are user-specific and securely isolated
- Clean and scalable API structure

---

## 🔐 Authentication Flow
1. User registers with email and password
2. Password is hashed using bcrypt before storing
3. User logs in and receives a JWT
4. JWT is sent in the `Authorization` header
5. Middleware validates the token for protected routes

---

## 📂 Folder Structure
src/

├── controllers/

│ ├── userController.js

│ ├── taskController.js

├── models/

│ ├── userSchema.js

│ ├── taskSchema.js

├── middlewares/

│ └── jwtMiddleware.js

├── routes/

│ ├── userRoutes.js

│ ├── taskRoutes.js

├── db.js

└── index.js


---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/dev-suryajith/To-Do-Application-backend.git
```

### 2. Install Dependancy
```bash
npm install
```

### 3. Environment Variables

Create a .env file in the root directory and add:

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Start the server
```bash
nodemon index.js
```

---

📌 API Endpoints

Authentication

* POST /register – Register a new user
* POST /login – Login user and return JWT

Tasks (Protected Routes)

* POST /tasks – Create a new task
* GET /tasks – Get all tasks for logged-in user
* PUT /tasks/:id – Update a task
* DELETE /tasks/:id – Delete a task

🔒 Security Notes

Passwords are hashed using bcrypt
JWT ensures secure API access
Users can only access their own tasks

---
