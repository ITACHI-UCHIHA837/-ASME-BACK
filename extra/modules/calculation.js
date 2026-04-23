// models/Calculation.js
const mongoose = require("mongoose");

const calculationSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  input: {
    diameter: Number,
    pressure: Number,
    grade: Number
  },

  result: {
    type: String,
    enum: ["pass", "fail"]
  },

  value: Number, // final calculated value

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Calculation", calculationSchema);