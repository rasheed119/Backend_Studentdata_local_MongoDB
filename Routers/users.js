import express from "express";
import { addUsers, deleteUser, findallusers, generatejwt, getUserbyId, getUsers } from "../Controlers/users.js";
import bcrypt from "bcrypt";

const router = express.Router();

/* router.get("/", async(req, res) => {
  const user = await user(req);
  return res.status(200).json({data : user});
}) */

router.get("/all",async(req,res)=>{

  try {
    const all_users = await findallusers();
    if(!all_users){
      return res.status(400).json({data : "No users Signup to add User"})
    }
    return res.status(200).json({data : all_users});
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message : error.message});
  }
})

router.post("/signup", async(req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const user = await getUsers(req.body.email);
    if(!user){
      const hashedpassword = await bcrypt.hash(req.body.password,salt);
      const hashedUser = await {...req.body, password : hashedpassword};
      const result = await addUsers(hashedUser);
      return res.status(200).json({result, message : "User added successfully"});
    }
    res.status(400).json({message :"User already exists"});
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message : error.message});
  }
})

router.post("/login", async(req, res) => {
  try {
    const user = await getUsers(req.body.email);
    if(!user){
      return res.status(400).json({message : "User not found"});
    }
    const password = await bcrypt.compare(req.body.password,user.password);
    if(!password){
      return res.status(400).json({message : "Invalid password"});
    }
    const token = await generatejwt(user._id);
    return res.status(200).json({message : "Successfully logedin",token});
    
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message : error.message});
  }
});

router.delete("/delete/:id",async(req,res)=>{

  try {
    const {id} = req.params;
    const user = await getUserbyId(id);
    if(!user){
      return res.status(400).json({data : "User Id not found"});
    }
    const result  = await deleteUser(id);
    return res.status(200).json({data : result, message : "User deleted Successfully"});
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message : error.message});
  }
})

export const userRouter = router;