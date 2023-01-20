const { Schema, model } = require("mongoose");
const bycrypt = require("bcrypt");

const userSchema = new Schema({
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
  role:{
    type:String,
    default:"user"
  },
  announcements: [
    {
      type: Schema.Types.ObjectId,
      ref: "Announcements",
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bycrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bycrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
