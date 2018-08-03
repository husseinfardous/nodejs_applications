// Geocoder

// Geocodes the Given Address



// Load Module
// Data Module Sends Back (Exports) isn't Manipulated
// Store Exported Data as a Constant

// Third Party Module
const request = require("request");



// Geocode the Given Address
var geocodeAddress = (address, callback) => {

    // Encode Address to URL Form
    var encodedAddress = encodeURIComponent(address);

    // Google APIs Geocoding URL
    geo_url = "https://maps.googleapis.com/maps/api/geocode/json?address=";

    // GET Request to Google APIs
    request({
        url: geo_url + encodedAddress,
        json: true
    }, (error, response, body) => {

        // Machine Error (Client's End)
        if (error) {
            callback("Unable to Connect to Google Servers!");
        }

        // Address not Found
        else if (body.status === "ZERO_RESULTS") {
            callback("Unable to Find that Address!");
        }

        // Success
        else if (body.status === "OK") {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        }
    });
};



// Data to Export
// Exported Data is Stored in "require('<path-to-geocode.js>/geocode.js')"
module.exports.geocodeAddress = geocodeAddress;
