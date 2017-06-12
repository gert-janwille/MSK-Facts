const Schema = require(`mongoose`).Schema;

const Scopes = require(`../const/Scopes`);

const schema = new Schema({

  id: {
    type: Number,
    required: true,
    unique: true
  },

  firstName: {
    type: String,
    required: true
  },

  lastName: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  foundFacts: {
    type: [String]
  },

  scope: {
    type: String,
    default: Scopes.USER
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
