// Pull in express to make use of the framework.
var express = require ('express');

// Grab the url router from express.
// Use this object to attach additional routes
// for our express server app.
var router = express.Router ();


// Home or root route.
router.get ('/', function (request, response) {
    // NOTE: The request object contains information about
    // the user's request (ex: their ip, headers, cookies, and params)

    // NOTE: The response object is used to send responses
    // back to the user who made the request.

    // Response.send will send to the browser what
    // response.send ('<h1>Hello World!</h1>');

    // Have express render out the string / text markup response
    // that will go to the client. Specify the template to use.
    response.render ('home');
});

// About route.
router.get ('/about', function (request, response) {
    response.render ('about');
});

// Contact route.
router.get ('/contact', function (request, response) {
    response.render ('contact');
});

// FAQ route.
router.get ('/faq', function (request, response) {
    response.render ('faq');
});

// ---------------------------------------
// Route to load the Angular UI Frontend.
router.get ('/angular', function (request, response) {
    // Load the angular home partial.
    response.render ('angular/home', {
        // Override the default index.hbs and
        // use the index-angular.hbs
        layout: 'index-angular'
    });
});

// ---------------------------------------
// Route to load the React UI Frontend.
router.get ('/react', function (request, response) {
    // Load the react home partial.
    response.render ('react/home', {
        // Override the default index.hbs and
        // use the index-react.hbs
        layout: 'index-react'
    });
});



// Export the route from this file that is seen
// by NodeJs as it's own module.
module.exports = router;
