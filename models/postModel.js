const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Post", postSchema);
