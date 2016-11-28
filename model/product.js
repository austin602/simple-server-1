// Load in the mongoose nodejs package.
var mongoose = require ('mongoose');

// Grab the schema object from mongooese.
var Schema = mongoose.Schema;

// Create the model schema.
var productSchema = new Schema ({
    name: String,
    description: String,
    price: Number,
    imageUrl: String
});

// Create the model object.
var Product = mongoose.model ('Product', productSchema);

// Make the model object available to other NodeJs modules.
module.exports = Product;
