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



// Load in the express session handler.
var session = require ('express-session');

// Configure the session to be used by express.
server.use (session ({
    secret: 'This is my secret phrase',     // Used to hash / encrypt the session key.
    resave: false,
    saveUninitialized: true
}));

// Set a global function that will be run BEFORE
// any of our routes are run.
server.use (function (request, response, next) {
    // Set the local data in the template to
    // use the user session data.
    response.locals.user = request.session.user;
    response.locals.message = request.session.flash;

    console.log ('**** FLASH: ', response.locals.message);

    // Move on to the next route. ****
    next ();

    // console.log ('Next object: ', next);
});

// Load in the connect-flash express middleware module.
var flash = require ('connect-flash');

server.use (flash ());

// server.use (function (request, response, next) {
//     // request.locals.messages =
//
//     console.log ('**** MESSAGE: ', require ('express-messages') (request, response))
//
//     next ();
// });

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


// Bring in the MongoDB client driver and
// connect to the database.
var mongoClient = require ('mongodb').MongoClient;

// Create a reference to the database.
global.db;

// Create a connection to the database.
mongoClient.connect ('mongodb://localhost:27017/sample_database', function (error, database) {
    // Check if there was an error connecting to the database.
    if (error) {
        console.error ('*** ERROR: Unable to connect to the mongo database.');
        console.error (error);
    }
    else {
        // Go ahead and start the server app.
        // Launch the server app.
        server.listen (port, function (error) {
            // Check to see if the server was unable to start up.
            if (error !== undefined) {
                console.error ('*** ERROR: Unable to start the server.');
                console.error (error);
            }
            else {
                // Link to the database reference.
                db = database;

                // No errors found the server is good to go.
                console.log ('- The server has successfully started on port: ' + port);
            }
        });
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


// Connect the user routes.
var userRoutes = require ('./routes/user.js');
server.use ('/user', userRoutes);










// Test a database query.
server.get ('/test', function (request, response) {

    // Pull a set of test users from the database.
    // db.collection ('users').find ({ username: 'ronbravo' }).toArray (function (error, result) {
    //     console.log ('This is the result of the query: ', result);
    // });

    db.collection ('users').findOne ({ username: 'ronbravo' }, {}, function (error, result) {
        console.log ('This is the result of the query: ', result);
    });

    response.send ('db test was run.');
});
