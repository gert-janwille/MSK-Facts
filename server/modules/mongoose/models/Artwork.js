const Schema = require(`mongoose`).Schema;

const schema = new Schema({

  name: {
    type: String,
    required: true
  },

  artist: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  keywords: {
    type: String,
    required: true
  },

  isActive: {
    type: Boolean,
    default: true
  }

});

module.exports = {schema};
