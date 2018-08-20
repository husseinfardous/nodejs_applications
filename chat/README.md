# Application Name

Chat

# Application Overview

This application uses socket.io to allow different users to chat with each other.

# Application Requirements

1. Node v10
2. Npm v6
3. Express
4. Socket.io
5. Moment.js

# Application Usage

This application is live on Heroku (Cloud Application Platform). Follow the link to use it.

[Chat Application](https://dry-beach-21835.herokuapp.com/)

To otherwise run the application locally:

1. Run `cd <path-to-nodejs_applications>/chat`
2. Run `npm install`
3. Run `node server/server.js`
4. Go to `localhost:3000`

# Some Application Improvements

1. Make room name case insensitive such that "Room A" and "room a" would be the same chat room.
2. Prevent users with the same display name from entering the same chat room.
3. Replace "Room Name" textbox with a drop down menu that contains all of the currently active chat rooms.
4. Allow users to make password-secured chat rooms.
