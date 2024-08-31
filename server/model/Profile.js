const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  characters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }],
  collections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Collection' }],
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  profilePic: { type: String },
  isPrivate: Boolean
});

module.exports = mongoose.model('Profile', profileSchema);
