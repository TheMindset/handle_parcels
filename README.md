# Cubyn Test

## About

The deployed API endpoints can be consumed at:

https://cubyn-test.herokuapp.com/

## Endpoints

### POST /api/v1/parcels/register

Creates a user account, using an name, email, and password passed in as form data in the body of the request.

Request:

```json
Content-Type: application/json
Accept: application/json

body:
{
  "name": "Hola",
  "email": "hola@example.com",
  "password": "password"
}
```

Example of expected output:

```json
{
    "id": 1,
    "name": "Hola",
    "email": "hola@email.com"
}
```
---

### POST /api/v1/users/login

Authenticates a user, using an email and password passed in as form data in the body of the request.
The response contains a "token" that will be used for all private requests.

Request:

```json
Content-Type: application/json
Accept: application/json

body:
{
  "email": "hola@email.com",
  "password": "123456"
}
```

Example of expected output:

```json
{
    "success": "Logged in!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTgzMDg2MTQ2fQ.R_yAIGDDUbL2DLTAAlZjKWTfq6CeuY1cLnRjtDu1z8c"
}
```
---

### POST /api/v1/parcels

Create a new parcels. This requests must contain in the header an "auth-token" which refers to the "token" returned by the "POST /api/v1/users/login".

Request:

```json
Content-Type: application/json
Headers: "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTgzMDg2MTQ2fQ.R_yAIGDDUbL2DLTAAlZjKWTfq6CeuY1cLnRjtDu1z8c"
Accept: application/json

body:
{
  "type": "EXPRESS",
  "weight": 2.4,
  "volume": 0.54,
  "recipient": "Dupot Amandine",
  "address": "11 Elene segara",
  "city": "SegaraCity",
  "zipcode": "14501"
}
```

Example of expected output:

```json
{
    "id": 7,
    "type": "EXPRESS",
    "weight": 2.4,
    "volume": 0.54,
    "recipient": "Dupot Amandine",
    "address": "11 Elene segara",
    "city": "SegaraCity",
    "zipcode": "14501"
}
```
---
### PATCH /api/v1/parcels/7

Update the parcel specified by the "ID" in the params. This requests must contain in the header an "auth-token" which refers to the "token" returned by the "POST /api/v1/users/login".

Request:

```json
Content-Type: application/json
Headers: "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTgzMDg2MTQ2fQ.R_yAIGDDUbL2DLTAAlZjKWTfq6CeuY1cLnRjtDu1z8c"
Accept: application/json

body:
{
  "address": "460 Elene segara"
}
```

Example of expected output:

```json
{
  "id": 7,
  "type": "EXPRESS",
  "weight": 2.4,
  "volume": 0.54,
  "recipient": "Dupot Amandine",
  "address": "460 Elene segara",
  "city": "SegaraCity",
  "zipcode": "14501"
}
```
---

### DELETE /api/v1/parcels/7

Delete the parcel specified by the "ID" in the params. This requests must contain in the header an "auth-token" which refers to the "token" returned by the "POST /api/v1/users/login".

---

### GET /api/v1/parcels/2/price

Estimate the price of the parcel specified by the "ID" in the params. This requests must contain in the header an "auth-token" which refers to the "token" returned by the "POST /api/v1/users/login".

Example of expected output:

<details>

```json
{
    "id": 2,
    "type": "EXPRESS",
    "volume": 0.4,
    "price": 19,
    "recipient": "Freddy Kiehn",
    "address": "1123 Denesik Stream",
    "city": "Harberport",
    "zipcode": "10884"
}
```
</details>

---

## Local Installation

### Requirements & Technique Stack

* Node.js / Express

* Postgres/ Squelize

* Jest / Superset

### Clone

```
$ git clone git@github.com:TheMindset/cubyn-test.git
$ cd cubyn-test
$ npm install
```

### Setup Database

```
$ npx sequelize db:create
$ npx sequelize db:migrate
$ npx sequelize db:seed:all

```

Additionally, you'll need:
* A [DB_USERNAME], and have it defined within a file in the root directory named `.env`.
* A [DB_DATABASE], and have it defined within a file in the root directory named `.env`.
* A [SECRET_TOKEN], and have it defined within a file in the root directory named `.env`.

### API Exploration

Once installation and database setup are complete, explore the various API endpoints with the following steps:
* From the `cubyn-test` project directory, boot up a server with `$ npm start`
* Open your browser, and visit `http://localhost:3000/`
* Query the available endpoints by appending to `http://localhost:3000/` in your browser

### Running Tests

Tests are implemented with Jest, and can be run with `$ npm test`.

Example of expected output:
```
Test Suites: 4 passed, 4 total
Tests:       15 passed, 15 total
Snapshots:   0 total
Time:        4.725s
Ran all test suites.
```
