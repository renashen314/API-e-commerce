// src/routes/cart.js
const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

const router = new express.Router();

// Add a product to the cart
router.post('/cart', auth, async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, products: [] });
    }

    const productIndex = cart.products.findIndex(p => p.product.equals(productId));
    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(201).send(cart);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Get the cart for the authenticated user
router.get('/cart', auth, async (req, res) => {
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId }).populate('products.product');
    if (!cart) {
      return res.status(404).send();
    }

    res.send(cart);
  } catch (e) {
    res.status(500).send();
  }
});

// Update the quantity of a product in the cart
router.patch('/cart', auth, async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).send();
    }

    const productIndex = cart.products.findIndex(p => p.product.equals(productId));
    if (productIndex > -1) {
      cart.products[productIndex].quantity = quantity;
      await cart.save();
      return res.send(cart);
    } else {
      return res.status(404).send();
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

// Remove a product from the cart
router.delete('/cart', auth, async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).send();
    }

    cart.products = cart.products.filter(p => !p.product.equals(productId));
    await cart.save();
    res.send(cart);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
