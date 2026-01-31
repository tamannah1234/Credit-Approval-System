# Credit Approval System

A backend Credit Approval System developed using Django and Django Rest Framework.  
The system evaluates customer creditworthiness based on historical loan data and processes new loan requests accordingly.  
This project is built as part of a Backend Internship Assessment.

---

## Tech Stack

- **Backend Framework:** Django 4+, Django REST Framework
- **Database:** PostgreSQL
- **Asynchronous Tasks:** Celery with Redis
- **Containerization:** Docker & Docker Compose
- **Language:** Python 3.12

---

## Project Overview

The Credit Approval System performs the following operations:

- Registers customers and assigns a credit limit based on monthly income
- Ingests historical customer and loan data using background workers
- Calculates credit score using past loan behavior
- Determines loan eligibility based on defined business rules
- Creates and manages loan records
- Provides APIs to view loan and customer details
- Runs entirely inside Docker containers

---

## Data Initialization

Initial data is ingested using Celery background tasks from Excel files.

### Customer Data (`customers_data.xlsx`)
Fields:
- customer_id
- first_name
- last_name
- age
- phone_number
- monthly_salary
- approved_limit
- current_debt (defaulted to 0)

### Loan Data (`loan_data.xlsx`)
Fields:
- customer_id
- loan_id
- loan_amount
- tenure
- interest_rate
- monthly_repayment (EMI)
- EMIs paid on time
- start_date
- end_date

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/Credit-Approval-System.git
cd Credit-Approval-System
2. Run the Application Using Docker
docker compose up --build
This command starts:

Django web application

PostgreSQL database

Redis service

Celery worker

The application will be available at:

http://127.0.0.1:8000/
API Endpoints
Base URL:

/api/
Register Customer
POST /register/

Request Body:

{
  "first_name": "Aaron",
  "last_name": "Garcia",
  "age": 63,
  "monthly_salary": 50000,
  "phone_number": "9629317944"
}
Check Loan Eligibility
POST /check-eligibility/

{
  "customer_id": 1,
  "loan_amount": 100000,
  "interest_rate": 10,
  "tenure": 12
}
Create Loan
POST /create-loan/

{
  "customer_id": 1,
  "loan_amount": 100000,
  "interest_rate": 10,
  "tenure": 12
}
View Loan by Loan ID
GET /view-loan/<loan_id>/

View All Loans of a Customer
GET /view-loans/<customer_id>/

Credit Scoring Logic
Credit score (out of 100) is calculated using:

Number of past loans paid on time

Number of loans taken

Current outstanding loan amount

EMI burden relative to monthly salary

Approval Rules:

Credit score > 50 → Loan approved

Credit score 30–50 → Approved with interest ≥ 12%

Credit score 10–30 → Approved with interest ≥ 16%

Credit score < 10 → Loan rejected

Total EMIs exceeding 50% of salary → Loan rejected

Security and Configuration
Environment-specific and sensitive files are excluded via .gitignore

Database and services run within Docker containers

No credentials are hardcoded for production use

Assumptions
Compound interest is used for EMI calculations

Only active loans are considered for eligibility checks

Sample/dummy data is provided for testing purposes

Project Status
All required APIs implemented

Background workers functional

Dockerized deployment completed

Ready for evaluation

Author
Tamanna Singh
Backend Developer (Django, REST APIs)
