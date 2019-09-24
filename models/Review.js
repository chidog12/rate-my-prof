const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ReviewSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  review: {
    type: String,
    required: true
  },
  profId: {
    type: String,
    required: true
  }
});

module.exports = User = mongoose.model("reviews", ReviewSchema);
