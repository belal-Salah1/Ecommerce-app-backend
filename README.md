🛠️ E-commerce Backend API
A scalable and secure backend for an e-commerce application built with Node.js, Express, and MongoDB.

🔐 Authentication & Authorization
JWT-based authentication: Secure login & registration system using access tokens.

Password hashing & confirmation: Implemented using crypto-js for enhanced security.

Role-based authorization: Admin/user permissions handled via middleware.

⚙️ CRUD Operations
Full Create, Read, Update, Delete support for core resources like:

Categories

Products

Users

Orders (if implemented)

Built using controller-service architecture for clean and maintainable code.

🧩 Custom Middleware
asyncWrapper: Handles errors in async route handlers without try-catch blocks.

verifyToken: Verifies JWT tokens for protected routes.

allowedTo(...roles): Role-based access control middleware that restricts route access to specific user roles (e.g., admin, manager, user).

📦 Features
User registration and login

Token-based authentication using JWT

Password hashing and matching with crypto-js

Role-based route protection

RESTful API with full CRUD operations

Modular controller-service structure

Centralized error handling

Reusable middleware functions

