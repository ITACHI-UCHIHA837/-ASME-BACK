const User = require("./../models/User")
const jwt =require("jsonwebtoken")
//app.post("/login", async (req, res) => {
const SECRET_KEY = "12345";

    exports.loguser = async(req,res) =>{
    
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
    res.status(500).json({ message: "Server logback error",err });
    console.log(err);
    
    //({ message: "Server logback error",err });
  }
};

// const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers["authorization"];

//   if (!authHeader) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   const token = authHeader.split(" ")[1]; // Bearer TOKEN

//   try {
//     const decoded = jwt.verify(token, SECRET_KEY);
//     req.user = decoded; // attach user info
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

