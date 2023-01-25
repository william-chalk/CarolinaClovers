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
  playerLeague: {
    type: Schema.Types.ObjectId,
    ref: "League",
  },
},{
  toJSON:{
    getters:true
  }
});

const TeamMember = model("TeamMember", teamMemberSchema);

module.exports = TeamMember;
