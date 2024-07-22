const express = require('express');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');

const router = new express.Router()

//place new order
router.post('/order', auth, async (req, res) => {
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId }).populate('products.product')
    if (!cart) {
      return res.status(400).send({ message: 'Cart is empty' })
    }
    const order = new Order({
      user: userId,
      products: cart.products,
      totalPrice: cart.products.reduce((total, item) => total + item.product.price * item.quantity, 0)
    })
    await order.save()
    await Cart.deleteOne({ user: userId });
    res.status(201).send(order)
  } catch (error) {
    res.status(500).send(error)
  }
})

//get all order from a user
router.get('/order', auth, async (req, res) => {
  const userId = req.user._id
  try {
    const orders = Order.findOne({ user: userId }).populate('products.product')
    res.send(orders)
  } catch (error) {
    res.status(500).send(error)
  }
})

//get ONE order by id
router.get('/order/:id', auth, async (req, res) => {
  const { id } = req.params;
  const userId = req.user_id
  try {
    const order = await Order.findOne({ _id: id, user: userId }).populate('products.product')
    if (!order) {
      return res.status(404).send()
    }
    res.send(order)
  } catch (error) {
    res.status(500).send(error)
  }
})

//update ONE order status
router.patch('/order/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body
  const userId = req.user._id

  const validStatuses = ['Pending', 'Shipped', 'Delivered', 'Cancelled']
  if (!validStatuses.includes(status)) {
    return res.status(400).send({ message: 'Invalid status' })
  }

  try {
    const order = await Order.findOne({ _id: id, user: userId })
    if (!order) {
      return res.status(404).send()
    }
    order.status = status
    order.updatedAt = new Date()
    await order.save()
    res.send(order)
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = router