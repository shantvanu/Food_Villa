import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [listOfRestaurant, setListOfRestaurant] = useState([]);
  const [filteredfRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  function handleOnClick() {
    const searchRestaurants = listOfRestaurant.filter((res) => {
      return (
        res.info.name.toLowerCase().includes(searchText.toLowerCase()) ||
        res.info.cuisines.some((cuisine) => {
          return cuisine.toLowerCase().includes(searchText.toLowerCase());
        })
      );
    });
    setFilteredRestaurant(searchRestaurants);
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      return handleOnClick();
    }
  };

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

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false) return <h1> Looks Like You Are offline.... </h1>;

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
            onKeyDown={handleKeyDown}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />

          <button className="search-btn" onClick={handleOnClick}>
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
            <Link
              key={restaurant.info.id}
              to={"/restaurants/" + restaurant.info.id}
            >
              <RestaurantCard
                key={restaurant.info.id}
                resName={restaurant.info.name}
                imageId={restaurant.info.cloudinaryImageId}
                address={restaurant.info.areaName}
                cuisine={restaurant.info.cuisines}
                rating={restaurant.info.avgRating}
                deliveryTime={restaurant.info.sla.slaString}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Body;
