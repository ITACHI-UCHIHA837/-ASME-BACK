const mongoose = require("mongoose");

const calculationSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  input: {
    size: Number,
    D_T_allo:Number,
    wall_consi:Number,
   
  },
  result: {
    type: String,
    enum: ["PASS", "FAIL"],
  },
  D_T_actu:Number,
  value: Number,
  createdAt: {
    type: Date,
    default: Date.now
  },
  projname:String

  
});

module.exports = mongoose.model("Calculation", calculationSchema);