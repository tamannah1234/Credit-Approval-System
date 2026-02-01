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
