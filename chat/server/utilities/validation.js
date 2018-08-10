// Validator

// Provides Utility Functions for Validating User Input



// Verify Given Value is of Type String that Contains at least One Non White Space Character
// trim() Deletes Leading and Trailing White Space
var isRealString = (str) => {
    return typeof str === "string" && str.trim().length > 0;
};



// Data to Export
// Exported Data is Stored in "require('<path-to-validation.js>/validation.js')"
module.exports = {
    isRealString
};
