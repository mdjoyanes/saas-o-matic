# Engineering Decisions


## Backend Architecture

Decision:
Separate routes, services and validators.

Reason:
Avoid business logic inside API controllers.


## Pricing Algorithm

Decision:
Implement tier calculation in a dedicated service.

Reason:
Allow testing and future pricing changes.


## Validation

Decision:
Use independent validators for DNI, NIF and CIF.

Reason:
Each identifier has different official validation rules.


## Frontend

Decision:
Use React components and TypeScript interfaces.

Reason:
Improve maintainability and type safety.


## AI Usage

Decision:
Use AI as a coding assistant, not as an autonomous developer.

All generated code was reviewed and tested manually.