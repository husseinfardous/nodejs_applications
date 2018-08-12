# Application Name

Weather

# Application Overview

This application uses the Google APIs and the Dark Sky API to get the weather for a given address.

There are two versions of this application:

1. `app.js` accomplishes the asynchronous functionality by chaining callback functions together.
2. `app-promises.js` accomplishes the asynchronous functionality by chaining promises together.

# Application Requirements

1. Node v10
2. Npm v6
3. Yargs
4. Request
5. Axios

# Application Usage

1. Run `cd <path-to-nodejs_applications>/weather`
2. Run `npm install`
3. Run `node app.js -a "<address>"` or `node app-promises.js -a "<address>"`
Example: `node app.js -a "Chalfant PA"`
Example: `node app-promises.js -a "Chalfant PA"`

# Some Application Improvements

1. Create a Graphical User Interface (GUI) so users don't have to deal with giving command line arguments.
2. Fetch more weather informaton.
3. Enable users to configure a default location.
4. Deploy the application on Heroku (Cloud Application Platform). This allows everybody to access your application without having to run it locally. 
