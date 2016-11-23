// Bring in express.
var express = require ('express');

// Create an express router.
var router = express.Router ();

// Define routes.
router.get ('/login', function (request, response) {
    // response.send ('You are now on the login page.');

    // Check to see if the user session exists and
    // the user is defined.
    if (request.session.user) {
        // Redirect user to the dashboard.
        response.redirect ('/user/dashboard');
    }
    else {
        // Show the login template page.
        response.render ('login');
    }
});

router.post ('/login', function (request, response) {
    // response.send ('You have now posted to the login route.');

    // Run a query to pull the user from the database
    // using the 'username' field sent down by the
    // post data.
    db.collection ('users').findOne (
        // The filter or fields to search by.
        {
            username: request.body.username,
            password: request.body.password
        },

        // Additional query options.
        {},

        // Callback function.
        function (error, result) {

            // Check for errors.
            if (error) {
                console.error ('*** ERROR: Problem finding the user.');
                console.error (error);
                response.send ('There was an error with the page.');
            }
            else if (!result) {
                // The query was run but did NOT find a matching
                // object
                request.flash ('error', 'Your username or password is not correct');
                response.redirect ('/user/login');
                // response.send ('Your username or password is NOT correct.');

                console.log ('*** TEST: ', request);
            }
            else {
                // Save the user to the session.
                console.log ('This is the found user: ', result);

                request.session.user = {
                    username: result.username,
                    email: result.email
                }

                console.log ('This is the session data: ', request.session);

                // The query was run and DID find a matching object.
                // response.send ('Found the user by the name: ' + result.username);
                response.redirect ('/user/dashboard');
            }

            // console.log ('This is the result of the query: ', result);
        }
    );
});


router.get ('/register', function (request, response) {
    response.render ('register');
});

router.post ('/register', function (request, response) {

    db.collection ('users').insertOne (
        // Data to save to collection.
        {
            username: request.body.username,
            password: request.body.password,
            email: request.body.email
        },

        // The callback function to run once the save is complete.
        function (error, result) {
            // Check for an error.
            if (error) {
                console.error ('*** ERROR: Unable to register user.');
                response.send ('Server error, unable to register user.');
            }
            else {
                // Redirect to the login page.
                response.redirect ('/user/login');
            }
        }
    )
});


router.get ('/reset', function (request, response) {
    response.send ('Your are no the reset page.');
});


router.get ('/dashboard', function (request, response) {
    // response.send ('You are now on the dashboard page.');

    console.log ('session: ', request.session);

    response.render ('dashboard', {
        data: {
            // Pass the session user to the template for
            // rendering the user information.
            user: request.session.user
        }
    });
});

router.get ('/logout', function (request, response) {
    request.session.destroy ();
    response.redirect ('/user/login');
});

// Exporting the router from this module.
module.exports = router;
