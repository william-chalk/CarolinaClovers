const { Schema, model } = require("mongoose");
const bycrypt = require("bcrypt");

const adminSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
  },
  announcements: [
    {
      type: Schema.Types.ObjectId,
      ref: "Announcements",
    },
  ],
});

adminSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bycrypt.hash(this.password, saltRounds);
  }

  next();
});

adminSchema.methods.isCorrectPassword = async function (password) {
  return bycrypt.compare(password, this.password);
};

const Admin = model("Admin", adminSchema);

module.exports = Admin;
