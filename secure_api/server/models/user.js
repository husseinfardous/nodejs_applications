// User Model



// Load Modules
// Data Modules Send Back (Export) isn't Manipulated
// Store Exported Data as Constants

// Third Party Modules
const _ = require("lodash");
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");



// Create User Schema (Allows Custom Methods)
var UserSchema = new mongoose.Schema({
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

// Instance Method
// Only Return "_id" and "email" Properties of User Document
UserSchema.methods.toJSON = function() {
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ["_id", "email"]);
};

// Instance Method
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

// Model Method
// Fetch User Document with Given Token
UserSchema.statics.findByToken = function(token) {

    // Fetch User Model
    var User = this;

    // Verify Token given by User
    // Handle Errors (such as an Invalid/Altered Token)
    var decoded;
    try {
        decoded = jwt.verify(token, "abc123");
    }
    catch(e) {
        return Promise.reject();
    }

    // Fetch User Document with Given Token
    return User.findOne({
        _id: decoded._id,
        "tokens.token": token,
        "tokens.access": "auth"
    });
};

// Create User Model
var User = mongoose.model("User", UserSchema);



// Data to Export
// Exported Data is Stored in "require('<path-to-user.js>/user.js')"
module.exports = {
    User
};
