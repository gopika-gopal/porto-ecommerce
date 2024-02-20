const mongoose = require('mongoose');

// Define the order schema
const addToCartSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true
  },
  description: {
    type: String, 
    required: true
  },
  image: {
    type: String, 
    required: true
  },
  quantity: {
    type: Number, 
    required: true
  },
  price: {
    type: Number, 
    required: true
  },
  size: {
    type: String, 
    required: true
  },
  totalAmount: {
    type: Number, 
    required: true
  },
  isItemCheckout: {
    type: Boolean, 
    required: true
  },
  isDeleted: {
    type: Boolean, 
    required: true
  },
  isWishlisted: {
    type: Boolean, 
    required: true
  },
  userEmail: {
    type: String, 
    required: true
  },
 
  // Add other fields as needed
});

// Create the Order model
const cart = mongoose.model("addToCartItem", addToCartSchema);

// Export the model
module.exports = cart;
