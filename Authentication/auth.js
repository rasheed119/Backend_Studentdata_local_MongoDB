import jwt from "jsonwebtoken";

export const isAunthenticated = (req,res,next)=>{
  try {
    const token = req.headers["x-auth-token"];
    jwt.verify(token,process.env.secret_key);
    next();
  } catch (error) {
    res.send({error : error.message})
  }
}






/* export default async function isAunthenticated(req,res,next){
  const token = req.headers["x-auth-token"];
  To Check Wheather the token is valid or Not in function(err)
  jwt.verify(token,process.env.secret_key,function(err){
    if(err){
      return res.status(500).json({data : err})
    }else{
      next();
    }
  });
  jwt.verify(token,process.env.secret_key);
  if(!token){
    return res.status(500).json({message : "Invalid Autorisation"})
  }
  next();
} */