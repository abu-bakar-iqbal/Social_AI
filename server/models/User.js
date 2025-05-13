const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  instagramId: String,
  username: String,
  accessToken: String,
  schedules: [{ platform: String, content: String, time: Date }]
});

module.exports = mongoose.model('User', UserSchema);