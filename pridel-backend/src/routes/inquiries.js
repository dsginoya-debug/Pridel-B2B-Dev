const express = require('express');
const router = express.Router();

// TODO: Add inquiry management routes
router.get('/', (req, res) => {
  res.json({ message: 'Inquiries route - Coming soon' });
});

module.exports = router;
