const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyUser = async (req, res, next) => {
  console.log("Cookies received:", req.cookies);
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ error: "No token." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("_id name");
    if (!user) return res.status(401).json({ error: "User not found." });

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token." });
  }
};


module.exports = verifyUser;
