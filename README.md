# MERN E-Commerce Store

A full-stack e-commerce web application built with the **MERN stack (MongoDB, Express, React, Node.js)**.
The project focuses on clean architecture, scalable backend design, and a modern, responsive user interface inspired by real-world e-commerce platforms.

This application demonstrates practical full-stack development skills, including REST API design, frontend–backend integration, and modular project structure.

---

## Features

- Modern **dark-themed UI**
- Responsive design for desktop and tablet screens
- Product catalog with images, prices, and categories
- Product listing and detailed product pages
- Admin-style dashboard with product overview
- Data visualization and statistics view
- RESTful API architecture
- Modular backend structure (controllers, routes, models)
- Media handling for product images
- Environment-based configuration

---

## Tech Stack

### Frontend
- React
- JavaScript (ES6+)
- Tailwind CSS
- Axios (API communication)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Tools & Concepts
- REST API
- Git & GitHub
- Environment variables (.env)
- Modular folder structure
- Client–server architecture

---

## Project Structure

```text
MERN-E-Commerce-Store/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utilities/
│   └── index.js
│
├── frontend/
│   ├── src/
│   │   ├── utils/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── index.html
│   ├── eslint.config.js
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── .gitignore
│
├── uploads/
├── .gitignore
├── README.md
├── .env.example
├── package.json
└── package-lock.json
```
---

## Getting Started

### Prerequisites
- Node.js
- MongoDB (local or cloud instance)
- npm or yarn

---

### Installation

1. Clone the repository:
```
git clone https://github.com/viktor-siropol/MERN-E-Commerce-Store.git
cd MERN-E-Commerce-Store
```

2. Install backend dependencies:
```
cd backend
npm install
```

3. Install frontend dependencies:
```
cd ../frontend
npm install
```

4. Configure environment variables

Create a `.env` file inside the `backend` directory:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/your_db_name
NODE_ENV=development
JWT_SECRET=your_jwt_secret_here
PAYPAL_CLIENT_ID=your_paypal_client_id
```

5. Running the Application

The project supports multiple ways of running the application depending on development needs.

### Option 1: Run backend and frontend concurrently (recommended)
```bash
# start backend and frontend together from the root directory
npm run dev
```

- Frontend (Vite): http://localhost:5173  
- Backend API (Node.js / Express): http://localhost:5000

### Option 2: Run backend only
```bash
cd backend
npm run dev
```

- Backend API: http://localhost:5000

---

## 👤 Author

Viktor Siropol  
GitHub: https://github.com/viktor-siropol


