// Secure API

// Sets Up User Model, Generates Authentication Tokens, and Hashes Passwords to Secure User Data
// Uses Mongoose to Store To-Do Tasks of Users in MongoDB



// Load Module
// Data Module Sends Back (Exports) isn't Manipulated
// Store Exported Data as a Constant

// Third Party Module
const mongoose = require("mongoose");



// Configure Mongoose

// Use Built-In Promise Library
mongoose.Promise = global.Promise;

// Connect to Database in MongoDB Server
mongoose.connect("mongodb://localhost:27017/todo_app");



// Create Models

// User Model
// Add Type and Validator
var User = mongoose.model("User", {
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});

// To-Do Model
// Add Type, Validator, and Default Value
var Todo = mongoose.model("Todo", {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});
