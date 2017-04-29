// Require https module
const https = require('https');
const username = "chalkers";

function printMessage(username, badgeCount, points) {
  const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript.`;
  console.log(message);
}

// Connect to the API URL (https://teamtreehouse.com/username.json)
const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
                            console.log('status:', response.statusCode);
                            // Read the data
                            let body = "";
                            // A data event in node.js is and end event
                            response.on('data', data => {
                                body += data.toString();
                            });
                            // Implement end handler
                            response.on('end', () => {
                                console.log(body);
                            });

                          });