Restaurant Seat Reservation System

A full-stack restaurant seat booking application with role-based access for Customers and Admins, built using MERN + TypeScript.

This system allows customers to book tables based on availability, while admins can manage reservations and restaurant tables in real time.

---------------------------------------------------------------------------

 Features Overview
 Customer (User)

Register & Login (JWT Authentication)

View available tables by date & time slot

Book single or multiple tables to match guest count

Prevents overlapping bookings

View personal reservations

Cancel own reservations

Real-time table availability updates

---------------------------------------------------------------------------

Admin

Secure admin-only access

View all reservations

Filter reservations by date

Edit reservations (date, time slot, tables, guests)

Cancel or reactivate reservations

Create reservations on behalf of users

Manage restaurant tables:

Add new tables

Edit table number & seating capacity

Delete tables (with validation)

Admin dashboard with statistics

Key Business Logic (Important)

Prevents booking the same table for the same time slot

Ensures selected tables meet or exceed guest count

Maintains reservation history (no hard deletes)

Role-based API protection using middleware

Clean separation of User APIs and Admin APIs

---------------------------------------------------------------------------

Tech Stack
Frontend

React + TypeScript

Vite

Tailwind CSS

Axios

React Router

Backend

Node.js + Express + TypeScript

MongoDB + Mongoose

JWT Authentication

Role-based Middleware

REST APIs

---------------------------------------------------------------------------

📂 Project Structure
mcq-test-engine/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middleware/
│   │   ├── config/
│   │   ├── app.ts
│   │   └── server.ts
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/
│   │   ├── auth/
│   │   └── App.tsx
│
└── README.md

---------------------------------------------------------------------------
🔐 Authentication & Roles

JWT tokens stored in localStorage

Two roles:

USER

ADMIN

Middleware ensures:

Only admins access admin APIs

Users can only access their own data

---------------------------------------------------------------------------

📊 Database Models
User

email

password (hashed)

role

Table

tableNumber

capacity

Reservation

userId

tableIds (multiple tables allowed)

date

timeSlot

guests

status (ACTIVE / CANCELLED)

---------------------------------------------------------------------------

Validation & Safety

Duplicate table numbers prevented

Invalid capacities rejected

Cannot book already reserved tables

Admin cannot edit cancelled reservations

Safe status toggling instead of deleting records

---------------------------------------------------------------------------
Environment Variables

Create a .env file in backend/:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@example.com

---------------------------------------------------------------------------

 Running the Project
Backend
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
npm run dev