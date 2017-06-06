const Schema = require(`mongoose`).Schema;

const schema = new Schema({

  name: {
    type: String,
    required: true,
    unique: true
  },

  artist: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  factMatch: {
    type: Number
  },

  tags: {
    type: [String],
    required: true
  },

  isActive: {
    type: Boolean,
    default: true
  }

});

module.exports = {schema};
