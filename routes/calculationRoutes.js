const express = require("express");
const router = express.Router();

const {
  createCalculation,
  getStats,
  deleteCalculation
} = require("../controllers/calculationController");

const authMiddleware = require("../middleware/authMiddleware");
const { loguser } = require("../controllers/authenticationcontroller");
const { dashbord } = require("../controllers/dashbord");
// const { Profiler } = require("react");
const { getprofile } = require("../controllers/profi");

router.post("/store", authMiddleware, createCalculation);
router.get("/stats", authMiddleware, getStats);
router.delete("/:id", authMiddleware, deleteCalculation);
router.post("/login", loguser);

router.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend is running 🚀",
    time: new Date().toISOString()
  });
});
router.get("/health", (req, res) => {
  res.status(200).json({
    uptime: process.uptime(),
    message: "Healthy",
    timestamp: Date.now()
  });
});
router.get("/dashboard", authMiddleware, dashbord);
router.get("/profile", authMiddleware, getprofile);
module.exports = router;