import { client, objectid } from "../db.js"


export function getAllstudents(req){
    return client
    .db("b45WD")
    .collection("students")
    .find(req.query)
    .toArray()
}

export function getstudentbyid(id){
    return client
    .db("b45WD")
    .collection("students")
    .findOne({_id : new objectid(id)});
}

export function addstudents(addstudent){
    return client
    .db("b45WD")
    .collection("students")
    .insertOne(addstudent);
}

export function updatestud(id, updatedstudent){
    return client
    .db("b45WD")
    .collection("students")
    .findOneAndUpdate({_id : new objectid(id)},{$set:updatedstudent});
}

export function Deletestudent(id){
    return client
    .db("b45WD")
    .collection("students")
    .deleteOne({_id : new objectid(id)});
}