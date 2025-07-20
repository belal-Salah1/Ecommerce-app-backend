# 🛠️ E-commerce Backend Project

A scalable and secure backend for my e-commerce application built with **Node.js**, **Express**, and **MongoDB**.

---

## 🔐 Authentication & Authorization

- **JWT-based Authentication**  
  Secure login & registration system using **access tokens**.

- **Password Hashing & Confirmation**  
  Implemented using `crypto-js` to enhance security and prevent leaks.

- **Role-based Access Control**  
  Admin/manager/user permissions handled via custom middleware:
  - `verifyToken`
  - `allowedTo(...roles)`

---

## ⚙️ CRUD Operations

Fully implemented CRUD functionality for core resources:

- 📁 Categories  
- 📦 Products  
- 👤 Users  
- 📦 Orders *(if implemented)*  

> Built using a **controller-service** pattern for cleaner, maintainable architecture.

---

## 🧩 Custom Middleware

- `asyncWrapper`:  
  Wraps async route handlers to catch errors without try/catch blocks.

- `verifyToken`:  
  Verifies JWT tokens and attaches user data to the request.

- `allowedTo(...roles)`:  
  Protects routes based on user roles (e.g., `admin`, `manager`, `user`).

---

## 📦 Features

- User registration & login  
- JWT token-based authentication  
- Password hashing with `crypto-js`  
- Role-based route protection  
- RESTful API with full CRUD support  
- Modular controller-service architecture  
- Centralized error handling  
- Reusable middleware functions  





