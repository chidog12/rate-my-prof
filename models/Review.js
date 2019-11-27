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
  },
  Goals: {
    type: Number,
    required: true
  },
  Variety: {
    type: Number,
    required: true
  },
  Voice: {
    type: Number,
    required: true
  },
  Exams: {
    type: Number,
    required: true
  }
});

module.exports = User = mongoose.model("reviews", ReviewSchema);
