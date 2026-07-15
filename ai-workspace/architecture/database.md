# Database Architecture

The application uses SQLite as the database engine.

## Customers Table

Fields:

- id
- company_name
- tax_identifier
- email
- country
- plan


## Simulations Table

Fields:

- id
- customer_id
- active_users
- storage_gb
- api_calls
- base_price
- tax_rate
- tax_amount
- total_price
- created_at
- updated_at


## Relationship

One customer can have multiple simulations.

Relationship:

Customer 1 ---- N Simulations