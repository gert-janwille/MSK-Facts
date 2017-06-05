const Schema = require(`mongoose`).Schema;

const schema = new Schema({

  fact: {
    type: String,
    required: true
  },

  artworkMatch: {
    type: String
  },

  isActive: {
    type: Boolean,
    default: true
  }

});

module.exports = {schema};
