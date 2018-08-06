// Frontend

// Home Webpage



// Client Side



// Client (User) makes Request to Server to Open Web Socket for Persistent Connection between them
var socket = io();



// Register Event Listeners and Emit (Create) Custom Events

// User Connected to Server (Listen) (Core Event)
socket.on("connect", function() {
    console.log("Connected to Server!");
});

// User Disconnected from Server (Listen) (Core Event)
socket.on("disconnect", function() {
    console.log("Disconnected from Server!");
});

// User Received a Message from Server (Listen) (Custom Event)
socket.on("fromServerMessage", function(message) {
    console.log("New Message:", message);
});

// User Sent a Message to Server (Emit) (Custom Event)
socket.emit("toServerMessage", {
    from: "Frank",
    text: "Hi. This is Frank."
}, function(response) {
    console.log(response);
});
