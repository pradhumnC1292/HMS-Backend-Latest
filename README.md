# Hospital Management System Backend

This is the backend service for the Hospital Management System, built with Node.js, Express, and MongoDB. It provides RESTful APIs for managing patients, doctors, appointments, and messages.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Data Models](#data-models)
- [Middleware](#middleware)
- [Additional Features](#additional-features)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/YourUsername/Hospital-Management-System-Backend.git
   cd Hospital-Management-System-Backend
2. Install dependencies:
   npm install
3. Set up environment variables. Create a .env file in the root directory and add the following variables:

PORT=5000

FRONTEND_URL=http://localhost:3000

DASHBOARD_URL=http://localhost:3001

MONGODB_URI=mongodb://localhost:27017/employeeDB

JWT_SECRET_KEY=your_jwt_secret_key

JWT_EXPIRES=7d

COOKIE_EXPIRES=7

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name

CLOUDINARY_API_KEY=your_cloudinary_api_key

CLOUDINARY_API_SECRET=your_cloudinary_api_secret


4. Start the Server
   npm start
   The server will run on http://localhost:5000.

6. API Endpoints
 ## User Management
### Register a Patient
`POST /api/v1/user/patient/register`

Request body:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "national_identity_card_number": "1234567890123",
  "dob": "1990-01-01",
  "gender": "Male",
  "password": "password",
  "role": "Patient"
}
```
## Login 

POST /api/v1/user/login

```json
{
  "email": "john@example.com",
  "password": "password",
  "confirmPassword": "password",
  "role": "Patient"
}
```

## Register an Admin

POST /api/v1/user/admin/register
```json
{
  "firstName": "Admin",
  "lastName": "User",
  "email": "admin@example.com",
  "phone": "1234567890",
  "national_identity_card_number": "1234567890123",
  "dob": "1980-01-01",
  "gender": "Female",
  "password": "adminpassword"
}

```

## Register a Doctor

POST /api/v1/user/doctor/register

```json
{
  "firstName": "Doctor",
  "lastName": "Strange",
  "email": "doctor@example.com",
  "phone": "1234567890",
  "national_identity_card_number": "1234567890123",
  "dob": "1975-01-01",
  "gender": "Male",
  "password": "doctorpassword",
  "doctorDepartment": "Cardiology"
}

```
## Get All Doctors

GET /api/v1/user/doctors

## Get User Details

GET /api/v1/user/admin/me

GET /api/v1/user/patient/me
 
# Appointments

## Make an Appointment

POST /api/v1/appointment/post

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "national_identity_card_number": "1234567890123",
  "dob": "1990-01-01",
  "gender": "Male",
  "appointment_date": "2023-07-12",
  "department": "Cardiology",
  "doctor_firstName": "Doctor",
  "doctor_lastName": "Strange",
  "hasVisited": false,
  "address": "123 Main St"
}

```
## Get All Appointments

GET /api/v1/appointment/getall

## Update Appointment Status

PUT /api/v1/appointment/update/:id

## Delete Appointment

DELETE /api/v1/appointment/delete/:id

# Messages

## Send a Message
POST /api/v1/message/send
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "message": "Hello, I need assistance."
}

```

## Get All Messages

GET /api/v1/message/getallmessages


# Data Models

## User Schema
`
firstName: String (required)
lastName: String (required)
email: String (required, unique)
phone: String (required)
national_identity_card_number: String (required)
dob: Date (required)
gender: String (required, enum: ["Male", "Female"])
password: String (required, select: false)
role: String (required, enum: ["Patient", "Doctor", "Admin"])
doctorDepartment: String (required if role is "Doctor")
docAvatar: { public_id: String, url: String } (required if role is "Doctor")
`









   
