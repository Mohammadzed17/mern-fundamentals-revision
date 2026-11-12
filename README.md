# Full Stack Fundamentals Revision

A hands-on full-stack development revision project built using the MERN stack (MongoDB, Express.js, React, and Node.js).

This project was created to refresh and strengthen previously learned full-stack development fundamentals through practical implementation. It covers frontend development, backend API development, database operations, and communication between React and Express.

## About the Project

The project is a simple Study Task Manager that allows users to organize and manage their study-related tasks.

It was developed as a practical revision exercise to bring together concepts learned across the full-stack development journey.

## Features

- Create new study tasks.
- View all available tasks.
- View individual task details.
- Update existing tasks.
- Delete tasks.
- Search tasks by title.
- Set task priorities (Low, Medium, High).
- Manage task status (Pending or Completed).
- Set task due dates.

## Tech Stack

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3
- React Router
- Fetch API

### Backend
- Node.js
- Express.js
- REST APIs

### Database
- MongoDB
- Mongoose

## Key Concepts Practiced

- HTML, CSS, and JavaScript fundamentals.
- React components and props.
- React Hooks (`useState`, `useEffect`).
- Conditional rendering.
- Controlled forms and event handling.
- React Router and dynamic routing.
- REST API development.
- HTTP methods and status codes.
- Express middleware and routing.
- CRUD operations.
- MongoDB schemas and Mongoose models.
- Asynchronous JavaScript (`async/await`).
- Frontend and backend integration using Fetch API.
- Environment variables and Git basics.

## Project Structure

```text
fullstack-fundamentals-revision/
│
├── client/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── server/
│   ├── index.js
│   ├── .env.example
│   └── ...
│
├── Models/
│   └── tasks.js
│
├── init.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Mohammadzed17/fullstack-fundamentals-revision.git
```

### 2. Install dependencies

Install backend dependencies:

```bash
npm install
```

Install frontend dependencies:

```bash
cd client
npm install
```

### 3. Configure environment variables

Create a `.env` file in the appropriate server directory using `.env.example` as a reference.

Example:

```env
PORT=3000
MONGODB_URL=your_mongodb_connection_string
```

Never commit actual environment variables or database credentials.

### 4. Start the backend

From the server directory, run:

```bash
node index.js
```

### 5. Start the frontend

From the client directory, run:

```bash
npm run dev
```

Open the local URL provided by Vite.

## Learning Purpose

This repository represents a practical revision milestone in my full-stack development journey.

The main objective was to regain hands-on familiarity with the technologies and concepts involved in building a full-stack application, rather than simply revisiting theoretical notes.

## Future Learning

The next learning milestones include:

- Authentication and authorization.
- More advanced backend practices.
- Deployment.
- Building larger full-stack applications.

## Author

**Mohammad Zaid**

GitHub: [Mohammadzed17](https://github.com/Mohammadzed17)

---

*Built for learning, practice, and revising full-stack development fundamentals.*
