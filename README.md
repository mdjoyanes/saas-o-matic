# SaaS-O-Matic

## Dynamic Billing & Subscription Optimizer

SaaS-O-Matic is an internal commercial tool designed to simulate and optimize SaaS subscription pricing for corporate customers.

The application allows commercial teams to:

- Manage corporate customers
- Validate tax identifiers (DNI/NIF/CIF)
- Create subscription simulations
- Calculate progressive pricing
- Apply country taxes
- Convert prices into different currencies

The project has been developed as a full-stack application using a React frontend and a Flask REST API backend.

---

# Features

## Customer Management

The system allows users to:

- Create corporate customers
- Store company information
- Search customers by company name or tax identifier
- View customer details
- Delete customers
- Validate Spanish DNI, NIF and CIF identifiers using their official validation algorithms

---

## Subscription Simulation

The application supports:

- Creating SaaS subscription simulations
- Progressive pricing calculation
- Country-specific tax calculation
- Simulation history
- Automatic creation and update timestamps

---

## Multi-Currency Support

The frontend integrates with the ExchangeRate API:

https://open.er-api.com/v6/latest/EUR

Supported currencies:

- EUR (€)
- USD ($)
- GBP (£)

Users can switch currencies dynamically and instantly see converted prices.

---

## Interactive Pricing

The pricing simulator includes:

- Dynamic user slider
- Real-time price calculation
- Progressive tier pricing
- Currency conversion

---

# Tech Stack

## Backend

- Python
- Flask
- Flask-SQLAlchemy
- SQLite
- REST API

## Frontend

- React
- TypeScript
- React Bootstrap
- Axios
- Vite

---

# Pricing Algorithm

The application uses progressive pricing tiers.

## Tier 1

```
0 - 10 users
10 €/user
```

## Tier 2

```
11 - 50 users
8 €/user
```

## Tier 3

```
51+ users
5 €/user
```

### Example

For **15 users**:

```
First 10 users:
10 × 10€ = 100€

Next 5 users:
5 × 8€ = 40€

Base price:
140€
```

For a Spanish customer:

```
Base price:
140€

VAT (21%):
29.40€

Final price:
169.40€
```

---

# Project Structure

```
saas-o-matic
│
├── backend
│   ├── models
│   │   ├── customer.py
│   │   └── simulation.py
│   │
│   ├── routes
│   │   ├── customers.py
│   │   └── simulations.py
│   │
│   ├── services
│   │   ├── billing.py
│   │   └── taxes.py
│   │
│   ├── validators
│   │   ├── dni_validator.py
│   │   ├── nif_validator.py
│   │   └── cif_validator.py
│   │
│   ├── database.db
│   ├── requirements.txt
│   └── app.py
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── types
│   │
│   ├── package.json
│   └── vite.config.ts
│
└── ai-workspace
    ├── architecture
    ├── prompts
    └── specs
```

---

# Local Installation

The application runs locally using two servers:

- Flask backend
- React frontend

---

# Backend Setup

Move to the backend folder:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment.

### Linux / macOS

```bash
source venv/bin/activate
```

### Windows PowerShell

```powershell
.\venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

> **Note:** All required dependencies, including **tzdata** for timezone support, are installed automatically through `requirements.txt`.

Start the backend:

```bash
python app.py
```

The API will be available at:

```
http://localhost:5000
```

Test the API:

```
GET http://localhost:5000/
```

Response:

```json
{
  "message": "SaaS-O-Matic API running"
}
```

---

# Frontend Setup

Open a new terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at:

```
http://localhost:5173
```

---

# Environment Configuration

> ⚠️ **IMPORTANT**
>
> The frontend **will not work** unless you create the `.env` file before running `npm run dev`.

Create a `.env` file inside the `frontend` folder with the following content:

```env
VITE_API_URL=http://localhost:5000
```

If you create or modify the `.env` file while the Vite development server is running, stop it and run:

```bash
npm run dev
```

again so the changes are applied.

---

# REST API

## Customers

### Create Customer

```
POST /customers
```

Example:

```json
{
  "company_name": "Example Company",
  "tax_type": "NIF",
  "tax_identifier": "12345678Z",
  "email": "contact@example.com",
  "country": "Spain",
  "plan": "Enterprise"
}
```

---

### Get Customers

```
GET /customers
```

---

### Search Customers

```
GET /customers/search?q=value
```

---

### Delete Customer

```
DELETE /customers/{id}
```

---

## Simulations

### Create Simulation

```
POST /simulations
```

Example:

```json
{
  "customer_id": 1,
  "active_users": 15,
  "storage_gb": 100,
  "api_calls": 50000
}
```

---

### Get Customer Simulations

```
GET /customers/{id}/simulations
```

---

# Database

The project uses **SQLite**.

The database file is automatically created when the backend starts.

```
backend/database.db
```

---

# AI Workspace

The repository includes an `ai-workspace` directory documenting the development process.

## Architecture

Contains:

- Database design
- System architecture
- Project structure decisions

## Specs

Contains:

- API specifications
- Business rules
- Pricing algorithm

## Prompts

Contains:

- AI-assisted development workflow
- Prompt engineering process
- Iterative implementation history

This documentation demonstrates the use of AI as an engineering assistant while maintaining manual review and full developer control over the final implementation.

---

# Development Notes

The project was developed following:

- Modular architecture
- Separation of concerns
- RESTful API principles
- Reusable React components
- Manual validation of AI-generated code
- Incremental development and testing

---

# Author

Developed as a technical challenge project.
