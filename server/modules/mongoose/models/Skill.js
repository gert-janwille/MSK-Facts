const Schema = require(`mongoose`).Schema;


const schema = new Schema({

  skill: {
    type: String,
    required: true,
    unique: true
  },

  type: {
    type: String,
    required: true
  },

  level: {
    type: String,
    required: true
  }

});

module.exports = {schema};
