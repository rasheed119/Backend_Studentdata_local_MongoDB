import express from "express";
import dotenv from "dotenv"
import { studentsrouter } from "./Routers/students.js";
import { userRouter } from "./Routers/users.js";
import {isAunthenticated} from "./Authentication/auth.js";
import cors from "cors";



dotenv.config();


const PORT = process.env.PORT;
const app = express();
app.use(express.json());

app.use(cors());
app.use("/students",isAunthenticated,studentsrouter);
app.use("/users",userRouter);

app.listen(PORT,()=>console.log(`Server Succesfully Connected to localhost:${PORT}`));
