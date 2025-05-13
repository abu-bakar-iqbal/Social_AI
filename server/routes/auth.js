const express = require('express');
const passport = require('passport');
const router = express.Router();

// Instagram OAuth routes (mock)
router.get('/instagram', passport.authenticate('instagram'));
router.get('/instagram/callback',
  passport.authenticate('instagram', { failureRedirect: '/login' }),
  (req, res) => res.redirect('http://localhost:3000/chat')
);

router.get('/check', (req, res) => {
  res.json({ authenticated: !!req.user });
});

module.exports = router;