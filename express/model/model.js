const mongoose = require("./db");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
});
const userModel = mongoose.model("user", userSchema, "user");

module.exports = {
  userModel,
};
