const { Schema, model } = require("mongoose");

const announcementSchema = new Schema({
  announcementTitle:{
    type:String,
    required:true,
    maxLength:200
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
  createdBy: {
    type: String,
    required: true,
  },
});

const Announcement = model("Announcement", announcementSchema);

module.exports = Announcement;
