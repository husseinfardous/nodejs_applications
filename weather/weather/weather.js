// Weather Retriever

// Fetches Weather for a Given Latitude and Longitude Coordinate



// Load Module
// Data Module Sends Back (Exports) isn't Manipulated
// Store Exported Data as a Constant

// Third Party Module
const request = require("request");



// Fetch Weather for a Given Latitude and Longitude Coordinate
var getWeather = (lat, lng, callback) => {

    // Dark Sky API Secret Key
    var secret_key = "8735271af845feafbd5bc5dd23d6dc00";

    // Dark Sky API Fetching Weather URL
    var weather_url = "https://api.darksky.net/forecast/" + secret_key + "/";

    // GET Request to Dark Sky API
    request({
        url: weather_url + lat + "," + lng,
        json: true
    }, (error, response, body) => {

        // Success
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        }

        // Handle Errors: Machine Error (Can't Connect to Dark Sky Server) or Invalid Request
        else {
            callback("Unable to Fetch the Weather!");
        }
    });
};



// Data to Export
// Exported Data is Stored in "require('<path-to-weather.js>/weather.js')"
module.exports.getWeather = getWeather;
