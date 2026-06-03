const express = require("express");
const router = express.Router();

const {
  createCalculation,
  saveCalculation,
  Calculating,
  getStats,
  deleteCalculation
} = require("../controllers/calculationController");

const authMiddleware = require("../middleware/authMiddleware");
const { loguser } = require("../controllers/authenticationcontroller");
const { dashbord } = require("../controllers/dashbord");
// const { Profiler } = require("react");
const { getprofile } = require("../controllers/profi");
const {ragisteruser} = require("../controllers/authenticationcontroller")
router.post("/store", authMiddleware, createCalculation);
router.post("/savee", authMiddleware, saveCalculation);
//router.post("/calculate",Calculating);
router.get("/stats", authMiddleware, getStats);
router.delete("/:id", authMiddleware, deleteCalculation);
router.post("/login", loguser);

router.post("/ragister", ragisteruser);
router.get("/dashboard", authMiddleware, dashbord);
router.get("/profile", authMiddleware, getprofile);
module.exports = router;