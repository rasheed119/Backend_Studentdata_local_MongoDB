import express from "express";
import dotenv from "dotenv"
import { studentsrouter } from "./Routers/students.js";


dotenv.config();


const PORT = process.env.PORT;
const app = express();
app.use(express.json());

app.use("/students",studentsrouter)

app.listen(PORT,()=>console.log(`Server Succesfully Connected to localhost:${PORT}`));
