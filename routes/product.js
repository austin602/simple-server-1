// Bring in express.
var express = require ('express');

// Create an express router.
var router = express.Router ();

// Load the Product schema object.
var Product = require ('../model/product.js');

// Show the product creation form.
router.get ('/create', function (request, response) {
    // response.send ('This is the product creation page.');
    response.render ('product/edit', {
        data: {
            title: 'Create Product',
            method: 'POST'
        }
    });
});

// Post to create a product.
router.post ('/', function (request, response) {
    // var newProduct = Product ({
    //     name: request.body.name,
    //     description: request.body.description,
    //     price: request.body.price,
    //     imageUrl: request.body.imageUrl
    // });
    //
    // if (request.sendJson) {
    //     console.log ('**** product save body: ', request.body);
    //     response.json ({
    //         message: 'Product saved.'
    //     });
    //     return;
    // }

    // Create a new product from the data sent
    // down by form or API post.
    var newProduct = Product (request.body);

    newProduct.save (function (error) {
        // Check for errors.
        if (error) {
            var errorMessage = 'Unable to save the user to the page.';
            console.error ('*** ERROR: ' + errorMessage);
            response.send (errorMessage);
        }
        else {
            if (request.sendJson) {
                response.json ({
                    message: 'New product was saved.'
                });
            }
            else {
                // Add a flash message of our success.
                request.flash ('success', 'Product was created.');

                // Redirect back to the product create page.
                response.redirect ('/product/create');
            }
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

            // Check to see if we need to reply with a JSON object.
            if (request.sendJson) {
                // Respond with a JSON object of
                // the result from the database query.
                response.json (result);
            }
            else {
                // Respond with HTML markup.
                console.log ('**** RESULT: ', result);
                response.render ('product/list', {
                    data: {
                        productList: result
                    }
                });
            }
        }
    });

    // response.render ('product/view');
    // response.send ('This is where we view products.');
});

// Route to grab a specific item by it's id.
router.get ('/:id', function (request, response) {
    // Grab the product id by the ':id' value in the url path.
    var productId = request.params.id;

    // Run a query for our product by an id.
    Product.findById (productId, function (error, result) {
        if (error) {
            var errorMessage = 'Unable to find product by id: ' + productId;
            console.error ('*** ERROR: ' + errorMessage);
            response.send (errorMessage);
        }
        else {
            response.render ('product/view', {
                data: {
                    product: result
                }
            });
        }
    });
    // response.send ('This is the specific product: ' + request.params.id);
});

// Create a route to show the product's edit form.
router.get ('/:id/edit', function (request, response) {
    // Grab the product id by the ':id' value in the url path.
    var productId = request.params.id;

    // Run a query for our product by an id.
    Product.findById (productId, function (error, result) {
        if (error) {
            var errorMessage = 'Unable to find product by id: ' + productId;
            console.error ('*** ERROR: ' + errorMessage);
            response.send (errorMessage);
        }
        else {
            response.render ('product/edit', {
                data: {
                    title: 'Edit Product',
                    method: 'PUT',
                    product: result
                }
            });
        }
    });
})

// Create a route to handle updating an existing product.
router.put ('/:id', function (request, response) {
    var productId = request.params.id;

    Product.findByIdAndUpdate (
        // id to search by
        productId,

        // What needs to be udpdated.
        request.body,

        // Callback function.
        function (error, result) {
            if (error) {
                // ... Error goes here...
            }
            else {
                if (request.sendJson) {
                    response.json ({
                        message: 'Product was updated.'
                    });
                }
                else {
                    // response.send ('The product has been updated: ' + productId);

                    // Redirect back to the specific product so we
                    // can confirm the changes to the product.
                    response.redirect ('/product/' + productId);
                }
            }
        }
    );
});

// Create a route to delete a product by id.
router.get ('/:id/delete', function (request, response) {
    // response.send ('The product was deleted.');
    var productId = request.params.id;

    Product.findByIdAndRemove (productId, function (error, result) {
        if (error) {
            // ...
        }
        else {
            response.redirect ('/product');
        }
    })
});

// Create a route to delete a product by id.
router.delete ('/:id', function (request, response) {
    response.send ('The product was deleted with _method.');
});

// Export the router for use outside of module.
module.exports = router;
