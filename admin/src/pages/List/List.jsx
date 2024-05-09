import { useEffect, useState } from "react";
import "./List.css";
import { API_URL } from "../../../api/comman";
import axios from "axios";
import { toast } from "react-toastify";
const List = () => {
  const [list, setList] = useState([]);

  const fectchList = async () => {
    const result = await axios.get(`${API_URL}/api/food/list`);
    console.log(result.data, "item data");
    if (result.data.success) {
      setList(result.data.data);
    } else {
      toast("SOmething went wrong");
    }
  };

  const removeFood = async (foodId) => {
    const data = {
      id: foodId,
    };
    const result = await axios.delete(`${API_URL}/api/food/delete`, {
      data,
    });

    if (result.data.success) {
      toast.success("Food Removed");
      setList((prev) => prev.filter((item) => item._id !== foodId));
    } else {
      toast(result.data.message);
    }
  };

  useEffect(() => {
    fectchList();
  }, []);
  return (
    <div className="list add flex-col">
      <p className="list-heading">All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list?.map((item) => {
          return (
            <div key={item._id} className="list-table-format">
              <img src={`${API_URL}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p className="cursor" onClick={() => removeFood(item._id)}>
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
