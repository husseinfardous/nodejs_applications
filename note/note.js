// Note Operations

// Add, Remove, List



// Load Module
// Data Module Sends Back (Exports) isn't Manipulated
// Store Exported Data as a Constant

// Core Module
const fs = require("fs");



// Note Helper Functions

// Save Notes by Writing to "notes-data.json" File
var saveNotes = (notes) => {
    fs.writeFileSync("notes-data.json", JSON.stringify(notes));
};

// Fetch all Existing Notes
var fetchNotes = () => {
    
    // Fetch all Existing Notes
    // Error is Generated if "notes-data.json" File doesn't Exist
    try {
        var notesString = fs.readFileSync("notes-data.json");
        return JSON.parse(notesString);
    }
    
    // Catch the Generated Error
    // No Existing Notes
    catch(err) {
        return [];
    }
};



// Note Operations

// Add a Note
var addNote = (title, body) => {

    // Fetch all Existing Notes
    // Existing Data is Lost by Writing to the "notes-data.json" File
    // Prevent Loss of Existing Notes by Storing them
    var notes = fetchNotes();

    // Create a Note
    var note = {
        title,
        body
    };
    


    // Store Duplicate Notes
    // Duplicate Notes are Notes that have the Same Title
    var duplicateNotes = notes.filter((note) => note.title === title);

    // Add Note to the Notes Array if not Duplicate
    // Write Notes in the Array to "notes-data.json" File if not Duplicate
    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

// Remove a Note
var removeNote = (title) => {

    // Fetch all Existing Notes
    // Existing Data is Lost by Writing to the "notes-data.json" File
    // Prevent Loss of Existing Notes by Storing them
    var notes = fetchNotes();
    
    // Store Notes that don't have the Title of Target Note
    var filteredNotes = notes.filter((note) => note.title !== title);

    // Write Notes in the Filtered Array to "notes-data.json" File
    saveNotes(filteredNotes);

    // Verify if Note was Removed
    return notes.length !== filteredNotes.length;
};



// Data to Export
// Exported Data is Stored in "require('<path-to-note.js>/note.js')"
module.exports = {
    addNote,
    removeNote
};
