import os

# Base path (current folder)
base_path = os.getcwd()

# Folder structure
folders = [
    "models",
    "routes",
    "controllers",
    "middleware",
    "config"
]

# Create folders
for folder in folders:
    os.makedirs(os.path.join(base_path, folder), exist_ok=True)

# Files with content
files = {

    "config/db.js": """
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/pipeline");
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
""",

    "models/User.js": """
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

module.exports = mongoose.model("User", userSchema);
""",

    "models/Calculation.js": """
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
""",

    "middleware/authMiddleware.js": """
const jwt = require("jsonwebtoken");

const SECRET_KEY = "your_secret_key";

module.exports = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
""",

    "controllers/calculationController.js": """
const Calculation = require("../models/Calculation");

exports.createCalculation = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const { diameter, pressure, grade } = req.body;

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
    const passed = await Calculation.countDocuments({ user_id, result: "pass" });
    const failed = await Calculation.countDocuments({ user_id, result: "fail" });

    const recent = await Calculation.find({ user_id })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({ total, passed, failed, recent });

  } catch (err) {
    res.status(500).json({ message: "Error fetching stats" });
  }
};

exports.deleteCalculation = async (req, res) => {
  try {
    await Calculation.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};
""",

    "routes/calculationRoutes.js": """
const express = require("express");
const router = express.Router();

const {
  createCalculation,
  getStats,
  deleteCalculation
} = require("../controllers/calculationController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createCalculation);
router.get("/stats", authMiddleware, getStats);
router.delete("/:id", authMiddleware, deleteCalculation);

module.exports = router;
""",

    "app.js": """
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

connectDB();

const calculationRoutes = require("./routes/calculationRoutes");
app.use("/api/calculations", calculationRoutes);

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
"""
}

# Create files
for path, content in files.items():
    full_path = os.path.join(base_path, path)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content.strip())
print("✅ Backend structure created successfully!")