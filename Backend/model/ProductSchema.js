const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  // Add other fields as needed
});

// Create the Product model
const product = mongoose.model("product", productSchema);

// Export the model
module.exports = product;
