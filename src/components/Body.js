import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";

const Body = () => {
  const [listOfRestaurant, setListOfRestaurant] = useState([]);
  const [filteredfRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch("https://namastedev.com/api/v1/listRestaurants");
    const jsonData = await data.json();
    // console.log(jsonData);
    setListOfRestaurant(
      jsonData?.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
    setFilteredRestaurant(
      jsonData?.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
  };
  //whenever local state variable updates, React triggers reconciliation cycle

  return listOfRestaurant.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="search-filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />

          <button
            className="search-btn"
            onClick={() => {
              const searchRestaurants = listOfRestaurant.filter((res) => {
                return (
                  res.info.name
                    .toLowerCase()
                    .includes(searchText.toLowerCase()) ||
                  res.info.cuisines.some((cuisine) => {
                    return cuisine
                      .toLowerCase()
                      .includes(searchText.toLowerCase());
                  })
                );
              });
              setFilteredRestaurant(searchRestaurants);
            }}
          >
            Search
          </button>
        </div>

        <div className="filter">
          <button
            className="filter-btn"
            onClick={() => {
              const filteredRestaurants = listOfRestaurant.filter(
                (res) => res.info.avgRating > 4.6
              );
              setFilteredRestaurant(filteredRestaurants);
            }}
          >
            {" "}
            Top Rated Restaurants
          </button>
        </div>
      </div>

      <div className="res-container">
        {filteredfRestaurant.map((restaurant) => {
          return (
            <RestaurantCard
              key={restaurant.info.id}
              resName={restaurant.info.name}
              imageId={restaurant.info.cloudinaryImageId}
              address={restaurant.info.areaName}
              cuisine={restaurant.info.cuisines}
              rating={restaurant.info.avgRating}
              deliveryTime={restaurant.info.sla.slaString}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Body;
