import jwt from 'jsonwebtoken'

const authMiddleeware =async (req,res,next)=>{
    const {token} = req.headers;
    if(!token){
        return res.json({success:false,message:"Not authorized"});
    }

    try {
        //verifying the token received from the client
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        //the token comes with an id of the user who has sent it. Now we are adding that id to req body as userId so that the cart can know who is sending or accessing the data
        req.body.userId = token_decode.id;  

        //moving to the cart function
        next();
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error, Not authorized"});
    }
}

export default authMiddleeware;

//This middelware function intercepts the incoming request from the user to add, remove or get items of the cart and checks if the user is logged in or not. If the user is logged in then it grants access to the cart items but if the user is not logged in it returns a 401 (unauthorise) status to client.