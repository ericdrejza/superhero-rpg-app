const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collectionSchema = new Schema({
  characters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }],
  collections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Collection' }],
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Collection', collectionSchema);
