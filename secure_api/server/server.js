// Secure API

// Sets Up User Model, Generates Authentication Tokens, and Hashes Passwords to Secure User Data
// Uses Mongoose to Store To-Do Tasks of Users in MongoDB



// Load Modules
// Data Modules Send Back (Export) isn't Manipulated
// Store Exported Data as Constants

// Third Party Modules
const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
const {ObjectID} = require("mongodb");

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

// "/users"
app.post("/users", (req, res) => {

    // Pick Off Properties from Request Body
    // Prevent User from Adding/Updating Unwanted User Document Properties
    var body = _.pick(req.body, ["email", "password"]);

    // Create User
    var user = new User(body);

    // Generate Authentication Token
    // Save User as Document in MongoDB Database
    // Send Token as "x-auth" Header
    // Handle Errors
    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header("x-auth", token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

// "/todos"

app.post("/todos", (req, res) => {

    // Create To-Do from Request Body
    var todo = new Todo({
        text: req.body.text
    });

    // Save To-Do as Document in MongoDB Database
    // Handle Errors
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get("/todos", (req, res) => {

    // Fetch All To-Do Documents from MongoDB Database
    // Handle Errors
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

// "/todos/<id>"

app.get("/todos/:id", (req, res) => {

    // Get ID from Request Parameter
    var id = req.params.id;

    // Invalid ID
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    // Fetch To-Do Document by ID from MongoDB Database
    // Handle Errors
    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

app.patch("/todos/:id", (req, res) => {

    // Get ID from Request Parameter
    var id = req.params.id;

    // Pick Off Properties from Request Body
    // Prevent User from Adding/Updating Unwanted To-Do Document Properties
    var body = _.pick(req.body, ["text", "completed"]);

    // Invalid ID
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    // Create Timestamp for completedAt Property in To-Do Document if completed Property is Set to True
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    }

    // Clean-Up if completed Property of To-Do Document is either Set to False or to a Non-Boolean Value
    else {
        body.completed = false;
        body.completedAt = null;
    }

    // Fetch and Update To-Do Document by ID from MongoDB Database
    // Handle Errors
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

app.delete("/todos/:id", (req, res) => {

    // Get ID from Request Parameter
    var id = req.params.id;

    // Invalid ID
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    // Fetch and Remove To-Do Document by ID from MongoDB Database
    // Handle Errors
    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});



// Start the Server on Port 3000
app.listen(3000, () => {
    console.log("Server is Running on Port 3000...");
});
