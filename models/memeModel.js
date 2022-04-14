const mongoose = require("mongoose");
// var uuid = require("uuid");

const collectionName = "memes";

const memeModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    }
  },
  { _id: true }
);
module.exports = mongoose.model(collectionName, memeModel);
