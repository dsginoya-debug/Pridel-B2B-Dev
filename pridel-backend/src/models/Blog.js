const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Blog title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  excerpt: {
    type: String,
    required: false,
    trim: true,
    maxlength: [500, 'Excerpt cannot exceed 500 characters']
  },
  content: {
    type: String,
    required: [true, 'Blog content is required']
  },
  author: {
    name: {
      type: String,
      required: true,
      default: 'Pridel Industries'
    },
    email: String,
    avatar: String
  },
  featuredImage: {
    url: String,
    alt: String
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Industry News', 'Product Updates', 'Design Trends', 'Installation Tips', 'Company News', 'Case Studies'],
    index: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft',
    index: true
  },
  publishedAt: {
    type: Date
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  readTime: {
    type: Number,
    default: 5
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  relatedProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }]
}, {
  timestamps: true
});

// Indexes for better query performance
blogSchema.index({ title: 'text', content: 'text', excerpt: 'text' });
blogSchema.index({ category: 1, status: 1 });
blogSchema.index({ publishedAt: -1 });
blogSchema.index({ slug: 1 });

// Auto-generate slug from title if not provided
blogSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  
  // Set publishedAt when status changes to published
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  
  next();
});

// Calculate read time based on content length (avg 200 words per minute)
blogSchema.pre('save', function(next) {
  if (this.isModified('content')) {
    const wordCount = this.content.split(/\s+/).length;
    this.readTime = Math.ceil(wordCount / 200);
  }
  next();
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
