# Project Management System - Frontend

This is the **frontend** part of the Project Management System built using **React.js**. It allows users to browse projects, request demos, and interact with the system. Admins can access the admin panel to manage project details and approve or deny demo requests.

---

## Features

- **Browse Projects**: Visitors can view a list of available projects along with their details.
- **Filter and Search**: Projects can be filtered by stack or searched by name.
- **Request Demo**: Visitors can request a demo for projects they are interested in.
- **Project Sorting**: Projects can be sorted by the date they were added (latest to oldest).
- **Real-Time Status Updates**: Demo request status is updated in real-time, with email notifications sent to the requestor when their request is approved or denied.

---

## Tech Stack

- **React.js**: Frontend framework for building the user interface.
- **Axios**: HTTP client for making API requests to the backend.
- **React Router**: Used for routing between pages (e.g., home page, project details, admin login).
- **React Context / State Management**: For managing application state (e.g., user authentication, project data).
- **CSS/SCSS**: For styling the components.
- **Font Awesome**: For icons (e.g., filter icons, search icons).

---

## Installation

### Prerequisites

- **Node.js**: Make sure you have Node.js installed on your local machine. You can check by running:

    ```bash
    node -v
    ```

- **npm**: The Node.js package manager is used to install dependencies. It comes bundled with Node.js.

    ```bash
    npm -v
    ```

### Steps to Set Up the Frontend Locally

1. **Clone the repository**

    First, clone the repository from GitHub:

    ```bash
    git clone https://github.com/your-username/project-management-system.git
    cd project-management-system
    ```

2. **Navigate to the frontend directory**

    Go to the `frontend` directory:

    ```bash
    cd frontend
    ```

3. **Install dependencies**

    Install all the necessary packages for the project:

    ```bash
    npm install
    ```

4. **Configure environment variables**

    Create a `.env` file in the root of the `frontend` directory to configure the API URL for the backend. Example:

    ```bash
    REACT_APP_API_URL=http://localhost:5000
    ```

    - Replace `http://localhost:5000` with the actual URL of your backend API if it's hosted elsewhere.

5. **Run the application locally**

    After installing the dependencies and setting up the environment, start the development server:

    ```bash
    npm start
    ```

    The application will be accessible at `http://localhost:3000`.

---

## Folder Structure

Here is an overview of the main files and directories in the frontend project:

```
frontend/
├── public/                  # Static assets (index.html, icons, etc.)
├── src/                     # Source code for React application
│   ├── assets/              # Images, icons, and other static files
│   ├── components/          # Reusable React components (e.g., Navbar, ProjectCard)
│   ├── context/             # React context for managing global state
│   ├── pages/               # React components for pages (e.g., Home, Admin)
│   ├── services/            # API service files for interacting with the backend
│   ├── App.js               # Main App component
│   ├── index.js             # Entry point for React app
│   └── styles/              # CSS / SCSS files for styling
├── .env                     # Environment variables (API URL)
├── package.json             # Project metadata and dependencies
└── README.md                # This README file
```

---

## How to Use

### 1. Homepage

The homepage displays a list of available projects. You can filter projects by their technical stack or search for projects by name. Each project is listed with its title, description, and a button to request a demo.

### 2. Project Details

When a visitor clicks on a project, they are taken to a detailed page that includes:
- Project features
- Development stack
- Improvement areas
- A button to request a demo

### 3. Requesting a Demo

To request a demo:
- Select a project you are interested in.
- Click the "Request Demo" button.
- Fill in your details (if prompted).
- The request status will be updated once the admin approves or denies the request.

### 4. Admin Panel

Admins can access the admin panel by navigating to `/admin`. This section requires authentication via Microsoft OAuth through Supabase. Admins can:
- View project analytics.
- Approve or deny demo requests.
- Edit project details.

---

## Additional Notes

- **Authentication**: Admins are authenticated using **Microsoft OAuth** via Supabase. Make sure the backend is correctly configured to handle authentication and session management.
- **Media Files**: Project images and videos are stored on **Cloudinary**. Ensure Cloudinary API keys are correctly configured on the backend.

---

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## Contact

For any questions or issues, feel free to reach out to [your-email@example.com](mailto:your-email@example.com).