// const jwt = require("jsonwebtoken");

// const verifyUser = (req, res, next) => {
//   const tokenCookie = req.cookies?.token;

//   if (!tokenCookie) {
//     console.log("Cookies:", req.cookies);
//     console.log("TOKEN:", req.cookies.token);
//     return res.status(401).json({ message: "No user detected" });
//   }

//   jwt.verify(tokenCookie, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       console.log("JWT Error:", err);
//       return res.status(403).json({ message: "Invalid Token" });
//     }

//     req.user = decoded;
//     next();
//   });
// };

// module.exports = verifyUser;

const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyUser = async (req, res, next) => {
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
