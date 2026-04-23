const mongoose = require("mongoose");

const calculationSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
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
  value: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Calculation", calculationSchema);