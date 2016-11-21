// Load in the express nodejs module.
var express = require ('express');

// Create the express server app.
var server = express ();

// Set the port that our server will run on.
var port = 3000;

// Launch the server app.
server.listen (port, function (error) {
    // Check to see if the server was unable to start up.
    if (error !== undefined) {
        console.error ('*** ERROR: Unable to start the server.');
        console.error (error);
    }
    else {
        // No errors found the server is good to go.
        console.log ('- The server has successfully started on port: ' + port);
    }
});
