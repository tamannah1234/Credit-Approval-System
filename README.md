# 🚀 Credit Approval System

A **backend Credit Approval System** built using **Django** and **Django REST Framework**.  
This project evaluates customer **creditworthiness** based on historical loan data and processes new loan requests using predefined business rules.

---

## 📌 Tech Stack

| Layer | Technology |
|-----|-----------|
| Backend | Django 4+, Django REST Framework |
| Database | PostgreSQL |
| Async Tasks | Celery |
| Message Broker | Redis |
| Containerization | Docker, Docker Compose |
| Language | Python 3.12 |

---

## 📖 Project Overview

The Credit Approval System provides REST APIs to:

- 👤 Register customers
- 💳 Calculate credit score based on loan history
- ✅ Check loan eligibility
- 📝 Create and manage loans
- 📊 View customer and loan details
- ⚙️ Ingest initial data using background workers
- 🐳 Run completely inside Docker containers

---

## 📂 Data Initialization (Background Tasks)

Initial data is ingested using **Celery workers** from Excel files.

### 🧑 Customer Data (`customers_data.xlsx`)

| Field |
|------|
| customer_id |
| first_name |
| last_name |
| age |
| phone_number |
| monthly_salary |
| approved_limit |
| current_debt (default = 0) |

### 💰 Loan Data (`loan_data.xlsx`)

| Field |
|-----|
| loan_id |
| customer_id |
| loan_amount |
| tenure |
| interest_rate |
| monthly_repayment (EMI) |
| EMIs paid on time |
| start_date |
| end_date |

---

## 🛠️ Project Setup (Step-by-Step)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/Credit-Approval-System.git
cd Credit-Approval-System

2️⃣ Run with Docker
docker compose up --build
This will start:

🟢 Django Web Server

🟡 PostgreSQL Database

🔵 Redis

🟣 Celery Worker

3️⃣ Access the Application
http://127.0.0.1:8000/
🔗 API Endpoints
📍 Base URL
/api/
🟢 Register Customer
POST /api/register/

{
  "first_name": "Aaron",
  "last_name": "Garcia",
  "age": 63,
  "monthly_salary": 50000,
  "phone_number": "9629317944"
}
🟡 Check Loan Eligibility
POST /api/check-eligibility/

{
  "customer_id": 1,
  "loan_amount": 100000,
  "interest_rate": 10,
  "tenure": 12
}
🔵 Create Loan
POST /api/create-loan/

{
  "customer_id": 1,
  "loan_amount": 100000,
  "interest_rate": 10,
  "tenure": 12
}
🔍 View Loan by Loan ID
GET /api/view-loan/<loan_id>/

📄 View All Loans of a Customer
GET /api/view-loans/<customer_id>/

📊 Credit Scoring Logic
Credit score (out of 100) is calculated using:

✔ Number of EMIs paid on time

✔ Number of past loans

✔ Total outstanding loan amount

✔ EMI burden relative to monthly salary

🧮 Loan Approval Rules
Credit Score	Decision
> 50	Loan approved
30 – 50	Approved (interest ≥ 12%)
10 – 30	Approved (interest ≥ 16%)
< 10	Loan rejected
EMI > 50% of salary	Loan rejected
Loans exceed approved limit	Credit score = 0
🔐 Security & Configuration
.gitignore excludes:

Environment files

Database files

Python cache files

❌ No production credentials exposed

✅ Runs fully inside Docker containers

📌 Assumptions
Compound interest is used for EMI calculation

Only active loans are considered

Sample / dummy data is provided for evaluation

✅ Project Status
Feature	Status
REST APIs	✔ Completed
Credit Logic	✔ Implemented
Background Ingestion	✔ Working
Docker Setup	✔ Ready
Submission Ready	✔ Yes
👩‍💻 Author
Tamanna Singh
Backend Developer

Skills:
Django · REST APIs · PostgreSQL · Celery · Docker
---
