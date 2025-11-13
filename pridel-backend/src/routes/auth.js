const express = require('express');
const router = express.Router();

// TODO: Add authentication routes
router.get('/', (req, res) => {
  res.json({ message: 'Auth route - Coming soon' });
});

module.exports = router;
