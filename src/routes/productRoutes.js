const express = require('express')
const { createProduct, getProducts, getProductById, updateProduct, deleteProduct } = require('../contorllers/productController')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()
router.post('/', authMiddleware, createProduct)
router.get('/', getProducts)
router.get('/:id', getProductById)
router.put('/:id', authMiddleware, updateProduct)
router.delete('/:id', authMiddleware, deleteProduct)

module.exports = router