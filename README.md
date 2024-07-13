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

PORT: Port on which the server will run.
FRONTEND_URL: URL of the frontend application.
DASHBOARD_URL: URL of the dashboard application.
MONGODB_URI: MongoDB connection string.
JWT_SECRET_KEY: Secret key for JWT.
JWT_EXPIRES: JWT expiration time.
COOKIE_EXPIRES: Cookie expiration time in days.
CLOUDINARY_CLOUD_NAME: Cloudinary cloud name for image uploads.
CLOUDINARY_API_KEY: Cloudinary API key.
CLOUDINARY_API_SECRET: Cloudinary API secret.

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




   
