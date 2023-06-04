import jwt from "jsonwebtoken";

export default async function isAunthenticated(req,res,next){
  const token = req.headers["x-auth-token"];
  //To Check Wheather the token is valid or Not in function(err)
  jwt.verify(token,process.env.secret_key,function(err){
    if(err){
      return res.status(500).json({data : err})
    }else{
      next();
    }
  });
}