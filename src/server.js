
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config()

const app = express()

const Product = require("./models/Product")
const userRoutes = require('./routes/userRoutes');

app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false })) //allow form interfece edit

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.set("strictQuery", false)
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('connected to mongoDB')
    app.listen(PORT, () => {
      console.log("node api app is running on port 3000")
    })
  }).catch(error => {
    console.log(error)
  })


// declare routes
app.get('/', (req, res) => {
  res.send('hello node api')
})

app.use('/api/users', userRoutes)

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})
app.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findById(id);
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.post('/products', async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(200).json(product)
  } catch (error) {
    console.log(error.messgae);
    res.status(500).json({ message: error.message })
  }
})

app.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findByIdAndUpdate(id, req.body);
    //connot find id
    if (!product) {
      return res.status(404).json({ message: `cannot find any product with ID ${id}` })
    }
    const updatedProduct = await Product.findById(id)
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error.messgae);
    res.status(500).json({ message: error.message })
  }
})
app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findByIdAndDelete(id);
    //connot find id
    if (!product) {
      return res.status(404).json({ message: `cannot find any product with ID ${id}` })
    }
    res.status(200).json(product);
  } catch (error) {
    console.log(error.messgae);
    res.status(500).json({ message: error.message })
  }
})




