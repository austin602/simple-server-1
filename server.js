// Load in the express nodejs module.
var express = require ('express');

// Create the express server app.
var server = express ();


// view engine setup
server.set('views', __dirname + '/views');

var exphbs = require('express-handlebars');
server.engine('.hbs', exphbs({
    defaultLayout: 'index',
    extname: '.hbs'
}));
server.set('view engine', '.hbs');


// var handlebars = require ('express-handlebars');
// server.engine ('.hbs', handlebars ({
//     defaultLayout: 'index',
//     layoutsDir: 'templates',
//     extname: '.hbs'
// }));
//
// server.set ('view-engine', '.hbs');
// // server.set ('views', __dirname + '/templates');

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



//--------------------------------------------
// Set the url routes that the server can use.

// Home or root route.
server.get ('/', function (request, response) {
    // NOTE: The request object contains information about
    // the user's request (ex: their ip, headers, cookies, and params)

    // NOTE: The response object is used to send responses
    // back to the user who made the request.

    // response.send ('<h1>Hello World!</h1>');
    response.render ('home');
});
