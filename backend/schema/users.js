const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  uname: {
    type: String,
    required: true,
  },
  headline: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    required: true,
  },
  pass: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  bgImg: {
    type: String,
    default: "",
  },
  profileImg: {
    type: String,
    default: "",
  },
  followers: {
    type: Object,
    default: [],
  },
  following: {
    type: Object,
    default: [],
  },
  networks: {
    type: Object,
    default: [],
  },
  hashtag: {
    type: Object,
    default: [],
  },
  networkReqs: {
    type: Object,
    default: [],
  },
  sendReqs: {
    type: Object,
    default: []
  }
});

module.exports = mongoose.model("User", userSchema);
