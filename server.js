// Load in the express nodejs module.
var express = require ('express');

// Create the express server app.
var server = express ();

// Set the port that our server will run on.
var port = 3000;

// Configure the render engine handlebars.
var handlebars = require ('express-handlebars');
server.engine ('.hbs', handlebars ({
    layoutsDir: 'templates',                // The directory of layout files.
    // partialsDir: 'templates/partials',      // The directory for patials files.
    defaultLayout: 'index',                 // The base / main template to always load.
    extname: '.hbs'                         // The file extension to use.
}));

// Set the default directory for express to use for
// the handlebar templates.
server.set ('views', __dirname + '/templates/partials');
// server.set ('views', __dirname + '\\templates\\partials');     // Windows OS version

// Set the render engine for our server.
server.set ('view engine', '.hbs');


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

    // Have express render out the string / text markup response
    // that will go to the client.
    response.render ('home');
});

// About route.
server.get ('/about', function (request, response) {
    response.render ('about');
});
