// To require modules
const https = require('https');
const http = require('http');

function printError(error) {
    console.log(error.message);
}

function printMessage(username, badgeCount, points) {
  const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript.`;
  console.log(message);
}

function getProfile(username) {
    try {
        // Connect to the API URL (https://teamtreehouse.com/username.json)
        const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
                                    if (response.statusCode === 200) {
                                        // Read the data
                                        let body = "";
                                        // A data event in node.js is an end event
                                        response.on('data', data => {
                                            body += data.toString();
                                        });
                                        // Implement end handler
                                        response.on('end', () => {
                                            try {
                                                // Parse the data
                                                const profile = JSON.parse(body)
                                                // console.dir(profile);
                                                printMessage(username, profile.badges.length, profile.points.JavaScript)
                                            } catch (error) {
                                                printError(error);
                                            }
                                        });
                                    } else {
                                        const message = `There was an error getting the profile for ${username} (${http.STATUS_CODES[response.statusCode]})`;
                                        const statusCodeError = new Error(message);
                                        printError(statusCodeError);
                                    }
                                  });
        request.on('error', printError)
    } catch (error) {
        printError(error);
    }
}

// get is the name of the accessible api
module.exports.get = getProfile;