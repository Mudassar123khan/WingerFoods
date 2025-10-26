import Stripe from 'stripe'
import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'

const frontend_url = "http://localhost:5173"

//setting up Stripe for payments
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
//Function to order

const placeOrder = async (req,res)=>{
    try {
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,
        });

        //saving the object in DB
        await newOrder.save();

        //clearing the cart after order is placed
        await userModel.findByIdAndUpdate(req.body.userId, {cartData:{}});


        //line_items is an array which it converting the cart data to the format that Stripe requires
        const line_items = req.body.items.map((item)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name,
                },
                unit_amount:item.price*100*80,
            },
            quantity:item.quantity,
        }));


        //Here one object is also pushed in the array which has the delivery charges
        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:20*100*80,
            },
            quantity:1
        });

        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:"payment",
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({success:true, session_url:session.url});
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error, Can't make payment"});   
    }
}

const verifyOrder =async (req,res)=>{
    const {orderId, success} = req.body;

    try {
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"Paid"});
        }else{
            await orderModel.findByIdAndUpdate(orderId);
            res.json({success:false,message:"Not Paid"});
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error, Can't complete payment"});
    }
}

//Function to show orders of user
const userOrders = async (req,res)=>{
    try {
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error, Can't get your orders"});
    }
}


//Function for listing all the orders in the admin pannel
const listOrders =async (req,res)=>{
    try {
        const orders = await orderModel.find({});
        res.json({success:true,data:orders});
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error, Can't fetch order data!!"});
    }
}

//Function for updating order status
const updateStatus =async (req,res)=>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true,message:"Status updated"});
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error, Can't update the staus"});
    }
}

export {placeOrder,verifyOrder,userOrders, listOrders,updateStatus};