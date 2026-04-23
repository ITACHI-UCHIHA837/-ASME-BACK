const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Create / connect DB
const db = new sqlite3.Database("./users.db", (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Connected to SQLite DB");
  }
});

// ✅ Create table
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tmin TEXT,
    hoop TEXT,
    CA TEXT
  )
`);

// ✅ API route
app.post("/login",(req,res)=>{
const {mail,pass}=req.body;


const useer = mail==User.mai;

})


app.post("/add-user", (req, res) => {
  const { tmin , hoop , CA } = req.body;

  const query = `INSERT INTO users (tmin , hoop , CA) VALUES (?,?,?)`;
  // const query = `DROP TABLE users`;


  db.run(query, [tmin ,hoop ,CA], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ 
      message: "data saved",
      id: this.lastID,
      data:tmin,
     
    });
  });
});

// ✅ Start server
app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});