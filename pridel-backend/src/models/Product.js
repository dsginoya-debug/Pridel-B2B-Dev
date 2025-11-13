const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Floor Drain', 'Bathroom Accessories'],
    index: true
  },
  subcategory: {
    type: String,
    required: false,
    trim: true
  },
  collection: {
    type: String,
    required: false,
    trim: true
  },
  description: {
    type: String,
    required: false,
    trim: true
  },
  specifications: {
    material: String,
    finish: String,
    size: String,
    color: String,
    thickness: String
  },
  images: [{
    url: String,
    alt: String
  }],
  features: [String],
  price: {
    mrp: {
      type: Number,
      required: false
    },
    dealerPrice: {
      type: Number,
      required: false
    },
    currency: {
      type: String,
      default: 'INR'
    }
  },
  stock: {
    available: {
      type: Boolean,
      default: true
    },
    quantity: {
      type: Number,
      default: 0
    }
  },
  sku: {
    type: String,
    unique: true,
    sparse: true
  },
  tags: [String],
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Indexes for better query performance
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1, subcategory: 1 });
productSchema.index({ collection: 1 });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
