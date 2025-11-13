const express = require('express');
const router = express.Router();

// TODO: Add product management routes
router.get('/', (req, res) => {
  res.json({ message: 'Products route - Coming soon' });
});

module.exports = router;
