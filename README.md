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
`{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "national_identity_card_number": "1234567890123",
  "dob": "1990-01-01",
  "gender": "Male",
  "password": "password",
  "role": "Patient"
}`




   
