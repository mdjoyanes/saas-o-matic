# Pricing Algorithm Specification


## Objective

Calculate the monthly SaaS subscription base cost using an accumulative tier pricing model.


## Pricing Rules


### Tier 1

Users from 0 to 10.

Price:
10€ per user.


### Tier 2

Users from 11 to 50.

Price:
8€ per additional user.


### Tier 3

Users above 50.

Price:
5€ per additional user.



## Calculation Example


Input:

15 active users


Calculation:

First 10 users:

10 × 10€ = 100€


Remaining 5 users:

5 × 8€ = 40€


Final base price:

140€



## Implementation Decision


The calculation is isolated inside a billing service.

The API layer does not contain business rules.

This improves maintainability and allows future pricing changes.