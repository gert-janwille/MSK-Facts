const Schema = require(`mongoose`).Schema;

const schema = new Schema({

  fact: {
    type: String,
    required: true
  },

  artworkMatch: {
    type: String
  },

  tags: {
    type: [String],
    required: true
  },

  isActive: {
    type: Boolean,
    default: true
  }

}, {

  timestamps: {
    createdAt: `created`,
    updatedAt: `modified`
  }

});

module.exports = {schema};
