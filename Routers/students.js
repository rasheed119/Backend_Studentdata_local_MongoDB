import express from "express";
import { Deletestudent, addstudents, getAllstudents, getstudentbyid, updatestud } from "../Controlers/students.js";


const router = express.Router();

//To get list of Students Data
router.get("/",async(req,res)=>{
    try {
        if(req.query.experience){
            req.query.experience = +req.query.experience;
        }
        if(req.query.taskCompletion){
            req.query.taskCompletion = +req.query.taskCompletion
        }
        const students = await getAllstudents(req)
        if(!students){
            res.status(400).json({data : "Usernot found"})
        }
        return res.status(200).json({data : students})
    } catch (error) {
        return res.status(500).json({data : error.message})
    }
})

//To get the student data by their id
router.get("/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const findstudentbyid = await getstudentbyid(id);
        if(!findstudentbyid){
            res.status(400).json({data : "ID not Found"})
        }
        res.status(200).json({data : findstudentbyid});
    } catch (error) {
        return res.status(500).json({Error : error.message})
    }
})

//To add the new student data in the collections
router.post("/addstudent",async(req,res)=>{

    try {
        const { name, batch, qualification, experience, taskCompletion, gender} = req.body
        const result = await addstudents({
            name,
            batch,
            qualification,
            experience,
            taskCompletion,
            gender
        });
        res.status(200).json({data : {result : result,message:"Added Succesfully"}})
    } catch (error) {
        res.status(400).json({data : error.message});
    }
})

//To Update the Student Data by their id 
router.put("/edit/:id",async(req,res)=>{
    
    try {
        const {id} = req.params;
        const updatedstudent = req.body;
        if(!id || !updatedstudent){
            return res.status(400).json({data : "Place Give proper Details"})
        }
        const student = await updatestud(id,updatedstudent);
        res.status(200).json({data : { result : student, message : "Student Updated Successfully" }});

    } catch (error) {
        console.log("Error",error.message);
        res.status(404).json({data : error.message})
    }
})

//To delete the Student data by their id
router.delete("/delete/:id",async(req,res)=>{

    try {
        const {id} = req.params;
        const student = await Deletestudent(id);
        if(!id){
            res.status(400).json({data : "Please Provide the proper id"})
        }
        res.status(200).json({data : { result : student, message : "Student Deleted Successfully" }});
    } catch (error) {
        console.log("Error",error.message);
        res.status(400).json({Error : error.message});
    }
})
export const studentsrouter = router;