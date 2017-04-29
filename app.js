const profile = require('./profile.js');

// Slice the array starting on index 2. This is done to discard the first 2 args in the command line.
// For example, for the command '$ node app.js chalkers alenaholligan davemcfarland' it would discard node and app.js
const users = process.argv.slice(2);

users.forEach(profile.get);
// short form of:
// users.forEach(username => {
//     getProfile(username);
// })