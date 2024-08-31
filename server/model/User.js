const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    required: true,
    unique: true
  },
  refreshToken: String,
  username: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('User', userSchema);
