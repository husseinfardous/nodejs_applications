// User Model



// Load Modules
// Data Modules Send Back (Export) isn't Manipulated
// Store Exported Data as Constants

// Third Party Modules
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");



// Create User Schema (Allows Custom Methods)
var UserSchema = new mongoose.schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: "{VALUE} is not a Valid Email Address!"
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

// Generate Authentication Token
// Add Token to tokens Array in User Document
UserSchema.methods.generateAuthToken = function() {

    // Fetch Individual User Document
    var user = this;

    // Set Token Access
    var access = "auth";

    // Generate Authentication Token 
    var token = jwt.sign({_id: user._id.toHexString(), access}, "abc123").toString();

    // Add Access and Token to tokens Array in User Document
    user.tokens = user.tokens.concat([{access, token}]);
    return user.save().then(() => {
        return token;
    });
};

// Create User Model
var User = mongoose.model("User", UserSchema);



// Data to Export
// Exported Data is Stored in "require('<path-to-user.js>/user.js')"
module.exports = {
    User
};
