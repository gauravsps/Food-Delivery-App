import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";
const ExploreMenu = (props) => {
  const { category, setCategory } = props ?? {};
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore Our Menu</h1>
      <p className="explore-menu-text">
        Dive into a world of culinary delights with our extensive menu featuring
        a wide array of dishes to tantalize your taste buds. From mouthwatering
        appetizers to decadent desserts, we have something for everyone. Whether
        you're craving a hearty meal or a light snack, our menu has you covered.
        {/* Join us for a gastronomic adventure and explore the flavors that await
        you! */}
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              className="explore-menu-list-item"
              key={index}
            >
              <img
                className={category === item.menu_name ? "active" : ""}
                src={item.menu_image}
                alt=""
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
