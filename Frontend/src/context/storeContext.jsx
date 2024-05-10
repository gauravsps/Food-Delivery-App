import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import axio from "axios";
import { API_URL } from "../api/comman";
import { toast } from "react-toastify";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: prev[itemId] + 1,
      }));
    }
    if (token) {
      const response = await axio.post(
        API_URL + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("Added to Cart");
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      console.log(prev, "check prev value", prev[Object.keys(prev)[0]]);
      if (Object.keys(prev).length === 1 && prev[Object.keys(prev)[0]] == 0) {
        return {};
      } else {
        return { ...prev, [itemId]: prev[itemId] - 1 };
      }
    });

    if (token) {
      const response = await axio.post(
        API_URL + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("Removed From Cart");
      }
    }
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

  const fetchFoodList = async () => {
    const result = await axio.get(`${API_URL}/api/food/list`);
    console.log(result, "Food List API");

    if (result.data.success) {
      setFoodList(result?.data?.data);
    }
  };

  const loadCartData = async () => {
    const respons = await axio.get(API_URL + "/api/cart/get", {
      headers: { token },
    });

    setCartItems(respons.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchFoodList();
      loadCartData(localStorage.getItem("token"));
    }
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props?.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
