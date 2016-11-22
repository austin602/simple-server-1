// Bring in express.
var express = require ('express');

// Create an express router.
var router = express.Router ();

// Define routes.
router.get ('/login', function (request, response) {
    // response.send ('You are now on the login page.');
    response.render ('login');
});

router.post ('/login', function (request, response) {
    response.send ('You have now posted to the login route.');

    // Run a query to pull the user from the database
    // using the 'username' field sent down by the
    // post data.
    db.collection ('users').findOne ({ username: request.body.username }, {}, function (error, result) {
        console.log ('This is the result of the query: ', result);
    });
});


router.get ('/reset', function (request, response) {
    response.send ('Your are no the reset page.');
})

// Exporting the router from this module.
module.exports = router;
