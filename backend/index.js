import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';  
import { userRouter } from './router/payment.js';

const app=express();

app.use(cors());
app.use(express.json());

app.use("/user",userRouter)

app.listen(5000,()=>{
    console.log("server started!!!");
})