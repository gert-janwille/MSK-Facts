const Schema = require(`mongoose`).Schema;


const schema = new Schema({

  projectName: {
    type: String,
    required: true,
    unique: true
  },

  made: {
    type: String,
    required: true
  },

  undertitle: {
    type: String,
    required: true
  },

  goal: {
    type: String,
    required: true
  },

  answer: {
    type: String,
    required: true
  },

  whatDid: {
    type: String,
    required: true
  },

  url: {
    type: String,
    required: true
  },

  movieTxt: {
    type: String,
    required: true
  },

  quote: {
    type: String,
    required: true
  },

  title2: {
    type: String,
    required: true
  },

  text2: {
    type: String,
    required: true
  },

  images: {
    type: String,
    required: true
  },

  color: {
    type: String,
    required: true,
    unique: true
  },

  isActive: {
    type: Boolean,
    default: true
  },

  created: {
    type: Date,
    default: Date.now
  }

});

module.exports = {schema};
