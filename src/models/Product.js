const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a product name"]
    },
    quantity: {
      type: Number,
      required: true,
      default: 0
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: false
    }
  },
  {
    //track when data is saved or modified
    timestamps: true,
  }
)

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
