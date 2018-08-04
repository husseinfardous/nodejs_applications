// Weather Application

// Uses Google APIs and Dark Sky API to get the Weather for a Given Address



// Load Modules
// Data Modules Send Back (Export) isn't Manipulated
// Store Exported Data as Constants

// Third Party Modules
const yargs = require("yargs");
const axios = require("axios");



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



// Wire Up Weather Search by Chaining Promises Together

// Encode Address to URL Form
var encodedAddress = encodeURIComponent(argv.address);

// Google APIs Geocoding URL
geo_url = "https://maps.googleapis.com/maps/api/geocode/json?address=";

// GET Request to Google APIs
// Handle Errors in .catch() Below
axios.get(geo_url + encodedAddress).then((response) => {

    // Invalid Request
    // Log Error
    if (response.data.status === "ZERO_RESULTS") {
        throw new Error("Unable to Find that Address!");
    }

    // Log Address
    console.log(response.data.results[0].formatted_address);

    // Fetch Latitude and Longitude Coordinate for Address
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;

    // Dark Sky API Secret Key
    var secret_key = "8735271af845feafbd5bc5dd23d6dc00";

    // Dark Sky API Weather URL
    var weather_url = "https://api.darksky.net/forecast/" + secret_key + "/";

    // GET Request to Dark Sky API
    // Handle Errors in .catch() Below
    return axios.get(weather_url + lat + "," + lng);

}).then((response) => {

    // Fetch Weather for a Given Latitude and Longitude Coordinate
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;

    // Log Weather
    console.log(`It is currently ${temperature}, but it feels like ${apparentTemperature}.`);

}).catch((error) => {

    // Machine Error (Can't Connect to Remote Servers)
    // Log Error
    if (error.code === "ENOTFOUND") {
        console.log("Unable to Connect to Remote Servers!");
    }

    // Log Error
    else {
        console.log(error.message);
    }
});
