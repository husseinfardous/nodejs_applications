// Chat Application

// Uses socket.io to Allow Different Users to Chat with Each Other



// Load Modules
// Data Modules Send Back (Export) isn't Manipulated
// Store Exported Data as Constants

// Core Modules
const path = require("path");
const http = require("http");

// Third Party Modules
const express = require("express");
const socketIO = require("socket.io");



// Configure Web Application

// Create Web Application through Call to Express
// Create Express Server by Implicitly calling "http.createServer()"
var app = express();

// Create HTTP Server
// Use HTTP Server for Web Application instead of Implicit Express Server
var server = http.createServer(app);

// Configure HTTP Server to Work with socket.io
// Create Web Socket Server that Binds to HTTP Server
var io = socketIO(server);

// Fetch Path to public/ Directory (Frontend Files are Stored there)
const publicPath = path.join(__dirname, "../public");

// Configure Express Static Middleware
app.use(express.static(publicPath));



// Server Side



// Register Event Listeners

// User Connected to Server 
io.on("connection", (socket) => {

    console.log("User Connected to Server!");

    // User Disconnected from Server
    socket.on("disconnect", () => {
        console.log("User Disconnected from Server!");
    });
});



// Use HTTP Server instead of Express Server
// Start the HTTP Server on Port 3000
server.listen(3000, () => {
    console.log("Server is Running on Port 3000...");
});
