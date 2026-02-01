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
```
