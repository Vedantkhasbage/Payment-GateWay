import { useRef } from "react"
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";

function App() {
    const PaymentRef=useRef();   

  const handlepay=async()=>{
       const amount=PaymentRef.current.value;
          
     const response= await axios.post("http://localhost:5000/user/order",{
        amount:amount
       })
          handleverify(response.data.data);
       console.log(response);
  }

  const handleverify=(data)=>{
    console.log("here also");
    const options = {
      key: ({}).RAZORPAY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "Vedant",
      description: "Test Mode",
      order_id: data.id,
      handler: async (response)=>{
        console.log(response);

        await axios.post("http://localhost:5000/user/verify",{
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        })
      }
    }
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
}

  return <div className="h-screen w-full bg-green-200 flex justify-center items-center">
    
    <div className="h-1/2 w-1/2 bg-green-600 flex flex-col justify-center items-center">
    <h1>RazorPay</h1>
    <input ref={PaymentRef} className="h-12 w-48" type="text" placeholder="Enter Amount Here"/>
    <button onClick={handlepay} className="h-12 rounded-xl w-48 bg-blue-300">Pay Now</button>
    <Toaster/>
    </div>
  </div>
}

export default App
