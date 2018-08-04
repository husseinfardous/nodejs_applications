// Chat Application

// Uses socket.io to Allow Different Users to Chat with Each Other



// Load Modules
// Data Modules Send Back (Export) isn't Manipulated
// Store Exported Data as Constants

// Core Module
const path = require("path");

// Third Party Module
const express = require("express");



// Configure Web Application

// Create Web Application through Call to Express
var app = express();

// Fetch Path to public/ Directory (Frontend Files are Stored there)
const publicPath = path.join(__dirname, "../public");

// Configure Express Static Middleware
app.use(express.static(publicPath));

// Start the Server on Port 3000
app.listen(3000, () => {
    console.log("Server is Running on Port 3000...");
});
