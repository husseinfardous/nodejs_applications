# API Name

Secure API

# API Overview

This API sets up a user model, generates authentication tokens, and hashes passwords to secure user data, and it uses mongoose to store the To-Do tasks of users in mongoDB.

# API Requirements

1. Node v10
2. Npm v6
3. MongoDB
4. Lodash
5. Express
6. Mongoose
7. Body-parser
8. Validator
9. Jsonwebtoken
10. Bcryptjs

# API Usage

This API is live on Heroku (Cloud Application Platform). Follow the link to use it.

[Secure API](https://aqueous-dusk-71769.herokuapp.com/)

To otherwise run the API locally:

## First Time

1. Install MongoDB
2. Run `<path-to-mongod-binary/mongod-executable>/mongod --dbpath <path-to-data-directory>`
Example Data Directory: `~/Documents/data`
3. Run `cd <path-to-nodejs_applications>/secure_api`
4. Run `npm install`
5. Run `node server/server.js`
6. Go to `localhost:3000`

## Not the First Time

1. Run `<path-to-mongod-binary/mongod-executable>/mongod --dbpath <path-to-data-directory>`
Example Data Directory: `~/Documents/data`
2. Run `cd <path-to-nodejs_applications>/secure_api`
3. Run `node server/server.js`
4. Go to `localhost:3000`

## Routes

### Public

#### POST /users

This route is for signing-up (creating an account). A request body is required with values for the `email` and `password` keys in JSON format.

An `x-auth` header is sent back with the authentication token required to access private routes.

#### POST /users/login

This route is for logging-in. A request body is required with values for the `email` and `password` keys in JSON format.

An `x-auth` header is sent back with the authentication token required to access private routes.

### Private

NOTE: The authentication token is required to be sent as an `x-auth` request header for all of the private routes listed below.

#### DELETE /users/me/token

This route is for logging-out (deletes the authentication token of the logged in user).

#### GET /users/me

This route is for fetching the logged-in user's information.

#### POST /todos

This route is for creating a new To-Do task for the logged-in user. A request body is required with the value for the `text` key in JSON format. (Optional: A boolean (default is False) may be sent for the `completed` key in JSON format.)

#### GET /todos

This route is for fetching the logged-in user's To-Do tasks.

#### GET /todos/id

This route is for fetching the logged-in user's To-Do task by ID.

#### PATCH /todos/id

This route is for fetching and updating the logged-in user's To-Do task by ID. A request body may be sent with the values for the `text` (optional) and `completed` (optional) keys in JSON format.

#### DELETE /todos/id

This route is for fetching and removing the logged-in user's To-Do task by ID.

# Some API Improvements

1. Create the Frontend and hook it up to the Backend.
2. Use `cookies` to save the authentication token when the user signs-up or logs-in.
