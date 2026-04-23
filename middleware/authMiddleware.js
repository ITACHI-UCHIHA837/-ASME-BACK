 const jwt = require("jsonwebtoken");
 const SECRET_KEY = "12345";
 //const User = require("./../models/User")

module.exports = (req, res, next) => {
  // const token = req.cookies.token;
  const authHeader  = req.headers["aut"];
  const reqmsg = req.headers["msg"];
  //res.json(token);
  
  if (!authHeader) return res.status(401).json({ message: "No token noo" + reqmsg });
  const token = authHeader.split(" ")[1];
  console.log(token);

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("in the midel error"+ err );
    
    res.status(401).json({ message: "Invalid token" });
  }
};