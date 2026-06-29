# Mini Task Manager

A full-stack Task Manager application built with **Next.js**, **TypeScript**, **Node.js**, **Express**, **MongoDB**, and **Tailwind CSS**.

## 🚀 Features

- Add new tasks
- Set optional deadlines
- Mark tasks as completed
- Delete tasks
- Filter tasks (All / Active / Completed)
- Deadline status badges:
  - Overdue
  - Due Today
  - X Days Left
- Progress bar showing completed tasks

## 🛠️ Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS

### Backend
- Node.js
- Express.js
- TypeScript

### Database
- MongoDB
- Mongoose

## 📁 Project Structure

```
mini-task-manager/
│
├── backend/
│   └── src/
│       ├── controllers/
│       ├── models/
│       ├── routes/
│       └── server.ts
│
├── frontend/
│   ├── app/
│   ├── lib/
│   ├── types/
│
└── README.md
```

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/your-username/mini-task-manager.git
cd mini-task-manager
```

## ▶️ Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend runs at:

```
http://localhost:5000
```

## ▶️ Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:3000
```

## 💡 Design Decisions

- Separated frontend and backend for better maintainability.
- Used Next.js App Router.
- Implemented RESTful APIs with Express.
- Added validation for task title and deadlines.
- Used Mongoose for MongoDB schema management.
- Organized backend into controllers, models, and routes.

## 🚀 Future Improvements

- User authentication
- Search tasks
- Task categories
- Drag-and-drop task ordering
- Due date reminders

