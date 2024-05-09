import { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { API_URL } from "../../api/comman";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/storeContext";
// eslint-disable-next-line react/prop-types
const LoginPopup = ({ setShowLogin }) => {
  const { setToken } = useContext(StoreContext);
  const [currentState, setCurrentState] = useState("Sign up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    let submissionData;
    let apiURL;

    if (currentState === "Login") {
      submissionData = {
        email: data.email,
        password: data.password,
      };
      apiURL = `${API_URL}/api/user/login/`;
    } else {
      apiURL = `${API_URL}/api/user/register/`;

      submissionData = {
        email: data.email,
        password: data.password,
        name: data.name,
      };
    }

    let options = {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submissionData),
    };

    const response = await fetch(apiURL, options);

    const result = await response.json();

    if (result.success) {
      console.log(result)
      toast.success("Logged in Success");
      setToken(result.token);
      localStorage.setItem("token", result.token);
      setShowLogin(false);
      console.log("is it working....")
    } else {
      toast.error(result.message);
    }

    console.log(result, "API result");
  };
  return (
    <div className="login-popup">
      <form onSubmit={onSubmitHandler} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            src={assets.cross_icon}
            onClick={() => setShowLogin(false)}
            alt=""
          />
        </div>

        <div className="login-popup-inputs">
          {currentState === "Login" ? (
            <></>
          ) : (
            <input
              type="text"
              placeholder="Your Name"
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              required
            />
          )}

          <input
            type="email"
            placeholder="Your Email"
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={data.password}
            onChange={onChangeHandler}
          />
        </div>
        <button>
          {currentState === "Sign up" ? "Create account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" name="" required />
          <p>By continuing, i agree to the terms of use & privacy policy</p>
        </div>
        {currentState === "Login" ? (
          <p>
            Create a bew account?{" "}
            <span onClick={() => setCurrentState("Sign up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrentState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
