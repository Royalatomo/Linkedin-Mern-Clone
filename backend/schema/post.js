const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },

  posts: {
    type: Object,
    default: [],
  },

  comments: {
    type: Object,
    default: [],
  },

  actions: {
    type: Object,
    default: [],
  },

  feed: {
    type: Object,
    default: []
  }
});

module.exports = mongoose.model("post", postSchema);
