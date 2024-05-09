import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/storeContext";
const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
  };
  const menuLinks = [
    { name: "Home", className: menu === "Home" ? "active" : "", href: "" },
    {
      name: "Menu",
      className: menu === "Menu" ? "active" : "",
      href: "explore-menu",
    },
    {
      name: "Mobile-app",
      className: menu === "Mobile-app" ? "active" : "",
      href: "app-download",
    },
    {
      name: "Contact us",
      className: menu === "Contact us" ? "active" : "",
      href: "footer",
    },
  ];

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="logo" />
      </Link>
      <div className="navbar-menu">
        {menuLinks?.map((link, index) => (
          <a
            href={`#${link.href}`}
            key={index}
            className={link.className}
            onClick={() => setMenu(link.name)}
          >
            {link.name}
          </a>
        ))}
      </div>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
          </Link>
        </div>
        {token || localStorage.getItem("token") ? (
          <button onClick={() => handleLogout()}>Log out</button>
        ) : (
          <button onClick={() => setShowLogin(true)}>Sign in</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
