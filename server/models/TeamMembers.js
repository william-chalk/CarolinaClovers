const { Schema, model } = require("mongoose");

const teamMemberSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  playerNumber: {
    type: String,
    required: true,
  },
  playerPosition: {
    type: String,
    required: true,
  },
});



module.exports = teamMemberSchema;
