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

// Local Modules
const {generateMessage, generateLocationMessage} = require("./utilities/message");
const {isRealString} = require("./utilities/validation");



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



// Register Event Listeners and Emit (Create) Custom Events

// User Connected to Server (Listen) (Core Event)
// Socket provides Bidirectional, Persistent Connection between Client (User) and Server
io.on("connection", (socket) => {

    console.log("User Connected to Server!");

    // Put User in Chat Room (Listen) (Custom Event)
    socket.on("join", (params, callback) => {

        // Handle Invalid User Input
        if (!isRealString(params.name) || !isRealString(params.room)) {
            callback("Your Display Name and Room Name are Required!");
        }

        // Add User to Chat Room ("Room Name")
        socket.join(params.room);

        // Server Sent a Message to a User (Emit) (Custom Event)
        socket.emit("fromServerMessage", generateMessage("Admin", "Welcome to the Chat Application!"));

        // Server Sent a Message to All Users Except "this" User in Chat Room (Emit) (Custom Event)
        socket.broadcast.to(params.room).emit("fromServerMessage", generateMessage("Admin", `${params.name} Joined the Chat Room!`));

        // Server Sent an Acknowledgement (User's Request was Received) to User
        callback();
    });

    // Server Received a Message from a User (Listen) (Custom Event)
    socket.on("toServerMessage", (message, callback) => {
        
        console.log("New Message:", message);
        
        // Server Sent a Message to All Users (Emit) (Custom Event)
        // Message: A User's Message
        io.emit("fromServerMessage", generateMessage(message.from, message.text));

        // Server Sent an Acknowledgement (User's Message was Received) to User
        callback();
    });

    // Server Received Location from a User (Listen) (Custom Event)
    socket.on("toServerLocation", (coordinates) => {

        // Server Sent a User's Location to All Users (Emit) (Custom Event)
        io.emit("fromServerLocation", generateLocationMessage("Admin", coordinates.latitude, coordinates.longitude));
    });

    // User Disconnected from Server (Listen) (Core Event)
    socket.on("disconnect", () => {
        console.log("User Disconnected from Server!");
    });
});



// Use HTTP Server instead of Express Server
// Start the HTTP Server on Port 3000
server.listen(3000, () => {
    console.log("Server is Running on Port 3000...");
});
