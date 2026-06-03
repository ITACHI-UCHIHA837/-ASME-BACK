const mongoose = require("mongoose");

const calculationresultSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  payload: {
    type: Object,
  },
  result: {
    type: Object,
  },
  projname: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },

  
});

module.exports = mongoose.model("CalculationResult", calculationresultSchema);