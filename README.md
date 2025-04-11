# 📘 Student Job Tracker

## 1. Introduction
Student Job Tracker is a full-stack web application that helps students keep track of their job applications. Users can add, view, edit, and delete job entries with ease using a clean and responsive interface.

Built with **React.js** for the frontend and **Node.js + Express** for the backend, and it uses **MongoDB Atlas** as the database. The UI is styled with **Tailwind CSS**.

---

## 2. Functionality
- 📝 Add new job applications  
- 📋 View all saved jobs in card or table format (responsive)  
- ✏️ Edit existing job entries (prefilled form)  
- 🗑️ Delete job entries  
- 💾 Persistent storage using MongoDB Atlas  

---

## 3. Database
- **Database**: MongoDB Atlas  
- **Collection**: `applications`  
- **Fields**:
  - `company` (string)
  - `role` (string)
  - `status` (enum: Applied, Interview, Offer, Rejected)
  - `date` (string - ISO Date)
  - `link` (string - optional)

---

## 4. Frontend
### 🔧 Setup & Run
```bash
cd frontend
npm install
npm start
```
### 🔗 Features
- React Router DOM for navigation
- Axios for API calls
- TailwindCSS for styling
- Responsive layout with cards (mobile) and tables (desktop)

## 5. Backend
### 🔧 Setup & Run
```bash
cd backend
npm install
node index.js
```
### 🌐 API Endpoints
- GET /jobs → fetch all jobs
- GET /jobs/:id → fetch single job by ID
- POST /jobs → add new job
- PATCH /jobs/:id → update job
- DELETE /jobs/:id → delete job

### 🔐 Environment Variables
Create a .env file in the backend/ folder:
```bash
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority
```
Built by Kavya Malhotra.