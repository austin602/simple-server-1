// Bring in express framework.
var express = require ('express');

// Creating an express router.
var router = express.Router ();


router.get ('/', function (request, response) {
    // Render out template and pass data to use
    // while rendering out the template.
    response.render ('posts', {
        data: {
            name: 'bob',
            value: 42,
            phrase: 'lorem ipsum...'
        }
    });
});

router.post ('/save', function (request, response) {
    // response.send (
    //     'POST was working...' + 'title: ' + request.body.title
    // );

    // Use the 'request.body' to pull data out of any
    // POST request object's data.
    console.log ('body: ', request.body);

    response.redirect ('/post');
});

router.get ('/redirect', function (request, response) {
    // When this route is hit redirect to the
    // specified route.
    response.redirect ('/about');
});



// Export the express router.
module.exports = router;
