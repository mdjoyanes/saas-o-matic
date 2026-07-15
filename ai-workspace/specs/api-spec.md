# API Specification


## Customers


POST /customers


Creates a corporate customer.


Fields:

- company_name
- tax_identifier
- email
- country
- plan



## Simulations


POST /simulations


Creates a pricing simulation.


Fields:

- customer_id
- active_users
- storage_gb
- api_calls