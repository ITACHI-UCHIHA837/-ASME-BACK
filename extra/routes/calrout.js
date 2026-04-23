// routes/calculationRoutes.js
const express = require("express");
const router = express.Router();

const {
  createCalculation,
  getStats,
  deleteCalculation
} = require("../extra/controll/calcucontroll");

const authMiddleware = require("../mid/middel");

router.post("/", authMiddleware, createCalculation);
router.get("/stats", authMiddleware, getStats);
router.delete("/:id", authMiddleware, deleteCalculation);

module.exports = router;