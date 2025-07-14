const jwt = require("jsonwebtoken");

const verifyUser=(req,res,next)=>{
  const tokenCookie=req.cookies?.token;
  if (!tokenCookie)
    return res.send("No user detected")

  jwt.verify(tokenCookie,process.env.JWT_SECRET,(err,decoded)=>{
      if (err)
        return res.send("Invalid Token");

      req.user=decoded;
      next();
  })
}

module.exports=verifyUser;