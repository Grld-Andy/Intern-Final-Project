# Project Management System - Backend

This is the **backend** part of the Project Management System built using **Node.js** and **Express.js**. It handles user authentication, project management, demo request management, and integrates with third-party services like Supabase, Cloudinary, and Nodemailer.

---

## Features

- **Authentication**: Users (admins) can log in via Microsoft OAuth using Supabase.
- **Project Management**: Admins can add, update, delete, and view project details.
- **Demo Requests**: Visitors can request demos for specific projects. Admins can approve or deny these requests.
- **Email Notifications**: Users receive email notifications about the approval/denial of their demo requests.
- **Swagger Documentation**: The API endpoints are documented and accessible via Swagger UI.
- **Media Storage**: Project images and videos are stored on Cloudinary.

---

## Tech Stack

- **Node.js**: Backend runtime.
- **Express.js**: Web framework for building the API.
- **Supabase**: Used for user authentication and PostgreSQL database management.
- **Cloudinary**: For storing media files (images, videos).
- **Nodemailer**: For sending email notifications.
- **Swagger UI**: For API documentation.

---

## Installation

### Prerequisites

- **Node.js**: Ensure Node.js is installed on your machine. You can verify by running:

    ```bash
    node -v
    ```

- **PostgreSQL**: The database is hosted on Supabase, but you can also run a local PostgreSQL instance if needed.
  
- **Supabase Account**: For authentication and database setup.
  
- **Cloudinary Account**: For storing images and videos.

- **SMTP Server**: For sending emails via **Nodemailer**.

### Setup and Installation

1. **Clone the repository**

    Clone the backend repository from GitHub:

    ```bash
    git clone https://github.com/your-username/project-management-system.git
    cd project-management-system
    ```

2. **Navigate to the backend directory**

    Change to the backend directory:

    ```bash
    cd backend
    ```

3. **Install dependencies**

    Install all the required Node.js packages:

    ```bash
    npm install
    ```

4. **Install `nodemon` globally** (for auto-restarting the server during development):

    ```bash
    npm install -g nodemon
    ```

5. **Configure environment variables**

    Create a `.env` file in the backend root directory with the following variables:

    ```bash
    SUPABASE_URL=<your-supabase-url>
    SUPABASE_ANON_KEY=<your-supabase-anon-key>
    SUPABASE_SERVICE_ROLE_KEY=<your-supabase-service-role-key>
    MICROSOFT_CLIENT_ID=<your-microsoft-client-id>
    MICROSOFT_CLIENT_SECRET=<your-microsoft-client-secret>
    CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
    CLOUDINARY_API_KEY=<your-cloudinary-api-key>
    CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
    SMTP_HOST=<your-smtp-host>
    SMTP_PORT=<your-smtp-port>
    SMTP_USER=<your-smtp-user>
    SMTP_PASS=<your-smtp-password>
    ```

    - Replace placeholders with your actual credentials for Supabase, Cloudinary, and SMTP.

6. **Start the backend server**

    After configuring the environment variables, start the server using `npm start`:

    ```bash
    npm start
    ```

    Alternatively, you can use `nodemon` for automatic server restarts during development:

    ```bash
    nodemon
    ```

    The server will be accessible at `http://localhost:5000`.

---

## API Documentation

The backend API is fully documented with **Swagger UI**. You can view the API documentation by navigating to:

```
http://localhost:5000/api-docs
```

For remote API documentation, you can use the following link:

- **Remote API Documentation**: [https://intern-final-project.onrender.com/api-docs](https://intern-final-project.onrender.com/api-docs)

This will provide detailed information about each endpoint, including the request/response format, query parameters, and authentication requirements.

---

## API Routes

### Authentication

- **POST** `/auth/login`: Logs in an admin using Microsoft OAuth via Supabase.
  
### Projects

- **GET** `/projects`: Retrieve a list of all projects (with optional filters).
- **POST** `/projects`: Create a new project (admin only).
- **GET** `/projects/:id`: View details of a specific project.
- **PUT** `/projects/:id`: Update an existing project (admin only).
- **DELETE** `/projects/:id`: Delete a project (admin only).

### Demo Requests

- **GET** `/requests`: Get a list of all demo requests.
- **POST** `/requests`: Create a new demo request (visitor).
- **PUT** `/requests/:id`: Update the status of a demo request (admin).
- **GET** `/requests/:id`: View a specific demo request.

### Admin Analytics

- **GET** `/admin/analytics`: View analytics for the admin, including the number of demo requests and project interactions.

---

## Folder Structure

The backend folder structure is organized as follows:

```
backend/
├── controllers/             # Business logic for handling API requests
│   ├── authController.js    # Authentication logic
│   ├── projectController.js # Project management logic
│   ├── requestController.js # Demo request management logic
│   └── analyticsController.js # Admin analytics
├── models/                  # Database models (using Supabase/PostgreSQL)
│   ├── projectModel.js      # Project model
│   ├── requestModel.js      # Demo request model
│   └── userModel.js         # User model (Supabase)
├── routes/                  # API route definitions
│   ├── authRoutes.js        # Authentication routes
│   ├── projectRoutes.js     # Project routes
│   ├── requestRoutes.js     # Demo request routes
│   └── analyticsRoutes.js   # Admin analytics routes
├── services/                # External services (e.g., Cloudinary, Nodemailer)
│   ├── cloudinaryService.js # Cloudinary file upload logic
│   └── emailService.js      # Email sending logic via Nodemailer
├── .env                     # Environment variables (API keys, etc.)
├── app.js                   # Express app initialization
├── swagger.json             # Swagger API documentation configuration
├── package.json             # Project dependencies and metadata
└── README.md                # This README file
```

---

## Swagger Documentation

The **Swagger UI** documentation is available at:

```
http://localhost:5000/api-docs
```

For remote API documentation, you can use the following link:

- **Remote API Documentation**: [https://intern-final-project.onrender.com/api-docs](https://intern-final-project.onrender.com/api-docs)

This interactive documentation allows you to explore all available API endpoints, test them directly, and see detailed information about the request/response structure.

---

## Email Notifications

Emails are sent via **Nodemailer** when a demo request is either approved or denied. To configure email notifications, make sure you have the SMTP settings added to the `.env` file:

- **SMTP_HOST**: The SMTP server for sending emails (e.g., Gmail, SendGrid, etc.).
- **SMTP_PORT**: The SMTP port (usually 587 for TLS).
- **SMTP_USER**: The SMTP user (email address).
- **SMTP_PASS**: The SMTP password or API key.

---

## Running Tests

To run tests for the backend, you can use a testing framework like **Jest** or **Mocha** (if set up in the project). For example, if Jest is used:

```bash
npm test
```

---

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## Contact

For any questions or issues related to the backend, feel free to reach out to [your-email@example.com](mailto:your-email@example.com).
