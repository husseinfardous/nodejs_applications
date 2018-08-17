// User Model



// Load Module
// Data Module Sends Back (Exports) isn't Manipulated
// Store Exported Data as a Constant

// Third Party Module
const mongoose = require("mongoose");



// Create User Model
// Add Type and Validator
var User = mongoose.model("User", {
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});



// Data to Export
// Exported Data is Stored in "require('<path-to-user.js>/user.js')"
module.exports = {
    User
};
