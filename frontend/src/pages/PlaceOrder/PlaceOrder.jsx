import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
function PlaceOrder() {

  const {getTotalAmount,url,food_list,token,cartItems} = useContext(StoreContext);

  //Creating state variable which store the form data
  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    phone:""
  });


  //Handler function
  const onChangeHandler = (event)=>{
    const name = event.target.name;
    const value = event.target.value;

    setData(data=>({...data,[name]:value}));
  }

  //Function for placing the order
  const placeOrder =async (event)=>{
    event.preventDefault();

    let orderItems = [];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo = {...item};
        itemInfo["quantity"] = cartItems[item._id];  //adding a new quantity key value property in the item object which contains name price etc
        orderItems.push(itemInfo);
      }
    })

    let orderData = {
      address : data,
      items:orderItems,
      amount : getTotalAmount()+20,
    }

    let respone = await axios.post(url+"/api/order/place", orderData,{headers:{token}});
    if(respone.data.success){
      const {session_url} = respone.data;
      window.location.replace(session_url);
    }else{
      alert("Error");
    }
  }

  //Functionality that doesn't allow user to place order without login
  const navigate = useNavigate();
  useEffect(()=>{
    if(!token){
      navigate("/cart");
    }else if(getTotalAmount()==0){
      navigate("/cart");
    }
  },[token])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input required onChange={onChangeHandler} value={data.firstName} name='firstName' type="text" placeholder='First Name'/>
          <input required onChange={onChangeHandler} value={data.lastName} name='lastName' type="text" placeholder='Last Name'/>
        </div>
        <input required onChange={onChangeHandler} name='email' value={data.email} type="email" placeholder='Enter your email'/>
        <input required onChange={onChangeHandler} name='street' value={data.street} type="text" placeholder='Street'/>
        

         <div className="multi-fields">
          <input required onChange={onChangeHandler} name='city' value={data.city} type="text" placeholder='City'/>
          <input required onChange={onChangeHandler} name='state' value={data.state} type="text" placeholder='State'/>
        </div>

        <input required onChange={onChangeHandler} name='phone' value={data.phone} type="number" placeholder='Enter your  phone number'/>
      </div>
      <div className="place-order-right">
          <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalAmount()===0?0:20}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalAmount()===0?0:getTotalAmount()+20}</b>
            </div>
          </div>
          <button type='submit'>
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
