# Task Management & Team Assignment - Week 5

A full-stack Task Management and Team Assignment system developed as part of the AVENRIX Technologies Full Stack Web Development Internship.

## Project Overview

This project extends the Project Management functionality by allowing users to create, assign, manage, and track tasks associated with existing projects.

The system provides:

- Task creation and management
- Project-based task association
- Employee assignment
- Task priority management
- Task status tracking
- Search and filtering
- Role-based access control
- JWT authentication
- React frontend integrated with Node.js/Express backend
- MongoDB Atlas database

---

## Technologies Used

### Frontend

- React.js
- Vite
- Tailwind CSS
- JavaScript

### Backend

- Node.js
- Express.js
- Mongoose
- MongoDB Atlas
- JWT Authentication
- bcrypt
- CORS
- dotenv

### Development & Testing

- Visual Studio Code
- Git
- GitHub
- Postman

---

## Task Features

The Task Management module supports the following fields:

| Field | Description |
|---|---|
| Title | Name of the task |
| Description | Details about the task |
| Project | Existing project associated with the task |
| Assigned Employee | Employee responsible for the task |
| Priority | Low, Medium, or High |
| Due Date | Deadline of the task |
| Status | To Do, In Progress, Review, or Completed |

---


## Project Structure

```text
week5/
│
├── backend/
│   ├── middleware/
│   │   └── auth.js
│   │
│   ├── models/
│   │   ├── Client.js
│   │   ├── Project.js
│   │   ├── Task.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   ├── clients.js
│   │   ├── projects.js
│   │   └── tasks.js
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── TaskDetails.jsx
│   │   │   ├── TaskFilters.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   └── TaskList.jsx
│   │   │
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
└── README.md

## Main Features

### 1. Task Creation

Users can create a task by providing:

- Task title
- Description
- Project
- Assigned employee
- Priority
- Due date
- Status

Each task is associated with an existing project.

### 2. Task Assignment

Tasks can be assigned to registered employees.

Only users with the `Employee` role can be selected as assigned employees.

### 3. Task CRUD Operations

The system supports:

- Create task
- View all tasks
- View individual task
- Update task
- Delete task

### 4. Priority Management

Tasks support three priority levels:

- Low
- Medium
- High

### 5. Status Management

Tasks support four statuses:

- To Do
- In Progress
- Review
- Completed

### 6. Search and Filtering

Tasks can be searched and filtered by:

- Task title
- Project
- Employee
- Priority
- Status

Multiple filters can also be combined.

### 7. Role-Based Permissions

The application uses role-based access control.

- Admin users can delete tasks.
- Employees cannot delete tasks.
- Task routes are protected using JWT authentication.

### 8. Dashboard Summary

The frontend displays task summary cards for:

- Total Tasks
- To Do
- In Progress
- Review
- Completed

---

### Frontend Components

The frontend is divided into reusable React components.

## TaskForm.jsx

Handles:

- Creating tasks
- Editing tasks
- Project selection
- Employee selection
- Priority selection
- Status selection
- Due date

## TaskFilters.jsx

Handles:

- Task search
- Project filtering
- Employee filtering
- Priority filtering
- Status filtering

## TaskList.jsx

Displays the list of available tasks.

## TaskDetails.jsx

Displays individual task information including:

- Task title
- Description
- Project
- Assigned employee
- Priority
- Status
- Due date
- Edit button
- Delete button

## Project API Endpoints

The Task Management module integrates with the existing Project Management APIs to associate tasks with projects.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/projects` | Create a project |
| GET | `/api/projects` | Get all projects |
| GET | `/api/projects/:id` | Get project details |
| GET | `/api/projects?search=amazon` | Search projects |
| GET | `/api/projects?status=Completed` | Filter projects by status |
| GET | `/api/projects?client=CLIENT_ID` | Filter projects by client |
| PUT | `/api/projects/:id` | Update a project |
| DELETE | `/api/projects/:id` | Delete a project |

## Conclusion

The Week 5 Task Management and Team Assignment module provides a complete solution for creating, assigning, managing, and tracking project tasks. It integrates with the existing authentication and Project Management modules and provides features such as CRUD operations, employee assignment, priorities, statuses, search, and filtering. The React frontend and Node.js/Express backend work together with MongoDB Atlas to provide a functional and organized task management system