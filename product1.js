const express = require('express');
const router = express.Router();
const prodb = require('../models/product');
// Get a product by ID
router.get('/api/product/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const product = await prodb.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new product
router.post('/api/product/resinformations', async (req, res) => {
    const { name, description, price, category, brand, rating, inStock } = req.body;

    // Validate input here (e.g., use Joi or express-validator)

    try {
        const newProduct = new prodb({
            name,
            description,
            price,
            category,
            brand,
            rating,
            inStock,
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a product by ID
router.put('/api/product/:id', async (req, res) => {
    const id = req.params.id;
    const { name, description, price, category, brand, rating, inStock } = req.body;

    try {
        const updatedProduct = await prodb.findByIdAndUpdate(
            id,
            { name, description, price, category, brand, rating, inStock },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a product by ID
router.delete('/api/product/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const deletedProduct = await prodb.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
