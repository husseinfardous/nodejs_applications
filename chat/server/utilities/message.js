// Message Operations

// Provides Utility Functions for Messages



// Generate Message
var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    }
};



// Data to Export
// Exported Data is Stored in "require('<path-to-message.js>/message.js')"
module.exports = {
    generateMessage
};
