# SaaS-O-Matic
## Dynamic Billing & Subscription Optimizer


SaaS-O-Matic is an internal tool designed for commercial teams to simulate and optimize SaaS subscription pricing for corporate customers.

The application allows managing customers, creating billing simulations, applying country taxes and converting prices between different currencies.


---

# Features

## Customer Management

- Create corporate customers
- Search customers by company name or tax identifier
- View customer details
- Delete customers
- Validate Spanish DNI/NIF identifiers


## Subscription Simulation

- Create SaaS cost simulations
- Calculate prices using progressive tier pricing
- Apply country taxes
- Store simulation history
- Track creation and modification dates


## Multi Currency

The application integrates with an external exchange rate API.

Supported currencies:

- EUR (€)
- USD ($)
- GBP (£)


## Interactive Pricing

The simulator includes:

- User slider
- Real-time price calculation
- Dynamic tier pricing preview


---

# Tech Stack


## Backend

- Python
- Flask
- SQLAlchemy
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


The system uses progressive tier pricing:

### Tier 1

0-10 users

10€/user


### Tier 2

11-50 users

8€/user


### Tier 3

51+ users

5€/user


Example:

15 users:

10 users × 10€ = 100€

5 users × 8€ = 40€

Total = 140€

---

# Project Structure
saas-o-matic

├── backend
│ ├── models
│ ├── routes
│ ├── services
│ └── validators
│
├── frontend
│ ├── components
│ ├── pages
│ ├── services
│ └── utils
│
└── ai-workspace
├── architecture
├── prompts
└── specs


# Installation

## Backend

Navigate to backend folder:

```bash
cd backend