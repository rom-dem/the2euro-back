# The 2 Euro Collection API REST

[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=rom-dem_the2euro-back&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=rom-dem_the2euro-back)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=rom-dem_the2euro-back&metric=coverage)](https://sonarcloud.io/summary/new_code?id=rom-dem_the2euro-back)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=rom-dem_the2euro-back&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=rom-dem_the2euro-back)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=rom-dem_the2euro-back&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=rom-dem_the2euro-back)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=rom-dem_the2euro-back&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=rom-dem_the2euro-back)

The 2 Euro Collection is an API REST built with Node.js and Express.js that connects to a MongoDB database.
The API contains information about coins and users, allowing CRUD operations to be performed on coins and user authentication with JWT.

## Endpoints

### Coins

- Get all coins

  - GET /coins
  - Returns an array with all coins in the database.

- Get one coin

  - GET /coins/:id
  - Returns a specific coin based on the ID passed in the URL parameter.

- Create a coin

  - POST /coins/create
  - Creates a new coin with the information provided in the request body.

- Delete a coin
  - DELETE /coins/delete/:id
  - Deletes a specific coin based on the ID passed in the URL parameter.

### Users

- Login user
  - POST /users/login
  - Authenticates a user by comparing the email and password provided in the request body with the information stored in the database. If the authentication is successful, returns a JWT token that can be used for future requests that require authentication.

## Tech Stack

![NodeJS](https://img.shields.io/badge/-NodeJS-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/-Express-000000?style=flat-square&logo=express&logoColor=white)
![Typescript](https://img.shields.io/badge/-Typescript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Express validation](https://img.shields.io/badge/-Express%20validation-000000?style=flat-square&logo=express-validation&logoColor=white)
![Jest](https://img.shields.io/badge/-Jest-C21325?style=flat-square&logo=jest&logoColor=white)
![Supertest](https://img.shields.io/badge/-Supertest-000000?style=flat-square&logo=supertest&logoColor=white)
![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![JSON Web Token](https://img.shields.io/badge/-JSON%20Web%20Token-000000?style=flat-square&logo=json-web-token&logoColor=white)

## Getting Started

Run npm install to install dependencies.
Create a .env file based on the .env.example file and set the necessary environment variables.
Run npm start to start the server.

Clone the repository and install all the needed dependencies. **`npm install`**

To run the build use **`npm run build`**

To start the server use **`npm start`**

## Testing

To run the testing suites use **`npm test`**

## Frontend

This is a full stack project, you can find the frontend code [here](https://github.com/rom-dem/the2euro-front)

Production: [Go to The2Euro](https://the2euro.vercel.app/)
