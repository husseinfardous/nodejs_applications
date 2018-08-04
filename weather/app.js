// Weather Application

// Uses Google APIs and Dark Sky API to get the Weather for a Given Address



// Load Modules
// Data Modules Send Back (Export) isn't Manipulated
// Store Exported Data as Constants

// Third Party Module
const yargs = require("yargs");

// Local Modules
const geocode = require("./geocode/geocode");
const weather = require("./weather/weather");



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



// Wire Up Weather Search by Chaining Callbacks Together

// Geocode the Given Argument (Address)
// Handle Errors
geocode.geocodeAddress(argv.address, (errorMessage, geocodeResults) => {

    // Machine Error (Can't Connect to Google Servers) or Invalid Request
    // Log Error
    if (errorMessage) {
        console.log(errorMessage);
    }

    // Success
    else {

        // Log Address
        console.log(geocodeResults.address);

        // Fetch Weather for a Given Latitude and Longitude Coordinate
        // Handle Errors
        weather.getWeather(geocodeResults.latitude, geocodeResults.longitude, (errorMessage, weatherResults) => {

            // Machine Error (Can't Connect to Dark Sky Server) or Invalid Request
            // Log Error
            if (errorMessage) {
                console.log(errorMessage);
            }

            // Success
            // Log Temperature
            else {
                console.log(`It is currently ${weatherResults.temperature}, but it feels like ${weatherResults.apparentTemperature}.`);
            }
        });
    }
});
