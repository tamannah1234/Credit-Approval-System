# Credit Approval System

A backend-based Credit Approval System developed using Django and Django REST Framework. The application evaluates customer creditworthiness using historical loan data and predefined business rules to determine loan eligibility and approval decisions.

The system provides REST APIs for customer registration, loan processing, credit scoring, and loan management while supporting asynchronous data ingestion through Celery workers.

---

# Tech Stack

| Layer | Technology |
|------|-------------|
| Backend | Django, Django REST Framework |
| Database | PostgreSQL |
| Background Tasks | Celery |
| Message Broker | Redis |
| Containerization | Docker, Docker Compose |
| Language | Python 3.12 |

---

# Project Overview

The Credit Approval System enables:

- Customer registration and profile management
- Credit score calculation based on loan history
- Loan eligibility verification
- Loan creation and management
- Retrieval of customer and loan details
- Background ingestion of initial datasets
- Containerized deployment using Docker

The application follows a modular backend architecture and exposes RESTful APIs for all core functionalities.

---

# System Architecture

```text
Client / API Consumer
          ↓
Django REST APIs
          ↓
Business Logic Layer
          ↓
PostgreSQL Database
          ↓
Celery Workers + Redis
```

---

# Data Initialization

Initial customer and loan datasets are ingested asynchronously using Celery workers from Excel files.

## Customer Dataset (`customers_data.xlsx`)

| Field |
|------|
| customer_id |
| first_name |
| last_name |
| age |
| phone_number |
| monthly_salary |
| approved_limit |
| current_debt |

---

## Loan Dataset (`loan_data.xlsx`)

| Field |
|------|
| loan_id |
| customer_id |
| loan_amount |
| tenure |
| interest_rate |
| monthly_repayment |
| emis_paid_on_time |
| start_date |
| end_date |

---

# Project Setup

## Prerequisites

Ensure the following are installed:

- Docker
- Docker Compose

---

# 1. Clone Repository

```bash
git clone https://github.com/your-username/Credit-Approval-System.git
cd Credit-Approval-System
```

---

# 2. Run Application with Docker

```bash
docker compose up --build
```

This command starts:

- Django Application Server
- PostgreSQL Database
- Redis Server
- Celery Worker

---

# 3. Access Application

```text
http://127.0.0.1:8000/
```

---

# API Endpoints

## Base URL

```text
/api/
```

---

# Register Customer

## Endpoint

```http
POST /api/register/
```

## Request Body

```json
{
  "first_name": "Aaron",
  "last_name": "Garcia",
  "age": 63,
  "monthly_salary": 50000,
  "phone_number": "9629317944"
}
```

---

# Check Loan Eligibility

## Endpoint

```http
POST /api/check-eligibility/
```

## Request Body

```json
{
  "customer_id": 1,
  "loan_amount": 100000,
  "interest_rate": 10,
  "tenure": 12
}
```

---

# Create Loan

## Endpoint

```http
POST /api/create-loan/
```

## Request Body

```json
{
  "customer_id": 1,
  "loan_amount": 100000,
  "interest_rate": 10,
  "tenure": 12
}
```

---

# View Loan by Loan ID

## Endpoint

```http
GET /api/view-loan/<loan_id>/
```

---

# View Customer Loans

## Endpoint

```http
GET /api/view-loans/<customer_id>/
```

---

# Credit Scoring Logic

Credit scores are calculated on a scale of 0–100 using the following parameters:

- Number of EMIs paid on time
- Number of previous loans
- Total outstanding loan amount
- EMI burden relative to monthly salary

---

# Loan Approval Rules

| Credit Score | Decision |
|--------------|-----------|
| Above 50 | Loan Approved |
| 30 – 50 | Approved if interest rate ≥ 12% |
| 10 – 30 | Approved if interest rate ≥ 16% |
| Below 10 | Loan Rejected |

Additional Conditions:

- Loans are rejected if EMI exceeds 50% of monthly salary
- Credit score becomes 0 if loans exceed the approved credit limit

---

# Assumptions

- Compound interest is used for EMI calculation
- Only active loans are considered during evaluation
- Sample data is used for initial testing and evaluation

---

# Security & Configuration

The project follows secure development practices:

- Environment files excluded using `.gitignore`
- No production credentials exposed
- Containerized isolated services using Docker
- Modular backend architecture

---

# Project Status

| Module | Status |
|--------|--------|
| REST APIs | Completed |
| Credit Evaluation Logic | Implemented |
| Background Data Ingestion | Working |
| Docker Setup | Ready |
| Deployment Ready | Yes |

---

# Future Improvements

- JWT-based authentication
- Admin analytics dashboard
- Loan repayment tracking
- Automated risk classification
- CI/CD pipeline integration
- API documentation using Swagger/OpenAPI

---

# Contributing

Contributions are welcome.

1. Fork the repository  
2. Create a new feature branch  
3. Commit your changes  
4. Push the branch  
5. Open a Pull Request  

---

# License

This project is licensed under the MIT License.

---

# Author

**Tamanna Singh**

Backend Developer specializing in:

- Django
- REST APIs
- PostgreSQL
- Celery
- Docker

GitHub: https://github.com/tamannah1234
