const express = require('express');
const router = express.Router();

// TODO: Add user management routes
router.get('/', (req, res) => {
  res.json({ message: 'Users route - Coming soon' });
});

module.exports = router;
