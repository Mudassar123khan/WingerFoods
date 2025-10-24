import express from 'express'
import { addToCart,removeFromCart,getCart } from '../controllers/cartControllers.js'
import authMiddleeware from '../middleware/auth.js';


//Creating Router for cart

const cartRouter = express.Router();

//api endpoints
cartRouter.post('/add',authMiddleeware,addToCart)
cartRouter.post('/remove',authMiddleeware,removeFromCart)
cartRouter.post('/get',authMiddleeware,getCart)

export default cartRouter;