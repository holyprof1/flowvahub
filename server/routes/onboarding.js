const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT
function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: 'Access denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' });
  }
}

// POST /api/onboarding
router.post('/', authenticate, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.userId, { onboarding: req.body });
    res.status(200).json({ message: 'Onboarding data saved' });
  } catch (err) {
    res.status(500).json({ error: 'Saving failed' });
  }
});

module.exports = router;