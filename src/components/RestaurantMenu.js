import useRestaurantMenu from "../utils/useRestaurantMenu";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { resID } = useParams();

  const resInfo = useRestaurantMenu(resID);
  console.log(resInfo);
  // console.log("hello");

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (resInfo === null) return <Shimmer />;

  const { name, cuisines, costForTwo } = resInfo.cards[2].card.card.info;
  // first we iterate over the different types of categories and then we iterate for fetching the menu items from that particular category.
  const regularCards =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

  const categoryCards = regularCards.filter((c) => {
    return c && Object.keys(c).length > 0 && c?.card && c?.card?.card;
  });

  const categories = regularCards.filter((cat) => {
    return (
      cat.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
  });

  console.log(categoryCards);
  console.log(categories, "categories now ");
  // .card.card.itemCards[i].card.info.name;
  return (
    <div className="menu">
      <div className="restaurant-header">
        <h1 className="restaurant-name">{name}</h1>
        <p className="restaurant-meta">
          {cuisines.join(", ")} - {costForTwo}
        </p>
      </div>
      <h2 className="section-title">Menu</h2>

      {categoryCards.map((c, catIndex) => {
        const title = c.card.card.title;
        const itemsArray = c.card.card.itemCards;

        return (
          <div key={catIndex} className="categories">
            <div className="cat-btn">
              <button type="button" onClick={() => handleToggle(catIndex)}>
                {" "}
                <span className="cat-title">{title}</span>
                <span className="cat-arrow">
                  {openIndex === catIndex ? "↑" : "↓"}
                </span>
              </button>
            </div>

            {openIndex === catIndex &&
              itemsArray.map((items, index) => {
                return (
                  <div key={items.card.info.id} className="item">
                    <ul>
                      <li>
                        {items.card.info.name} - {items.card.info.price / 100}
                      </li>
                      <span>{items.card.info.description}</span>
                      <li>
                        <button>Add+</button>
                      </li>
                    </ul>
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  );
};

export default RestaurantMenu;
