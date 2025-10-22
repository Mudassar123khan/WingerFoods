import mongoose from "mongoose";


export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://wingerfoods:wingerfoods@wingerfoods.u7k65to.mongodb.net/winger-foods').then(()=>
        console.log("Database connected!!")
    );
}