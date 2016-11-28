// Bring in express.
var express = require ('express');

// Create an express router.
var router = express.Router ();

// Load the Product schema object.
var Product = require ('../model/product.js');

// Show the product creation form.
router.get ('/create', function (request, response) {
    // response.send ('This is the product creation page.');
    response.render ('product/edit');
});

// Post to create a product.
router.post ('/', function (request, response) {
    var newProduct = Product ({
        name: request.body.name,
        description: request.body.description,
        price: request.body.price,
        imageUrl: request.body.imageUrl
    });

    newProduct.save (function (error) {
        // Check for errors.
        if (error) {
            var errorMessage = 'Unable to save the user to the page.';
            console.error ('*** ERROR: ' + errorMessage);
            response.send (errorMessage);
        }
        else {
            // Add a flash message of our success.
            request.flash ('success', 'Product was created.');

            // Redirect back to the product create page.
            response.redirect ('/product/create');
        }
    });
    // response.send ('This is where products are saved.');
});

// Route to view my products.
router.get ('/', function (request, response) {

    Product.find ({}, function (error, result) {
        if (error) {
            var errorMessage = 'Unable to load products.';
            console.error ('*** ERROR: ' + errorMessage);
            response.send (errorMessage);
        }
        else {
            console.log ('**** RESULT: ', result);
            response.render ('product/view', {
                data: {
                    productList: result
                }
            });
        }
    });

    // response.render ('product/view');
    // response.send ('This is where we view products.');
});

// Export the router for use outside of module.
module.exports = router;
