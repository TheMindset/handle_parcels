# Steps
- Create a new repository on github called cubyn-test
- This project will be a node app.

## Objective
You need to implement a small API, with this kind of concepts

## How we gonna rate your work?
### Mandatory
Create an API REST to store "parcel" ("colis" in french). 
A parcel have a type (classic or express), a weight, a volume, a recipient, an address, a city and a zipcode.

This API could :
- CRUD: Create, Read one (with this id) or more (list), Update, and Delete parcels.
- Estimate the price of a parcel (define a route linked with a parcel id) to calculate the price of the parcel.
  - The price formula is based on this kind of grid ;
  
| Weight | Express | Classic |
|--------|---------|---------|
| < 0,5kg|   10€   |    6€   |
|  < 1kg |   12€   |    7€   |
|  < 2kg |   15€   |    9€   |
|  >2kg, per kg (rounded up|  4€ | 1€ |

### Bonus
- Some unit test
- Some functionnal test (e2e).
- Handle jwt authentification
- Store your database in SQL