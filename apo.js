// import express from "express"
// import mongoose from "mongoose"
// // const mongoose = require('mongoose');
 const url='mongodb+srv://joyboy:12345@cluster0.mgfmorw.mongodb.net'

// const app =express();

// mongoose.connect(url)
//   .then(() => console.log('Connected!'));


const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
const cors = require("cors");
// const { use } = require("react");
 const express =require("express");
const app = express();

// ------------------ MIDDLEWARE ------------------
app.use(express.json());
app.use(cors());


const SECRET_KEY = "12345"; // change this laterconst express = require("express");
// ------------------ DATABASE ------------------
mongoose.connect(url 
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err));

// ------------------ SCHEMA ------------------
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
//   password,
});

const User = mongoose.model("User", userSchema);

const calculationRoutes = require("./routes/calrout");

app.use("/api/calculations", calculationRoutes);
// ------------------ REGISTER ------------------

app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // hash password
    // const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser = new User({
      email,
      password,
    //   : hashedPassword,
    });

    await newUser.save();

    res.json({ message: "User registered successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ------------------ LOGIN ------------------
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const isMatch = password === user.password;
    //await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
     const token = jwt.sign(
      { user_id: user._id },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      user_id: user._id,
      token:token
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Bearer TOKEN

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // attach user info
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};


app.get("/dashboard", authMiddleware, (req, res) => {
    console.log(req.headers);
  res.json({
    message: "Welcome to dashboard",
    user_id: req.user.user_id
  });
});

app.get("/getdata", (req, res) => {
    console.log(req.headers);
  res.json({
    
  });
});

app.get("/profile", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.user_id;

    const user = await User.findById(userId).select("-password");

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ------------------ SERVER ------------------
app.listen(8000, () => {
  console.log("Server running on port 8000");
});