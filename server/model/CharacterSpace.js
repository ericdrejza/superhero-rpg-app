const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const characterSpace = new Schema({
  tabs: {
    type: [
      {
        name: {
          type: String
        },
        widgets: {
          type: [
            {
              widgetType: { type: String, required: true },
              position: {
                x: Number,
                y: Number
              }
            }
          ]
        }
      }
    ]
  }
});

module.exports = mongoose.model('CharacterSpace', characterSpace);
