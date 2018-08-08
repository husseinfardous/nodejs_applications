// Frontend

// Chat Webpage



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

    // Message Timestamp
    var formattedTime = moment(message.createdAt).format("h:mm a");

    // Append Ordered List on Webpage with Each Message as List Item
    // Prevent Malicious HTML Injections by using Safe Method li.text() for Dynamic Data as Opposed to using HTML Tag in jQuery()
    var li = jQuery("<li></li>");
    li.text(`${message.from} ${formattedTime}: ${message.text}`);
    jQuery("#messages").append(li);
});

// User Received Location from Server (Listen) (Custom Event)
socket.on("fromServerLocation", function(loc) {

    // Message Timestamp
    var formattedTime = moment(loc.createdAt).format("h:mm a");

    // Create HTML Tags
    var li = jQuery("<li></li>");
    var a = jQuery("<a target='_blank'>My Current Location</a>");

    // Prevent Malicious HTML Injections by using Safe Methods li.text() and a.attr() for Dynamic Data as Opposed to using HTML Tags in jQuery()
    li.text(`${loc.from} ${formattedTime}: `);
    a.attr("href", loc.url);

    // Append Ordered List on Webpage with Each Google Maps URL Link as List Item
    li.append(a);
    jQuery("#messages").append(li);
});



// Register Event Listeners

// Listen for Form Submission
jQuery("#message-form").on("submit", function(e) {

    // Prevent Page Refresh Process on Form Submission
    e.preventDefault();

    // User Sent a Message to Server (Emit) (Custom Event)
    socket.emit("toServerMessage", {
        from: "User",
        text: jQuery("[name=message]").val()
    }, function(response) {
        jQuery("[name=message]").val("");
    });
});

// Listen for "Send Location" Button Click
var locationButton = jQuery("#send-location");
locationButton.on("click", function(e) {

    // If Geolocation API not Supported by Old Browser...
    if (!navigator.geolocation) {
        return alert("Geolocation is not Supported by your Browser!");
    }

    // Disable Button to Prevent Spam while in Process of Sending Location
    locationButton.attr("disabled", "disabled").text("Sending Location...");

    navigator.geolocation.getCurrentPosition(function(position) {

        // Re-Enable Button
        locationButton.removeAttr("disabled").text("Send Location");

        // User Sent Location to Server (Emit) (Custom Event)
        socket.emit("toServerLocation", {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {

        // Re-Enable Button
        locationButton.removeAttr("disabled").text("Send Location");

        alert("Unable to Fetch Location!");
    });
});
