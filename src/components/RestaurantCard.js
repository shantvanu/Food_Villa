import { IMG_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resName, imageId, adress, cuisine, rating, deliveryTime } = props;

  return (
    <div className="res-card">
      <img alt="res-img" className="logo-img" src={IMG_URL + imageId} />
      <h2>{resName}</h2>
      <h4>
        <ul className="card-list">
          <li>⭐ {rating}</li>
          <li>⏱️ {deliveryTime}</li>
        </ul>
      </h4>
      <h4>{cuisine.join(", ")}</h4>
      <h4>{adress}</h4>
    </div>
  );
};

export default RestaurantCard;
