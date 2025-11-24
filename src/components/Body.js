import { resList } from "../utils/constants";
import RestaurantCard from "./RestaurantCard";

const Body = () => {
  return (
    <div className="body">
      <div className="search">Search</div>

      <div className="res-container">
        {resList.map((restaurant) => (
          <RestaurantCard
            key={restaurant.info.id}
            resName={restaurant.info.name}
            deliveryTime={restaurant.info.sla.slaString}
            cuisine={restaurant.info.cuisines}
            adress={restaurant.info.areaName}
            imageId={restaurant.info.cloudinaryImageId}
            rating={restaurant.info.avgRating}
          />
        ))}
      </div>
    </div>
  );
};

export default Body;
