# Project Structure


## Backend

Technology:

- Python
- Flask
- SQLAlchemy
- SQLite


Structure:


backend/

├── app.py

├── database.py

├── models/

│   ├── customer.py

│   └── simulation.py


├── routes/

│   ├── customers.py

│   └── simulations.py


├── services/

│   ├── billing.py

│   └── taxes.py



## Frontend

Technology:

- React
- TypeScript
- React Bootstrap


Structure:


frontend/src/


├── components/

Reusable UI components.


├── pages/

Application views.


├── services/

API communication layer.


├── types/

TypeScript interfaces.


├── utils/

Helper functions.



## Development Approach


The project follows a modular architecture separating:

- Business logic
- API routes
- Database models
- User interface components


This allows easier maintenance and scalability.