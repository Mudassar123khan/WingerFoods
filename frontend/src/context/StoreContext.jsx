import { Children, createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
export const StoreContext =createContext(null); 

const StoreContextProvider = ({children})=>{

    const [cartItems,setCartItems] = useState({});

    const addToCart = (itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}));
        }else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        }
    }

    const getTotalAmount=()=>{
        let totalAmount = 0;

        for(const item in cartItems){
           if(cartItems[item]>0){
                let itemInfo = food_list.find((product)=>product._id === item);
                totalAmount+=itemInfo.price*cartItems[item];
           }
        }

        return totalAmount;
    }

    const removeFromCart=(itemId)=>{
        if(cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
        }
    }

    useEffect(()=>{
        console.log(cartItems)
    },[cartItems])

    const contextValue={
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalAmount,
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;