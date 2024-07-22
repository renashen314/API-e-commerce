const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Product'
    },
    quantity: {
      type: Number,
      required: true
    }
  }],
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  creatdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date
  }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order