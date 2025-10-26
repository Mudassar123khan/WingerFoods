import axios from "axios";
import { Children, createContext, useEffect, useState } from "react";
export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  //Creating a state variable to store the food list which are present in the DB
  const [food_list, setFoodList] = useState([]);

  //Creating a state variable to store the items in the cart
  const [cartItems, setCartItems] = useState({});

  //This is the url of our server
  const url = "https://wingerfoods-backend.onrender.com";

 //state variable to store token received from client
  const [token, setToken] = useState("");

  //Function to add food items in the cart
  const addToCart =async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    if(token){
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}});
    }
  };

  //Function to calculate total amount of food items which are in the cart
  const getTotalAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  //Use effect for setting the taken in the token state variable. This is done so that if user refereshes the page he/she doesn't logged out
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  //Function to remove food items from the cart
  const removeFromCart =async (itemId) => {
    if (cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

      if(token){
        await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}});
      }
    }
  };

  //Function to load cart data to the fronendt
  const loadCartData = async (token)=>{
    let response={};
    if(token){
      response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
    }

    setCartItems(response.data.cartData);
  }

  //Function to fetch food items from the database
  const fetchFoodList =async ()=>{
    const response = await axios.get(`${url}/api/food/list`);
    setFoodList(response.data.data);
  }

  useEffect(()=>{
    async function loadData(){
        await fetchFoodList();
        await loadCartData(localStorage.getItem("token"));
    }
    loadData();
  },[])


  //Values passed in the context
  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
