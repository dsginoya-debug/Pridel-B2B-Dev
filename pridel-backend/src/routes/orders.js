const express = require('express');
const router = express.Router();

// TODO: Add order management routes
router.get('/', (req, res) => {
  res.json({ message: 'Orders route - Coming soon' });
});

module.exports = router;
