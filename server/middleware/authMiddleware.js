const jwt = require("jsonwebtoken");

const verifyUser=(req,res,next)=>{
  const tokenCookie=req.cookies?.token;
  if (!tokenCookie)
    console.log("Cookies:", req.cookies); 
  console.log("TOKEN:", req.cookies.token);  
     return res.status(401).json({ message: "No user detected" });

  jwt.verify(tokenCookie,process.env.JWT_SECRET,(err,decoded)=>{
      if (err)
         console.log("JWT Error:", err);
         return res.status(403).json({ message: "Invalid Token" });
   
       

      req.user=decoded;
      next();
  })
}

module.exports=verifyUser;