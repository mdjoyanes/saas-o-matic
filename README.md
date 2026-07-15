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

The project has been developed as a full-stack local application with a React frontend and Flask REST API backend.

---

# Features

## Customer Management

The system allows:

- Create corporate customers
- Store company information
- Search customers by company name or tax identifier
- View customer details
- Delete customers
- Validate Spanish DNI, NIF and CIF identifiers using specific algorithms


## Subscription Simulation

The application supports:

- Creating SaaS subscription simulations
- Calculating costs using tier pricing
- Applying country taxes
- Saving simulation history
- Tracking creation and update dates


## Multi Currency

The frontend integrates with an external exchange rate API:

```
https://open.er-api.com/v6/latest/EUR
```

Supported currencies:

- EUR (€)
- USD ($)
- GBP (£)


Users can change the display currency dynamically and see converted prices in real time.


## Interactive Pricing

The simulator includes:

- Dynamic user slider
- Real-time price preview
- Automatic tier calculation
- Currency conversion


---

# Tech Stack


## Backend

- Python
- Flask
- Flask SQLAlchemy
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

The system uses progressive tier pricing.

## Tier 1

```
0 - 10 users
10€/user
```


## Tier 2

```
11 - 50 users
8€/user
```


## Tier 3

```
51+ users
5€/user
```


Example:

For 15 users:

```
First 10 users:
10 × 10€ = 100€

Next 5 users:
5 × 8€ = 40€

Total:
140€
```

After calculating the base price, the system applies the corresponding country tax.

Example Spain:

```
Base price: 140€

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
│   │
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
│   └── app.py
│
├── frontend
│   │
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── types
│   │
│   └── package.json
│
└── ai-workspace
    │
    ├── architecture
    ├── prompts
    └── specs
```


---

# Local Installation

The project runs locally using two different servers:

- Flask backend
- React frontend


---

# Backend Setup


Open a terminal:


```bash
cd backend
```


Create a virtual environment:


```bash
python -m venv venv
```


Activate the environment:


### Windows PowerShell

```powershell
.\venv\Scripts\activate
```


Install dependencies:


```bash
pip install -r requirements.txt
```


Start the backend:


```bash
python app.py
```


The API will start on:


```
http://localhost:5000
```


You can test it:


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


Open another terminal:


```bash
cd frontend
```


Install dependencies:


```bash
npm install
```


Start development server:


```bash
npm run dev
```


The frontend will run on:


```
http://localhost:5173
```


---

# Environment Configuration


The frontend uses the backend API URL.

Create a `.env` file inside:

```
frontend/
```


Example:


```env
VITE_API_URL=http://localhost:5000
```


---

# REST API Endpoints


## Customers


### Create customer

```
POST /customers
```


Example body:


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

### Get customers

```
GET /customers
```


---

### Search customers

```
GET /customers/search?q=value
```


---

### Delete customer

```
DELETE /customers/{id}
```


---

## Simulations


### Create simulation

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

### Get customer simulations


```
GET /customers/{id}/simulations
```


---

# Database


The application uses SQLite.

The database file is created automatically when the backend starts:

```
backend/database.db
```


---

# AI Workspace


The repository includes an `ai-workspace` folder documenting the development process.


Contents:


## Architecture

Contains:

- Database design
- Project structure decisions


## Specs

Contains:

- API specifications
- Business rules
- Pricing algorithm definition


## Prompts

Contains:

- AI development workflow
- Prompt strategies
- Iterative development process


This documentation shows the use of AI as an engineering assistant while maintaining manual review and control over the final implementation.


---

# Development Notes

The project was developed following:

- Modular architecture principles
- Separation of business logic and API routes
- Reusable frontend components
- Manual validation of generated code
- Incremental testing during development


---

# Author

Developed as a technical challenge project.
