const Product = require('../models/Product')

exports.createProduct = async (req, res) => {
  try {
    const { name, quantity, price, description, category, image } = req.body
    const product = new Product({ name, quantity, price, description, category, image })
    await product.save()
    res.status(201).json(product)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).json(products)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.param.id)
    if (!product) return res.status(404).json({ message: "Product not found" })
    res.status(200).json(product)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.param.id, req.body, { new: true })
    if (!product) return res.status(404).json({ message: "Product not found" })
    res.status(200).json(product)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.param.id)
    if (!product) return res.status(404).json({ message: "Product not found" })
    res.status(200).json({ message: "Product deleted successfully" })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}