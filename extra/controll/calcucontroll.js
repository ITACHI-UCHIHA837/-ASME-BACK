// controllers/calculationController.js
const Calculation = require("../../models/calculation");

exports.createCalculation = async (req, res) => {
  try {
    const user_id = req.user.user_id;

    const { diameter, pressure, grade } = req.body;

    // 🔧 Your logic
    const value = diameter * pressure * grade;
    const result = value > 100 ? "pass" : "fail";

    const calc = new Calculation({
      user_id,
      input: { diameter, pressure, grade },
      result,
      value
    });

    await calc.save();

    res.json(calc);
  } catch (err) {
    res.status(500).json({ message: "Error saving calculation" });
  }
};

exports.getStats = async (req, res) => {
  try {
    const user_id = req.user.user_id;

    const total = await Calculation.countDocuments({ user_id });

    const passed = await Calculation.countDocuments({
      user_id,
      result: "pass"
    });

    const failed = await Calculation.countDocuments({
      user_id,
      result: "fail"
    });

    const recent = await Calculation.find({ user_id })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      total,
      passed,
      failed,
      recent
    });

  } catch (err) {
    res.status(500).json({ message: "Error fetching stats" });
  }
};


exports.deleteCalculation = async (req, res) => {
  try {
    const { id } = req.params;

    await Calculation.findByIdAndDelete(id);

    res.json({ message: "Deleted" });

  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};