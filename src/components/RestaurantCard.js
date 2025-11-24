import { IMG_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  // console.log(props);

  const { resName, imageId, address, cuisine, rating, deliveryTime } = props;

  return (
    <div className="res-card">
      <img alt="res-img" className="logo-img" src={IMG_URL + imageId}></img>
      <h3> {resName} </h3>
      <h4>
        <ul className="rating-list">
          <li>⭐{rating}</li>
          <li>⏱︎{deliveryTime}</li>
        </ul>
      </h4>
      <h4> {cuisine.join(", ")} </h4>
      <h4> {address}</h4>
    </div>
  );
};

export default RestaurantCard;
