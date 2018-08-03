// Weather Application

// Uses Google APIs and Dark Sky API to get the Weather for a Given Address



// Load Modules
// Data Modules Send Back (Export) isn't Manipulated
// Store Exported Data as Constants

// Third Party Module
const yargs = require("yargs");

// Local Module
const geocode = require("./geocode/geocode");



// Specify Argument to User and Require it
// Display Helpful Information about Argument
// Fetch Command Line Argument
const argv = yargs
    .options({
        a: {
            demand: true,
            alias: "address",
            describe: "Address to Fetch Weather for",
            string: true
        }
    })
    .help()
    .alias("help", "h")
    .argv;



// Geocode the Given Argument (Address)
// Handle Errors
geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    }
    else {
        console.log(JSON.stringify(results, undefined, 2));
    }
});
