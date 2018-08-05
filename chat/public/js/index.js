// Frontend

// Home Webpage



// Client Side



// Client makes Request to Server to Open Web Socket for Persistent Connection between them
var socket = io();



// Register Event Listeners

// User Connected to Server
socket.on("connect", function() {
    console.log("Connected to Server!");
});

// User Disconnected from Server
socket.on("disconnect", function() {
    console.log("Disconnected from Server!");
});
