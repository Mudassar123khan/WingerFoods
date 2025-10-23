import foodModel from "../models/foodModel.js";
import fs from 'fs'

//add food function
const addFood = async (req,res)=>{
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        image:image_filename,
        category:req.body.category
    });

    try{
        await food.save();
        res.json({success:true,message:"Food Added"});
    }catch(err){
        console.log(err);
        res.json({success:false,message:"Error, Food not saved"});
    }
}


//all food list

const listFood =async (req,res)=>{
    try {
        const food  = await foodModel.find({});
        res.json({success:true,data:food});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error, Data not found"})
    }
}

//remove food item

const removeFood = async (req,res)=>{
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{});   //this line deletes the image from the uploads folder

        await foodModel.findByIdAndDelete(req.body.id);   // this will delete all the data related to req.body.id from the atlas database
        res.json({success:true, message:"Food removed"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error, Food not removed"});
    }
}

export {addFood,listFood, removeFood};