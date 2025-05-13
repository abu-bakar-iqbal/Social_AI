const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Mock AI response for chat commands
router.post('/', async (req, res) => {
  if (!req.user) return res.status(401).json({ reply: 'Please log in' });

  const { message } = req.body;
  let reply;

  if (message.toLowerCase().includes('schedule post')) {
    // Parse mock command (e.g., "Schedule post for 5 PM")
    const timeMatch = message.match(/(\d+)\s*(PM|AM)/i);
    if (timeMatch) {
      const hour = parseInt(timeMatch[1]) + (timeMatch[2].toUpperCase() === 'PM' ? 12 : 0);
      const scheduleTime = new Date();
      scheduleTime.setHours(hour, 0, 0, 0);

      // Store schedule
      await User.findByIdAndUpdate(req.user._id, {
        $push: { schedules: { platform: 'instagram', content: 'Mock post', time: scheduleTime } }
      });
      reply = `Post scheduled for ${timeMatch[1]} ${timeMatch[2]} on Instagram`;
    } else {
      reply = 'Please specify a time (e.g., Schedule post for 5 PM)';
    }
  } else {
    reply = 'I can help schedule posts. Try: Schedule post for 5 PM';
  }

  res.json({ reply });
});

module.exports = router;