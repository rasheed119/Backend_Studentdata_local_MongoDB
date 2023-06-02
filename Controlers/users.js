import { client, objectid } from "../db.js"
import jwt from "jsonwebtoken"

export function addUsers(users) {
  return client
  .db("b45WD")
  .collection("users")
  .insertOne(users)
}

export function findallusers(){
  return client
  .db("b45WD")
  .collection("users")
  .find()
  .toArray()
}

export function getUsers(userEmail) {
  return client
   .db("b45WD")
   .collection("users")
   .findOne({email : userEmail})
}

export function getUserbyId(id){
  return client
  .db("b45WD")
  .collection("users")
  .findOne({_id : new objectid(id)});
}

export function deleteUser(id){
  return client
  .db("b45WD")
  .collection("users")
  .deleteOne({_id : new objectid(id)});
}

export function generatejwt(id){
  return jwt.sign({id},process.env.secret_key,{expiresIn :"30d"})
}