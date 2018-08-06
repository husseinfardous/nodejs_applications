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

    // Append Ordered List on Webpage with Each Message as List Item
    var li = jQuery("<li></li>");
    li.text(`${message.from}: ${message.text}`);
    jQuery("#messages").append(li);
});



// Event Listener
// Listen to Form Submission
jQuery("#message-form").on("submit", function(e) {

    // Prevent Page Refresh Process on Form Submission
    e.preventDefault();

    // User Sent a Message to Server (Emit) (Custom Event)
    socket.emit("toServerMessage", {
        from: "User",
        text: jQuery("[name=message]").val()
    }, function(response) {
        console.log(response);
    });
});
