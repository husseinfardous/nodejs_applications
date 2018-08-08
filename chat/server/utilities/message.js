// Message Operations

// Provides Utility Functions for Messages



// Load Module
// Data Module Sends Back (Exports) isn't Manipulated
// Store Exported Data as a Constant

// Third Party Module
const moment = require("moment");



// Generate Message
var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: moment().valueOf()
    };
};



// Generate Location Message
var generateLocationMessage = (from, lat, lng) => {
    return {
        from,
        url: "https://www.google.com/maps?q=" + lat + "," + lng,
        createdAt: moment().valueOf() 
    };
};



// Data to Export
// Exported Data is Stored in "require('<path-to-message.js>/message.js')"
module.exports = {
    generateMessage,
    generateLocationMessage
};
