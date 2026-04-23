
//app.get("/profile", authMiddleware, 
const User = require("./../models/User")
  exports.getprofile =async (req, res) => {
    try {
    const userId = req.user.user_id;

    const user = await User.findById(userId).select("-password");

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
