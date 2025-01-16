import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";
const schema=mongoose.Schema;

mongoose.connect(process.env.DATABASE_URL);


const PaymentSchema=new schema({
    razorpay_order_id:{
        type:String,
        required:true
    },
    razorpay_payment_id:{
        type:String,
        required:true
    },
    razorpay_signature:{
        type:String,
        required:true
    },
    Date:{
        type:Date,
        default:Date.now
    }
})

export const paymentModel=mongoose.model("payments",PaymentSchema);


