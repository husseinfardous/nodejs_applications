// Frontend

// Chat Webpage



// Client Side



// Client (User) makes Request to Server to Open Web Socket for Persistent Connection between them
var socket = io();



// Perform Calculation to Determine if User should be Scrolled to Bottom (Latest Messages)
function scrollToBottom() {

    // Selectors
    var messages = jQuery("#messages");
    var newMessage = messages.children("li:last-child");

    // Heights
    var scrollTop = messages.prop("scrollTop");
    var clientHeight = messages.prop("clientHeight");
    var scrollHeight = messages.prop("scrollHeight");
    var prevMessageHeight = newMessage.prev().innerHeight();
    var newMessageHeight = newMessage.innerHeight();

    // Calculation

    // User at/near Bottom and should be Automatically Scrolled when New Messages come in
    if (scrollTop + clientHeight + prevMessageHeight + newMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
};



// Register Event Listeners and Emit (Create) Custom Events

// User Connected to Server (Listen) (Core Event)
socket.on("connect", function() {

    // Fetch Parameters passed into URL of Chat Webpage from Form on Join Webpage
    var params = jQuery.deparam(window.location.search);

    // User's Request to Join Chat Room Sent to Server (Emit) (Custom Event)
    socket.emit("join", params, function(err) {

        // Handle Invalid User Input
        // Send Back to Join Webpage
        if (err) {
            alert(err);
            window.location.href = "/";
        }

        // Valid User Input
        else {
            console.log("No Error!");
        }
    });
});

// User Disconnected from Server (Listen) (Core Event)
socket.on("disconnect", function() {
    console.log("Disconnected from Server!");
});

// Update List of Users in Chat Room (Listen) (Custom Event)
socket.on("updateUserList", function(users) {

    // Store Each User as List Item in Ordered List on Webpage
    var ol = jQuery("<ol></ol>");
    users.forEach(function(user) {
        ol.append(jQuery("<li></li>").text(user));
    });
    jQuery("#users").html(ol);
});

// User Received a Message from Server (Listen) (Custom Event)
socket.on("fromServerMessage", function(message) {

    // Message Timestamp
    var formattedTime = moment(message.createdAt).format("h:mm a");

    // Append Ordered List on Webpage with Each Message as List Item
    var template = jQuery("#message-template").html();
    var html = Mustache.render(template, {
        from: message.from,
        text: message.text,
        createdAt: formattedTime
    });
    jQuery("#messages").append(html);

    // Determine if User should be Scrolled to Bottom (Latest Messages)
    scrollToBottom();
});

// User Received Location from Server (Listen) (Custom Event)
socket.on("fromServerLocation", function(loc) {

    // Message Timestamp
    var formattedTime = moment(loc.createdAt).format("h:mm a");

    // Append Ordered List on Webpage with Each Google Maps URL Link as List Item
    var template = jQuery("#location-message-template").html();
    var html = Mustache.render(template, {
        from: loc.from,
        url: loc.url,
        createdAt: formattedTime
    });
    jQuery("#messages").append(html);

    // Determine if User should be Scrolled to Bottom (Latest Messages)
    scrollToBottom();
});



// Register Event Listeners

// Listen for Form Submission
jQuery("#message-form").on("submit", function(e) {

    // Prevent Page Refresh Process on Form Submission
    e.preventDefault();

    // User Sent a Message to Server (Emit) (Custom Event)
    socket.emit("toServerMessage", {
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
