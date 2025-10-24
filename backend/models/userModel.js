import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    cartData:{
        type:Object,
        default:{},
    },
},{minimize:false});  //{minimize:false} is used beacuse when the use data is formed then the cart will be empty and if minimize is not set to false empty cart will not be added to the user data

const userModel = mongoose.models.user || mongoose.model('user',userSchema);
export default userModel;