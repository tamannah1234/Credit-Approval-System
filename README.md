# 🚀 Credit Approval System

A **backend Credit Approval System** built using **Django** and **Django REST Framework**.  
The system evaluates customer creditworthiness based on historical loan data and processes new loan requests using predefined business rules.

> 📌 Backend Internship Assignment  
> 📦 Fully Dockerized | REST API Driven | Production-structured

---

## 📑 Table of Contents

- Project Overview  
- Tech Stack  
- Key Features  
- Data Initialization  
- Project Setup  
- API Endpoints  
- Credit Scoring Logic  
- Security & Configuration  
- Assumptions  
- Project Status  
- Author  

---

## 🧠 Project Overview

The **Credit Approval System** enables financial institutions to:

- Register customers and compute approved credit limits
- Load historical customer and loan data
- Calculate a customer credit score
- Evaluate loan eligibility based on business rules
- Create and manage loan records
- Expose REST APIs for customer and loan operations
- Run seamlessly using Docker containers

---

## 🛠 Tech Stack

| Layer | Technology |
|-----|-----------|
| Backend | Django, Django REST Framework |
| Database | PostgreSQL |
| Background Processing | Celery |
| Message Broker | Redis |
| Containerization | Docker, Docker Compose |
| Language | Python 3.12 |

---

## ✨ Key Features

- Customer registration with automatic credit limit calculation  
- Background ingestion of customer and loan data  
- Credit score computation using historical loan performance  
- Loan eligibility validation before approval  
- Loan creation and tracking  
- RESTful APIs for all operations  
- Fully containerized environment  

---

## 📂 Data Initialization

Historical data is loaded using **Celery background workers**.

### 🧑 Customer Data (`customers_data.xlsx`)

| Field | Description |
|-----|------------|
| customer_id | Unique customer identifier |
| first_name | Customer first name |
| last_name | Customer last name |
| age | Customer age |
| phone_number | Contact number |
| monthly_salary | Monthly income |
| approved_limit | Credit limit |
| current_debt | Existing debt |

---

### 💳 Loan Data (`loan_data.xlsx`)

| Field | Description |
|-----|------------|
| loan_id | Unique loan identifier |
| customer_id | Associated customer |
| loan_amount | Loan amount |
| tenure | Loan tenure (months) |
| interest_rate | Interest percentage |
| monthly_repayment | EMI amount |
| EMIs paid on time | Payment history |
| start_date | Loan start date |
| end_date | Loan end date |

---

## ⚙️ Project Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/Credit-Approval-System.git
cd Credit-Approval-System
###  2️⃣ Run with Docker
```bash
docker compose up --build


This will start:

Django web server

PostgreSQL database

Redis

Celery worker

### 3️⃣ Access the Application
http://127.0.0.1:8000/

### 🔗 API Endpoints

Base URL

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

📄 View Loans by Customer ID
GET /api/view-loans/<customer_id>/

### 📊 Credit Scoring Logic

Credit score is calculated out of 100, based on:

Number of EMIs paid on time

Number of past loans

Total outstanding loan amount

EMI burden relative to monthly salary

### Loan Approval Rules
Credit Score	Decision
> 50	Loan approved
30 – 50	Approved (interest ≥ 12%)
10 – 30	Approved (interest ≥ 16%)
< 10	Loan rejected
EMI > 50% salary	Loan rejected
Loans exceed approved limit	Credit score = 0
### 🔐 Security & Configuration

.gitignore excludes:

Environment files

Database files

Python cache files

No production credentials are exposed

Runs completely inside Docker containers

### 📌 Assumptions

Compound interest is used for EMI calculation

Only active loans are considered

Dummy/sample data is used for assessment

### ✅ Project Status
Feature	Status
REST APIs	✔ Completed
Credit Logic	✔ Implemented
Background Ingestion	✔ Working
Docker Setup	✔ Ready
Submission Ready	✔ Yes
👩‍💻 Author

Tamanna Singh
Backend Developer

Django · REST APIs · PostgreSQL · Docker

