const express = require('express');
const cors = require('cors');
// Route files
const auth = require('./routes/auth');
const users = require('./routes/users');
const products = require('./routes/products');
const inquiries = require('./routes/inquiries');
const orders = require('./routes/orders');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
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
    }
  });
});
// Mount routers
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/products', products);
app.use('/api/inquiries', inquiries);
app.use('/api/orders', orders);
// Error handler
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({ success: false, message: err.message });
});
module.exports = app;
