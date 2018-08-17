// Secure API

// Sets Up User Model, Generates Authentication Tokens, and Hashes Passwords to Secure User Data
// Uses Mongoose to Store To-Do Tasks of Users in MongoDB



// Load Modules
// Data Modules Send Back (Export) isn't Manipulated
// Store Exported Data as Constants

// Third Party Modules
const express = require("express");
const bodyParser = require("body-parser");

// Local Modules
const {mongoose} = require("./db/mongoose");
const {Todo} = require("./models/todo");
const {User} = require("./models/user");



// Configure Web Application

// Create Web Application through Call to Express
// Create Express Server by Implicitly calling "http.createServer()"
var app = express();

// Configure Body Parser Middleware
// Enables Express to Accept and Parse JSON Data (Request Body)
app.use(bodyParser.json());



// Routes (Endpoints)

// "/todos"
app.post("/todos", (req, res) => {

    // Create To-Do from Request Body
    var todo = new Todo({
        text: req.body.text
    });

    // Save To-Do as Document in MongoDB
    // Handle Errors
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});



// Start the Server on Port 3000
app.listen(3000, () => {
    console.log("Server is Running on Port 3000...");
});
