const { Schema, model } = require("mongoose");
const teamMemberSchema = require('./TeamMembers');

const teamLeague = new Schema(
  {
    leagueName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    leaguePlayers: {
      type: Schema.Types.ObjectId,
      ref: "TeamMember",
    },
  },
  leaguePlayers:[teamMemberSchema]
});

teamLeague.virtual('playerCount').get(function(){
  return this.leaguePlayers.length;
})

const League = model("League", teamLeague);

module.exports = League;
