const express = require("express");
const router = express.Router();

const {
  createCalculation,
  getStats,
  deleteCalculation
} = require("../extra/controllers/calculationController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createCalculation);
router.get("/stats", authMiddleware, getStats);
router.delete("/:id", authMiddleware, deleteCalculation);

module.exports = router;