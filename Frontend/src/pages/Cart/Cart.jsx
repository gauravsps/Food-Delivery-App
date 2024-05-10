import { useContext } from "react";
import { StoreContext } from "../../context/storeContext";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../api/comman";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount } =
    useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <div className="cart">
      {getTotalCartAmount() > 0 ? (
        <>
          <div className="cart-items">
            <div className="cart-items-title">
              <p>Items</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>
            <br />
            <hr />
            {food_list.map((item, index) => {
              if (cartItems[item._id] > 0) {
                return (
                  <div key={index}>
                    <div className="cart-items-title cart-items-item">
                      <img src={`${API_URL}/images/${item.image}`} alt="" />
                      <p>{item.name}</p>
                      <p> ${item.price}</p>
                      <p>{cartItems[item._id]}</p>
                      <p>${item.price * cartItems[item._id]}</p>
                      <p
                        className="cross"
                        onClick={() => removeFromCart(item._id)}
                      >
                        x
                      </p>
                    </div>
                    <hr />
                  </div>
                );
              }
            })}
          </div>
          <div className="cart-bottom">
            <div className="cart-total">
              <h2>Cart Total</h2>
              <div className="cart-total-details-wrapper">
                <div className="cart-total-details">
                  <p>Sub Total</p>
                  <p>${getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <p>Delivery Fee</p>
                  <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <b>Total</b>
                  <b>${getTotalCartAmount() + 2}</b>
                </div>
              </div>
              <div className="checkout-btn">
                <button onClick={() => navigate("/order")}>
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
            <div className="cart-promo-code">
              <div className="cart-promo-code-wrapper">
                <p>If you have promo code, Enter it here</p>
                <div className="cart-promocode-input">
                  <input type="text" placeholder="Promo code" />
                  <button>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="Empty-cart">
          <h2>Cart is Empty</h2>
        </div>
      )}
    </div>
  );
};

export default Cart;
