// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes')
const cartRoutes = require('./routes/cartRoutes')
const orderRoutes = require('./routes/orderRoutes')

const app = express();

// Middleware
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false })) //allow form interfece edit

// Routes
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api', cartRoutes)
app.use('/api/orders', orderRoutes)

// Default Route
app.get('/', (req, res) => {
  res.send('hello node api')
})

module.exports = app;
