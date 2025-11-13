const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET all products with filtering, sorting, and pagination
router.get('/', async (req, res) => {
  try {
    const { 
      category, 
      subcategory, 
      collection, 
      search, 
      sortBy = 'createdAt', 
      order = 'desc', 
      page = 1, 
      limit = 20,
      isActive = 'true'
    } = req.query;

    // Build query object
    const query = {};
    
    if (category) query.category = category;
    if (subcategory) query.subcategory = subcategory;
    if (collection) query.collection = collection;
    if (isActive) query.isActive = isActive === 'true';
    
    // Text search
    if (search) {
      query.$text = { $search: search };
    }

    // Sorting
    const sortOptions = {};
    sortOptions[sortBy] = order === 'asc' ? 1 : -1;

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const products = await Product.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      data: products,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching products', 
      error: error.message 
    });
  }
});

// GET single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found' 
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching product', 
      error: error.message 
    });
  }
});

// GET products by category
router.get('/category/:category', async (req, res) => {
  try {
    const products = await Product.find({ 
      category: req.params.category,
      isActive: true 
    });

    res.json({
      success: true,
      data: products,
      count: products.length
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching products by category', 
      error: error.message 
    });
  }
});

// GET products by collection
router.get('/collection/:collection', async (req, res) => {
  try {
    const products = await Product.find({ 
      collection: req.params.collection,
      isActive: true 
    });

    res.json({
      success: true,
      data: products,
      count: products.length
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching products by collection', 
      error: error.message 
    });
  }
});

// POST create new product (admin only)
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: 'Error creating product', 
      error: error.message 
    });
  }
});

// PUT update product (admin only)
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found' 
      });
    }

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: 'Error updating product', 
      error: error.message 
    });
  }
});

// DELETE product (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found' 
      });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting product', 
      error: error.message 
    });
  }
});

// GET featured products
router.get('/featured/list', async (req, res) => {
  try {
    const products = await Product.find({ 
      isFeatured: true,
      isActive: true 
    }).limit(10);

    res.json({
      success: true,
      data: products,
      count: products.length
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching featured products', 
      error: error.message 
    });
  }
});

module.exports = router;
