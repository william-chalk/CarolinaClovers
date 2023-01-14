const { Schema, model } = require("mongoose");

const teamLeague = new Schema({
  leagueName: {
    type: String,
    required: true,
    trim: true,
  },
  leaguePlayers: {
    type: Schema.Types.ObjectId,
    ref: "TeamMember",
  },
});

const League = model("League", teamLeague);

module.exports = League;
