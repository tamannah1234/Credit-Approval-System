# 🚀 Credit Approval System

A **backend Credit Approval System** built using **Django** and **Django REST Framework**.  
This application evaluates customer creditworthiness based on historical loan data and processes new loan requests using defined business rules.

> 📌 Developed as part of a **Backend Internship Assignment**  
> 📦 Fully **Dockerized** and **production-structured**

---

## 📌 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [System Features](#system-features)
- [Data Initialization](#data-initialization)
- [Project Setup](#project-setup)
- [API Endpoints](#api-endpoints)
- [Credit Scoring Logic](#credit-scoring-logic)
- [Security & Configuration](#security--configuration)
- [Assumptions](#assumptions)
- [Project Status](#project-status)
- [Author](#author)

---

## 🧠 Project Overview

The **Credit Approval System** performs the following:

- Registers customers and assigns a credit limit based on monthly income
- Loads historical customer and loan data using background workers
- Calculates customer credit score
- Determines loan eligibility using business rules
- Creates and manages loan records
- Exposes REST APIs for loan and customer data
- Runs entirely inside Docker containers

---

## 🛠 Tech Stack

| Component | Technology |
|--------|------------|
| Backend | Django 4+, Django REST Framework |
| Database | PostgreSQL |
| Background Jobs | Celery |
| Message Broker | Redis |
| Containerization | Docker, Docker Compose |
| Language | Python 3.12 |

---

## ✨ System Features

- Customer registration with auto credit-limit calculation
- Background ingestion of Excel data
- Credit score calculation based on loan history
- Loan eligibility check before approval
- Loan creation and tracking
- APIs to view loan and customer details
- Docker-based setup for easy deployment

---

## 📂 Data Initialization

Initial data is ingested using **Celery background workers**.

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
| current_debt | Existing debt (default: 0) |

---

### 💳 Loan Data (`loan_data.xlsx`)

| Field | Description |
|-----|------------|
| loan_id | Loan identifier |
| customer_id | Related customer |
| loan_amount | Loan amount |
| tenure | Loan duration (months) |
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
