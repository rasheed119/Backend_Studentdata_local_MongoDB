import jwt from "jsonwebtoken";

export default async function isAunthenticated(req,res,next){
  const token = req.headers["x-auth-token"];
  if(!token){
    return res.status(400).json({data : "Invalid Authorisation"})
  }
  jwt.verify(token,process.env.secret_key);
  next();
}