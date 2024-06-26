import PropTypes from "prop-types";

import "./FoodDisplay.css";
import { useContext } from "react";
import { StoreContext } from "../../context/storeContext";
import FoodItem from "../FoodItem/FoodItem";
import { API_URL } from "../../api/comman";
const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list?.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                image={`${API_URL}/images/${item.image}`}
                price={item.price}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;

FoodDisplay.propTypes = {
  category: PropTypes.string.isRequired,
};
