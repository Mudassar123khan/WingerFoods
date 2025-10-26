import React from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from "axios"
import { useContext } from 'react';
import {StoreContext} from '../../context/StoreContext'
import { useEffect } from 'react';
function Verify() {
    //This is used to get the url parameters
    const [searchParams , setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const navigate = useNavigate();
    const {url} = useContext(StoreContext);
    //Function to verify payment
    const verifyPayment =async ()=>{
        const response = await axios.post(url+"/api/order/verify",{success,orderId});

        if(response.data.success){
            navigate("/myorders");
        }else{
            navigate("/");
        }
    }


    useEffect(()=>{
        verifyPayment();
    },[])

  return (

      <div className="verify">
        <div className="spinner">

        </div>
      </div>
  
  )
}

export default Verify
