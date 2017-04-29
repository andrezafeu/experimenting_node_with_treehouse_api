// Require https module
const https = require('https');

function printMessage(username, badgeCount, points) {
  const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript.`;
  console.log(message);
}

function getProfile(username) {
    // Connect to the API URL (https://teamtreehouse.com/username.json)
    const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
                                // console.log('status:', response.statusCode);
                                // Read the data
                                let body = "";
                                // A data event in node.js is an end event
                                response.on('data', data => {
                                    body += data.toString();
                                });
                                // Implement end handler
                                response.on('end', () => {
                                    // Parse the data
                                    const profile = JSON.parse(body)
                                    // console.dir(profile);
                                    printMessage(username, profile.badges.length, profile.points.JavaScript)
                                });

                              });
}

// Slice the array starting on index 2. This is done to discard the first 2 args in the command line.
// For example, for the command '$ node app.js chalkers alenaholligan davemcfarland' it would discard node and app.js
const users = process.argv.slice(2);

users.forEach(getProfile);
// short form of:
// users.forEach(username => {
//     getProfile(username);
// })