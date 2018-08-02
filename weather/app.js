// Weather Application

// Uses Google APIs and Dark Sky API to get the Weather for a Given Address



// Load Modules
// Data Modules Send Back (Export) isn't Manipulated
// Store Exported Data as Constants

// Third Party Modules
const yargs = require("yargs");



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



// Encode Address (Argument) to URL Form
var encodedAddress = encodeURIComponent(argv.address);
