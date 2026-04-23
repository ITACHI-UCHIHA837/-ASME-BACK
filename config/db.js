require('dotenv').config()
const mongoose = require("mongoose");
const connectDB = async () => {
  try {
     await mongoose.connect("mongodb+srv://joyboy:12345@cluster0.mgfmorw.mongodb.net");
    //await mongoose.connect(`${process.env.URL}`);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;