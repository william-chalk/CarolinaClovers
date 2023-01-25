const { Schema, model } = require("mongoose");
const TeamMember = require('./TeamMembers');

const teamLeague = new Schema({
  leagueName: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  leaguePlayers: [TeamMember],
},{
  toJSON:{
    getters:true
  }
});

const League = model("League", teamLeague);

module.exports = League;
