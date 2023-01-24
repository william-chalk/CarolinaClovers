const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const announcementSchema = new Schema({
  announcementTitle: {
    type: String,
    required: true,
    maxLength: 200,
  },
  announcementBody: {
    type: String,
    required: true,
    maxLength: 240,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const Announcements = model("Announcements", announcementSchema);

module.exports = Announcements;
