import { createContext, useState } from "react";
import { food_list } from "../assets/assets";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token,setToken] = useState(""); 
  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: prev[itemId] + 1,
      }));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      console.log(prev, "check prev value",prev[Object.keys(prev)[0]]);
      if (Object.keys(prev).length === 1 && prev[Object.keys(prev)[0]] == 0) {
        return {}
      } else {
        return { ...prev, [itemId]: prev[itemId] - 1 };
      }
    });
  };

  const getTotalCartAmount = () => {
    let totalAmout = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmout += itemInfo.price * cartItems[item];
      }
    }
    return totalAmout;
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props?.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
