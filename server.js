// Load in the express nodejs module.
var express = require ('express');

// Create the express server app.
var server = express ();


// Set the public folder that can be access by any public user.
server.use (express.static ('public'));



// Make sure the body-parser has been installed (npm install body-parser --save).
// Load the body-parser module.
var bodyParser = require ('body-parser');

// Set express to use the body parser to pull the
// data out of any POST requests from the browser.
server.use (bodyParser.urlencoded ({ extended: true }));


// Load the method override so express can know what
// HTTP method other than GET and POST is being used.
var methodOverride = require ('method-override');

// Let express know that we are overriding the HTTP method
// and using the method sent in the form data.
// server.use (methodOverride ('_method', ['GET', 'POST']));

// server.use (methodOverride ('X-HTTP-Method-Override'));
server.use (methodOverride (function (request, response) {
    // Grab the request information and check to see
    // if the HTTP method was sent down as an _method value.

    console.log ('**** REQUEST BODY: ', request.body);


    // Check if the request has body content.
    if (request.body) {

        // Check if the request body is a Javascript literal object.
        if (typeof request.body === 'object') {

            // Check if the body has an '_method' property on it.
            if (request.body._method) {

                // Grab the HTTP method from the body.
                var method = request.body._method;

                // Remove the _method property from the body.
                delete request.body._method;

                // Return the actual HTTP method.
                return method;
            }
        }
    }
}, ['GET', 'POST']));



// Load in the express session handler.
var session = require ('express-session');

// Configure the session to be used by express.
server.use (session ({
    secret: 'This is my secret phrase',     // Used to hash / encrypt the session key.
    resave: false,
    saveUninitialized: true
}));


// Load in the connect-flash express middleware module.
var flash = require ('connect-flash');

// Set our server app to use the flash message object.
server.use (flash ());

// Set a global function that will be run BEFORE
// any of our routes are run.
server.use (function (request, response, next) {
    // Set the local data in the template to
    // use the user session data.
    response.locals.user = request.session.user;

    // Set the flash object to be set and used
    // before running any other routes or functions.
    response.locals.message = request.flash ();

    // Move on to the next route.
    next ();
});

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

// Connect the product routes.
var productRoutes = require ('./routes/product.js');
server.use ('/product', productRoutes);








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






// --------------------------------------------
// Sandbox for Mongoose.

// Load in the mongoose nodejs package.
var mongoose = require ('mongoose');

// Connect mongoose to the mongo db server.
mongoose.connect ('mongodb://localhost:27017/sample_database');


// // Grab the schema object from mongoose.
// var Schema = mongoose.Schema;
//
// // Create a schema for the User.
// var userSchema = new Schema ({
//     username: String,
//     password: String
// });
//
// // Take the user schema object and create a
// // user model object for working with the
// // mongodb.
// var User = mongoose.model ('User', userSchema);
