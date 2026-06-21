# Tobofu Matrimonial App

Tobofu is a modern, responsive, AI-powered matrimonial application designed to connect users through meaningful profiles and intelligent compatibility scoring.

## Features
- **Dynamic Profiles:** Comprehensive profile setup including photos, education, profession, religion, and bios.
- **AI Compatibility Score:** Real-time AI engine that calculates match percentages based on multi-dimensional criteria (location, education, profession, religion, age preferences).
- **Real-Time Chat:** WebSocket-integrated messaging system with instant delivery, unread counts, and online indicators.
- **Notification System:** In-app dropdown notifications for new matches, profile views, and messages.
- **Responsive UI:** Built with Next.js, Tailwind CSS, and Framer Motion for a premium, buttery-smooth experience on desktop and mobile.

## Project Structure
- `tobofu-v0-ui/` : Next.js 14 Frontend Application (React, Tailwind CSS, Framer Motion)
- `tobofu-backend/` : FastAPI Backend Application (Python, SQLAlchemy, PostgreSQL/Neon, WebSockets)

## Prerequisites
- Node.js (v18+)
- Python (3.10+)
- PostgreSQL Database (Neon DB recommended)

## Running Locally

### 1. Backend Setup
Navigate to the backend directory:
```bash
cd tobofu-backend
```

Create a virtual environment and activate it:
```bash
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate
```

Install dependencies:
```bash
pip install -r requirements.txt
```

Create a `.env` file in `tobofu-backend` with your Database URL:
```env
DATABASE_URL=postgresql://user:password@host/dbname
```

Run the FastAPI server:
```bash
uvicorn main:app --reload
```
The backend API and Swagger UI will be available at `http://localhost:8000/docs`.

### 2. Frontend Setup
Open a new terminal and navigate to the frontend directory:
```bash
cd tobofu-v0-ui
```

Install dependencies:
```bash
npm install
# or
pnpm install
```

Run the development server:
```bash
npm run dev
```
The frontend will be available at `http://localhost:3000`.

## Deployment
The frontend is optimized for deployment on [Vercel](https://vercel.com).
The backend can be deployed on services like [Render](https://render.com), [Railway](https://railway.app), or any VM running Docker/Python.

## Git Configuration
This repository has been initialized to ignore `node_modules`, `venv`, and `.env` files to prevent sensitive data or large dependencies from being pushed to GitHub.
