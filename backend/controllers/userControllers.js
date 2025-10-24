import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'


//login user

const loginUser =async (req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});
        
        //Checking if the user is registered or not
        if(!user){
            return res.json({success:false,message:"User is not registered"});
        }

        //Comparing the password entered by the user and in the database
        const isMatch = await bcrypt.compare(password,user.password);

        //Checking password, Is it matching or not 
        if(!isMatch){
            return res.json({success:false,message:"Wrong password"});
        }

        //Password matched, generating a token
        const token = createToken(user._id);
        res.json({success:true,token});

    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Can't login"});
    }
}

//register user

const registerUser =async (req,res)=>{
    const {name,email,password} = req.body;
    try {

        //checking if user already exists
        const exists =await userModel.findOne({email});
        if(exists){
            return res.json({success:false, message:"User Alreday registered"});
        }

        //Validating email format
        if(!validator.isEmail(email)){
            return res.json({success:false,message:'Enter a valid email'});
        }

        //Checking for strong password
        if(password.length<8){
            return res.json({success:false, message:"Password should have atleast 8 characters"});
        }

        //hashing user password

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        //creating user

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword,
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({success:true,token});
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"User not registered!!"});
    }
}

//creating token 
const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET);
}

export {loginUser,registerUser};