require('dotenv').config()
const cors = require("cors");
const express = require("express");
//const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

const app = express() 

app.use(cors({
   origin: ["http://localhost:3000", "http://localhost:3001"],
  //origin: "*",
  credentials: true
}));
// app.use(cors());
app.use((req, res, next) => {
  console.log("Origin:", req.headers.origin);
  next();
});
app.use(express.json());
app.use(cookieParser());

connectDB();
const PORT = process.env.PORT || 8000;
const calculationRoutes = require("./routes/calculationRoutes");
app.use("/api/calculations", calculationRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.listen(process.env.PORT, () => {
  console.log("Server running on port" ,PORT);
});