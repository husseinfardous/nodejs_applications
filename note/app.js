// Note Application

// Allows Users to Take Notes
// Enables Users to Perform Simple Operations on Notes (such as Creating a Note and Fetching Notes)



// Load Modules
// Data Modules Send Back (Export) isn't Manipulated
// Store Exported Data as Constants

// Core Modules
const fs = require("fs");

// Third Party Modules
const _ = require("lodash");
const yargs = require("yargs");

// Local Modules
const note = require("./note.js");



// Fetch Command Line Arguments
const argv = yargs.argv;

// Fetch Operation
var operation = argv._[0]



// Note Operations

// Add a Note
if (operation === "add") {
    var newNote = note.addNote(argv.title, argv.body);
    if (newNote) {
        console.log("New Note Created!");
        note.logNote(newNote);
    }
    else {
        console.log("Note Title is Taken!");
    }
}

// Remove a Note
else if (operation === "remove") {
    var noteRemoved = note.removeNote(argv.title);
    var message = noteRemoved ? "Note was Removed!": "Note not Found!";
    console.log(message);
}

// Get a Note
else if (operation === "get") {
    var targetNote = note.getNote(argv.title);
    if (targetNote) {
        console.log("Note Found!");
        note.logNote(targetNote);
    }
    else {
        console.log("Note not Found!");
    }
}
