// Load in the express nodejs module.
var express = require ('express');

// Create the express server app.
var server = express ();


// Make sure the body-parser has been installed (npm install body-parser --save).
// Load the body-parser module.
var bodyParser = require ('body-parser');

// Set express to use the body parser to pull the
// data out of any POST requests from the browser.
server.use (bodyParser.urlencoded ({ extended: true })); 

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

// Import in the routes to use.
var basicRoutes = require ('./routes/basic.js');

// Set our server to use the imported routes.
server.use ('/', basicRoutes);



// Connect the post routes.
var postRoutes = require ('./routes/posts.js');
server.use ('/post', postRoutes);
