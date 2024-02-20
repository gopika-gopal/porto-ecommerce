const mongoose = require('mongoose');

// Define the order schema
const orderSchema = new mongoose.Schema({
    userId: {
    type: String, 
    required: true
  },
  areaStreet: {
    type: String, 
    required: true
  },
  flatHouseApt: {
    type: String, 
    required: true
  },
  landmark: {
    type: String, 
  },
  country: {
    type: String, 
    required: true
  },
  stateProvince: {
    type: String, 
    required: true
  },
  zipCode: {
    type: String, 
    required: true
  },
  flatRate: {
    type: Boolean, 
  },
  bestRate: {
    type: Boolean, 
  },
    subTotal: {
    type: Number, 
    required: true
  },
  totalTax: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },


  orderItems: [{
    userEmail: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    size: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    totalAmount: {
      type: Number,
      required: true
    },
  }],
 
  // Add other fields as needed
});

// Create the Order model
const order = mongoose.model("order", orderSchema);

// Export the model
module.exports = order;
