import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import chalk from "chalk";
import userRouter from "./Routers/userRouter.js";
import projectRouter from "./Routers/projectRouter.js";
import taskRouter from "./Routers/taskRouter.js";



dotenv.config();
const app = express();



app.use(cors());
app.use(express.json());

app.use('/user', userRouter);
app.use('/projects', projectRouter)
app.use('/tasks',taskRouter)


const port = process.env.PORT || 5000;

const start = async ()=>{
    try{
        await mongoose.connect(process.env.DB_URL);
        console.clear();
        console.log(chalk.green('db conntected'))
        app.listen(port,()=>{
            console.log(chalk.black.bgGreen(`server started at ${process.env.PORT} port ${'\n'.repeat(10)}`))
        })
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}



start();