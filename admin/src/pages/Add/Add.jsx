import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
function Add({url}) {
    
    const [image,setImage] = useState(false);
    const [data,setData] = useState({
        name:"",
        description:"",
        price:"",
        category:"Salad"
    });

    const onChangeHandler = (event)=>{
            const name = event.target.name;
            const value = event.target.value;

            setData(data=>({...data,[name]:value}));
    }

    const onSubmitHandler = async (event)=>{
            event.preventDefault();

            const formData = new FormData();  //FormData() is use to send the raw file data in well formated multipart/formdata to the sever
            formData.append("name",data.name)
            formData.append("description",data.description);
            formData.append("price",Number(data.price));
            formData.append("category",data.category);
            formData.append("image",image);

            //calling the api to add the form data to the database
            const response = await axios.post(`${url}/api/food/add`,formData);
            
            if(response.data.success){
                setData({
                    name:"",
                    description:"",
                    price:"",
                    category:"Salad"
                })
                setImage(false);
                toast.success(response.data.message);
            }else{
                    console.log("Data not sent");
                    toast.error(response.data.message);
            }
    }
  return (
    <div className='add'>
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-image-upload flex-col">
            <p>Upload Image</p>
            <label htmlFor="image">
                <img src={image?URL.createObjectURL(image):assets.upload_area} alt="upload image" />
            </label>
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />
        </div>
        <div className="add-product-name flex-col">
            <p>Product name</p>
            <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Enter the food item name(e.g. Burger, Pizza)'/>
        </div>
        <div className="add-product-description flex-col">
            <p>Product description</p>
            <textarea onChange={onChangeHandler} value={data.description} name="description" rows='6' placeholder='Enter description(e.g. Enjoy the Swiss taste with some Indian mix)'></textarea>
        </div>
        <div className="add-category-price">
            <div className="add-category flex-col">
                <p>Product category</p>
                <select onChange={onChangeHandler} name="category">
                    <option value="Salad">Salad</option>
                    <option value="Rolls">Rolls</option>
                    <option value="Deserts">Deserts</option>
                    <option value="Sandwich">Sandwich</option>
                    <option value="Cake">Cake</option>
                    <option value="Pure Veg">Pure Veg</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Noodles">Noodles</option>
                </select>
            </div>
            <div className="add-price flex-col">
                <p>Product price</p>
                <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='Enter price (e.g. $20)' />
            </div>
        </div>
        <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  )
}

export default Add
