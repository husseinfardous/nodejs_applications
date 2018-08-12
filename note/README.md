# Application Name

Note

# Application Overview

This application allows users to take notes by enabling them to perform simple operations on notes (such as creating a note and fetching a note).

A Note object consists of a Title and a Body.

# Application Requirements

1. Node v10
2. Npm v6
3. Lodash
4. Yargs

# Application Usage

1. Run `cd <path-to-nodejs_applications>/note`
2. Run `npm install`
3. Run `node app.js --help` to Display List of Operations
4. Run `node app.js <operation> --help` to Display List of Required Arguments for the Operation (if any)
5. Run the Application with the Operation and Required Arguments (if any)
Example: `node app.js add -t List -b Apples`

# Some Application Improvements

1. Create a Graphical User Interface (GUI) so users don't have to deal with giving command line arguments.
2. Add more note operations.
