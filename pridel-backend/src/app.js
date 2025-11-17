const express = require('express');
const cors = require('cors');
const path = require('path');
// Route files
const auth = require('./routes/auth');
const users = require('./routes/users');
const products = require('./routes/products');
const inquiries = require('./routes/inquiries');
const orders = require('./routes/orders');
const blogs = require('./routes/blogs');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// Serve static files from public folder
app.use(express.static(path.join(__dirname, '../public')));
// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Pridel Industries B2B API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      products: '/api/products',
      inquiries: '/api/inquiries',
      orders: '/api/orders'
            blogs: '/api/blogs'
    }
  });
});
// Mount routers
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/products', products);
app.use('/api/inquiries', inquiries);
app.use('/api/orders', orders);
app.use('/api/blogs', blogs);
// Error handler
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({ success: false, message: err.message });
});
module.exports = app;
