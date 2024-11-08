# Project Management System (PERN Stack)

A modern project management system built using the **PERN** stack (PostgreSQL, Express, React, Node.js) that allows administrators to manage projects, approve demo requests, and monitor analytics, while providing an interactive platform for visitors to explore and request demos for different projects.

---

## Features

### Admin Features:
- **Add and manage projects**: Admins can add detailed information about projects, including features, technical stacks, improvement areas, and more.
- **Project analytics**: View analytics about the number of demo requests and user interaction with the projects.
- **Approve or deny demo requests**: Admins can review demo requests submitted by visitors and approve or deny them, with email notifications sent to the requestor.
- **Project filtering & search**: Projects can be filtered by stack, searched by name, and sorted by the date they were added.
- **Project details view**: Admins can view project details like features, development stack, improvement areas, and more.
  
### Visitor Features:
- **Browse Projects**: Visitors can view a list of projects with details such as title, description, technical stack, etc.
- **Request Demo**: Visitors can choose a project they're interested in and request a demo.
- **Real-time updates**: The status of demo requests is updated in real-time and users receive email notifications about the approval or denial of their requests.

---

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (hosted on Supabase)
- **Authentication**: Microsoft OAuth with Supabase
- **Email Notifications**: Nodemailer (via SMTP)
- **Media Storage**: Cloudinary for storing images and videos

---

## Project Structure

```
/ (Root Directory)
├── frontend/               # Frontend React application
├── backend/                # Backend Express API
├── .env                    # Environment variables (for local setup)
├── package.json            # Root-level dependencies
├── README.md               # Project README
```

---

## Installation

Follow these steps to run the Project Management System locally.

### Prerequisites

- Node.js (v16+ recommended)
- PostgreSQL (or access to a Supabase instance)
- A Cloudinary account for media storage
- A Microsoft account for authentication via Supabase
- Nodemailer setup for sending emails

### 1. Clone the repository

```bash
git clone https://github.com/your-username/project-management-system.git
cd project-management-system
```

### 2. Install Dependencies

Install backend and frontend dependencies separately.

#### Backend Installation

1. Navigate to the `backend` directory:

    ```bash
    cd backend
    ```

2. Install required dependencies:

    ```bash
    npm install
    ```

#### Frontend Installation

1. Navigate to the `frontend` directory:

    ```bash
    cd frontend
    ```

2. Install required dependencies:

    ```bash
    npm install
    ```

### 3. Set Up Environment Variables

Create a `.env` file in both the **frontend** and **backend** directories.

#### Backend `.env` Example

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

#### Frontend `.env` Example

```bash
REACT_APP_API_URL=http://localhost:5000
```

- Replace `<your-supabase-url>`, `<your-cloudinary-cloud-name>`, and other placeholders with the actual values from your accounts.

### 4. Run the Backend

Navigate to the **backend** directory and start the server:

```bash
cd backend
npm run dev
```

This will start the Express server at `http://localhost:5000`.

### 5. Run the Frontend

Navigate to the **frontend** directory and start the React app:

```bash
cd frontend
npm start
```

This will start the React app at `http://localhost:3000`.

---

## Usage

1. Visit `http://localhost:3000` in your browser to view the frontend.
2. Admins should navigate to `/admin` to sign in and access the admin panel.
3. Visitors can browse projects, request demos, and receive email notifications.
4. Admins can manage the status of demo requests (approve/deny), with email notifications being sent to users.

---

## 3rd-Party Services

- **Supabase**: Used for authentication and database management (PostgreSQL).
- **Cloudinary**: Used for storing media files like images and videos.
- **Microsoft OAuth**: Used for admin authentication via Supabase.
- **Nodemailer**: Used for sending email notifications.

---

## Example Project Interface

Below is an example of how a project might look in the system:

```typescript
export interface Project {
    title?: string
    description?: string
    coverphotourl?: string
    technicaldetailsvideo?: string
    linkeddocs?: string
    createdat?: Date
    updatedat?: Date
    projectfeatures?: ProjectFeature[]
    developmentstack?: DevelopmentStack[]
    improvementareas?: ImprovementArea[]
}

interface ProjectFeature {
    featureName?: string
}

interface DevelopmentStack {
    stackName?: string
}

interface ImprovementArea {
    areaName?: string
}

export default Project
```

---

## Screenshots

### Admin Dashboard

![Admin Dashboard](./assets/admin-dashboard.png)

### Projects Page (Visitor View)

![Projects Page](./assets/projects-page.png)

### Project Details

![Project Details](./assets/project-details.png)

---

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## Contact

For any questions, feel free to reach out to [your-email@example.com](mailto:your-email@example.com).
