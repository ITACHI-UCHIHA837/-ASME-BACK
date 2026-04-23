//app.get("/dashboard", authMiddleware, 
exports.dashbord =  (req, res) => {
    console.log(req.headers);
  res.json({
    message: "Welcome to dashboard",
    user_id: req.user.user_id
  });
};