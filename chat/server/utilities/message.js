// Message Operations

// Provides Utility Functions for Messages



// Generate Message
var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    };
};



// Generate Location Message
var generateLocationMessage = (from, lat, lng) => {
    return {
        from,
        url: "https://www.google.com/maps?q=" + lat + "," + lng,
        createdAt: new Date().getTime()
    };
};



// Data to Export
// Exported Data is Stored in "require('<path-to-message.js>/message.js')"
module.exports = {
    generateMessage,
    generateLocationMessage
};
