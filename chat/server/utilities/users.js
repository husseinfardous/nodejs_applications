// Users Class

// Creates a Class that Represents All Users and Provides User Operations: Add a User to a Chat Room, Remove a User from a Chat Room, Get a User, and List All Users in a Chat Room



// Users Class
class Users {

    // Constructor
    constructor() {
        this.users = [];
    }

    // Add a User
    addUser(id, name, room) {
        var user = {
            id,
            name,
            room
        };
        this.users.push(user);
        return user;
    }

    // Remove a User
    removeUser(id) {
        var user = this.getUser(id);
        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }
        return user;
    }

    // Get a User
    getUser(id) {
        return this.users.filter((user) => user.id === id)[0];
    }

    // List All Users
    getUserList(room) {
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name);
        return namesArray;
    }
}



// Data to Export
// Exported Data is Stored in "require('<path-to-users.js>/users.js')"
module.exports = {
    Users
};
