import dotenv from 'dotenv'
dotenv.config();
import express, { Router } from 'express'
export const userRouter=Router();
import Razorpay from 'razorpay';
import crypto from 'crypto'
import { paymentModel } from '../db/db.js';

const RazorPayInstance=new Razorpay({
  key_id:process.env.RAZORPAY_ID,
  key_secret:process.env.RAZORPAY_SECRET
})



userRouter.post("/order",(req,res)=>{
  console.log("in order");
    const {amount}=req.body;
      
    try {
        const Option={
          amount:Number(amount*100),
          currency:"INR",
          receipt:crypto.randomBytes(10).toString("hex"),
        }  
      
    RazorPayInstance.orders.create(Option,(error,order)=>{
      if(error){
        res.status(500).send("Something went wrong!!!");
        return;
      }

      // console.log(order);
      res.status(200).send({
        data:order
      })
    })
    } catch (error) {
        // console.log(error);
        res.status(500).send({
          message:"Internal Server Error!!"
        })
    }
     

})


userRouter.post("/verify",async(req,res)=>{
  console.log("in verify")
       try{ const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body;
       console.log(req.body);

       console.log("here")
        const sign=razorpay_order_id+ "|" + razorpay_payment_id;
        console.log(sign)
        console.log("sign")

      
       const expectedSign=crypto.createHmac("sha256",process.env.RAZORPAY_SECRET).update(sign.toString()).digest("hex");

    
        console.log(expectedSign);

        const isAuthenticate=expectedSign===razorpay_signature;
        console.log("auth")
        console.log(isAuthenticate);

        if(isAuthenticate){
         const resp=await paymentModel.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
          })
            
          console.log("reched here");
          console.log(resp);
          console.log("reched here");
          res.status(200).send({
            message:"Payment success!!"
          })
        }} catch(e){
          res.status(500).send({
            message:"Something went Wrong!!!"
          })
          return;
        }
})

