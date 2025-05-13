const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

// Mock analytics and trigger automation
router.get('/analytics', (req, res) => {
  if (!req.user) return res.status(401).json({ error: 'Please log in' });

  // Mock analytics data
  res.json({
    labels: ['Jan', 'Feb', 'Mar'],
    likes: [100, 150, 200],
    impressions: [500, 700, 900]
  });
});

router.post('/schedule', async (req, res) => {
  if (!req.user) return res.status(401).json({ error: 'Please log in' });

  // Trigger Python script for automation
  try {
    await execPromise('python scripts/instagram.py');
    res.json({ message: 'Automation triggered' });
  } catch (err) {
    res.status(500).json({ error: 'Automation failed' });
  }
});

module.exports = router;