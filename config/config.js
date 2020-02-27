require('dotenv').config()

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": null,
    "database": process.env.DB_DATABASE,
    "host": "127.0.0.1",
    "dialect": "postgres",
    "operatorsAliases": 0
  },
  "test": {
    "username": process.env.DB_USERNAME,
    "password": null,
    "database": "cubyn_test_test",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "operatorsAliases": 0
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": null,
    "database": "cubyn-test_production",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "operatorsAliases": 0
  }
}
