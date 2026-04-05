# 🏦 CreditSense — Credit Approval System Frontend

A modern, production-grade React frontend for the [Credit Approval System](https://github.com/tamannah1234/Credit-Approval-System) Django REST API.

![CreditSense](https://img.shields.io/badge/React-18-61DAFB?logo=react) ![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel) ![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

- 📊 **Dashboard** — Overview of credit scoring rules and system capabilities
- 👤 **Register Customer** — Onboard new customers with live credit limit preview
- 🎯 **Check Eligibility** — Evaluate loan eligibility with visual credit score meter
- 📝 **Apply for Loan** — Submit applications with real-time EMI calculator
- 🔍 **View Loans** — Search loans by Loan ID or Customer ID

---

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| React Router v6 | Client-side routing |
| Axios | HTTP requests to Django API |
| Recharts | Data visualization |
| Google Fonts (Syne + DM Sans) | Typography |

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js v16+ installed
- Django backend running at `http://127.0.0.1:8000`

### Steps

```bash
# 1. Navigate to the frontend folder
cd credit-approval-frontend

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env and set REACT_APP_API_URL=http://127.0.0.1:8000/api

# 4. Start the development server
npm start
```

App opens at **http://localhost:3000** 🎉

---

## 📁 Project Structure

```
credit-approval-frontend/
├── public/
│   └── index.html              # HTML entry point
├── src/
│   ├── components/
│   │   ├── Navbar.js           # Top navigation bar
│   │   └── UI.js               # Reusable UI components (Button, Card, Input, Badge...)
│   ├── pages/
│   │   ├── Dashboard.js        # Home page with system overview
│   │   ├── RegisterCustomer.js # Customer registration form
│   │   ├── CheckEligibility.js # Loan eligibility checker
│   │   ├── CreateLoan.js       # Loan application form
│   │   └── ViewLoans.js        # Loan search & details
│   ├── services/
│   │   └── api.js              # Axios API service layer
│   ├── App.js                  # Routes configuration
│   ├── index.js                # React entry point
│   └── index.css               # Global styles & CSS variables
├── .env.example                # Environment variable template
├── .env                        # Local environment variables (not committed)
├── vercel.json                 # Vercel deployment config
└── package.json
```

---

## 🌐 API Endpoints Used

| Method | Endpoint | Page |
|--------|----------|------|
| `POST` | `/api/register/` | Register Customer |
| `POST` | `/api/check-eligibility/` | Check Eligibility |
| `POST` | `/api/create-loan/` | Apply for Loan |
| `GET` | `/api/view-loan/<loan_id>/` | View Loans |
| `GET` | `/api/view-loans/<customer_id>/` | View Loans |

---

## 📤 Push to GitHub

Follow these steps to push this frontend to your own GitHub repository.

### Step 1 — Create a new GitHub repository

1. Go to [github.com/new](https://github.com/new)
2. Name it: `credit-approval-frontend`
3. Set it to **Public**
4. **Do NOT** initialize with README, .gitignore, or license
5. Click **Create repository**

### Step 2 — Initialize Git and push

```bash
# Inside the credit-approval-frontend folder:

# Initialize git
git init

# Add all files
git add .

# First commit
git commit -m "feat: initial Credit Approval System frontend"

# Add your GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/credit-approval-frontend.git

# Push to main branch
git branch -M main
git push -u origin main
```

✅ Your code is now on GitHub!

---

## ▲ Deploy on Vercel

### Option A — Deploy via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Import your `credit-approval-frontend` repository
4. Vercel auto-detects Create React App — leave settings as default
5. Under **Environment Variables**, add:
   ```
   REACT_APP_API_URL = https://your-django-backend-url.com/api
   ```
6. Click **Deploy** 🚀

Your app will be live at: `https://credit-approval-frontend.vercel.app`

---

### Option B — Deploy via Vercel CLI

```bash
# Step 1: Install Vercel CLI globally
npm install -g vercel

# Step 2: Login to Vercel
vercel login

# Step 3: Deploy from the project folder
cd credit-approval-frontend
vercel

# Follow the prompts:
# - Set up and deploy? → Y
# - Which scope? → your account
# - Link to existing project? → N
# - Project name? → credit-approval-frontend
# - Directory? → ./
# - Override settings? → N

# Step 4: For production deployment
vercel --prod
```

---

## ⚙️ Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Base URL of Django REST API | `http://127.0.0.1:8000/api` |

> **Important:** On Vercel, set `REACT_APP_API_URL` to your **deployed backend URL**, not localhost.

---

## 🔧 CORS Setup (Backend)

For the frontend to communicate with Django, ensure CORS is configured in your backend:

```bash
# Install django-cors-headers
pip install django-cors-headers
```

In `settings.py`:
```python
INSTALLED_APPS = [
    ...
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Must be first
    ...
]

# For development (allow all)
CORS_ALLOW_ALL_ORIGINS = True

# For production (specify your Vercel URL)
CORS_ALLOWED_ORIGINS = [
    "https://your-app.vercel.app",
    "http://localhost:3000",
]
```

---

## 🏗 Build for Production

```bash
npm run build
```

Creates an optimized build in the `build/` folder ready for deployment.

---

## 👩‍💻 Author

Built as the frontend for **Tamanna Singh's** Credit Approval System backend.

---

## 📄 License

MIT License — free to use and modify.
