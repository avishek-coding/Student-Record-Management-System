# 📚 Student Record Management System

A full-stack web application for managing student records with DSA algorithm implementations. Features persistent data storage, real-time CRUD operations, and algorithmic sorting/searching.

## 🚀 Live Demo
🔗 [View Live Project](localhost) *Not Deploying yet*

## ✨ Features

- ✅ Add, View, Delete student records
- ✅ Quick Sort Algorithm - Sort students by CGPA (O(n log n))
- ✅ Binary Search Algorithm - Search students by ID (O(log n))
- ✅ MongoDB Database - Persistent data storage
- ✅ Responsive Dashboard - Mobile friendly design

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| Frontend | HTML5, CSS3, JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| DSA | Quick Sort, Binary Search |

## 📁 Project Structure
student-record-management/
├── backend/
│ ├── models/Student.js
│ ├── routes/students.js
│ └── server.js
├── frontend/
│ ├── admin_dashboard.html
│ ├── css/dashboard.css
│ └── *.html files
└── README.md


## 🚀 Getting Started

### Prerequisites
- Node.js installed
- MongoDB installed

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/Student-Record-Management-System.git
cd student-record-management/backend

# Install dependencies
npm install

# Create .env file
echo "PORT=5000" > .env
echo "MONGODB_URI=mongodb://localhost:27017/student_management" >> .env

# Start MongoDB
mongod

# Run the server
npm run dev
