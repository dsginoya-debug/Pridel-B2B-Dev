const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// @route   GET /api/blogs
// @desc    Get all published blogs with pagination, filtering, and search
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      tag,
      search,
      featured,
      sort = '-publishedAt'
    } = req.query;

    const query = { status: 'published' };

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by tag
    if (tag) {
      query.tags = tag;
    }

    // Filter featured blogs
    if (featured === 'true') {
      query.isFeatured = true;
    }

    // Search in title, excerpt, and content
    if (search) {
      query.$text = { $search: search };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const blogs = await Blog.find(query)
      .select('-content') // Exclude full content for list view
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('relatedProducts', 'name category images');

    const total = await Blog.countDocuments(query);

    res.json({
      success: true,
      data: blogs,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blogs',
      error: error.message
    });
  }
});

// @route   GET /api/blogs/categories
// @desc    Get all blog categories with count
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    const categories = await Blog.aggregate([
      { $match: { status: 'published' } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: categories.map(cat => ({
        name: cat._id,
        count: cat.count
      }))
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
});

// @route   GET /api/blogs/featured
// @desc    Get featured blogs
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const { limit = 3 } = req.query;

    const blogs = await Blog.find({
      status: 'published',
      isFeatured: true
    })
      .select('-content')
      .sort('-publishedAt')
      .limit(parseInt(limit));

    res.json({
      success: true,
      data: blogs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching featured blogs',
      error: error.message
    });
  }
});

// @route   GET /api/blogs/:slug
// @desc    Get single blog by slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({
      slug: req.params.slug,
      status: 'published'
    }).populate('relatedProducts', 'name category images price');

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    // Increment view count
    blog.views += 1;
    await blog.save();

    res.json({
      success: true,
      data: blog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blog',
      error: error.message
    });
  }
});

// @route   POST /api/blogs
// @desc    Create a new blog (Admin only)
// @access  Private
router.post('/', async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      data: blog
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating blog',
      error: error.message
    });
  }
});

// @route   PUT /api/blogs/:id
// @desc    Update blog (Admin only)
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    res.json({
      success: true,
      message: 'Blog updated successfully',
      data: blog
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating blog',
      error: error.message
    });
  }
});

// @route   DELETE /api/blogs/:id
// @desc    Delete blog (Admin only)
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    res.json({
      success: true,
      message: 'Blog deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting blog',
      error: error.message
    });
  }
});

// @route   POST /api/blogs/:id/like
// @desc    Like a blog post
// @access  Public
router.post('/:id/like', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    blog.likes += 1;
    await blog.save();

    res.json({
      success: true,
      message: 'Blog liked',
      likes: blog.likes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error liking blog',
      error: error.message
    });
  }
});

module.exports = router;
