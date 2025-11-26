import RestaurantCard, { WithLabel } from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useContext } from "react";
import UserContext from "../utils/UserContext";

const Body = () => {
  const [listOfRestaurant, setListOfRestaurant] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [mode, setMode] = useState("all");

  const PromotedRestaurantCard = WithLabel(RestaurantCard);

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

  function toggleVeg() {
    const x = mode === "veg" ? "all" : "veg";

    if (x === "veg") {
      const searchRestaurant = listOfRestaurant.filter((res) => {
        return res?.info?.veg === true;
      });
      setFilteredRestaurant(searchRestaurant);
    } else {
      setFilteredRestaurant(listOfRestaurant);
    }
    setMode(x);
  }

  function toggleNonVeg() {
    const x = mode === "nonveg" ? "all" : "nonveg";

    if (x === "nonveg") {
      const searchRestaurant = listOfRestaurant.filter((res) => {
        return res?.info?.veg === false;
      });
      setFilteredRestaurant(searchRestaurant);
    } else {
      setFilteredRestaurant(listOfRestaurant);
    }
    setMode(x);
  }

  const { loggedInUser, setUserName } = useContext(UserContext);

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

        <div>
          <label>User Name :</label>
          <input
            type="text"
            value={loggedInUser}
            onChange={(e) => setUserName(e.target.value)}
          />
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

        <div className="veg">
          <button className="veg-btn" onClick={toggleVeg}>
            {" "}
            veg
          </button>
        </div>

        <div className="non-veg">
          <button className="non-veg-btn" onClick={toggleNonVeg}>
            {" "}
            non-veg
          </button>
        </div>
      </div>

      <div className="res-container">
        {filteredRestaurant.map((restaurant) => {
          return (
            <Link
              key={restaurant.info.id}
              to={"/restaurants/" + restaurant.info.id}
            >
              {Number(
                restaurant.info.totalRatingsString.slice(
                  0,
                  restaurant.info.totalRatingsString.indexOf("K")
                )
              ) >= 10 ? (
                <PromotedRestaurantCard
                  key={restaurant.info.id}
                  resName={restaurant.info.name}
                  imageId={restaurant.info.cloudinaryImageId}
                  address={restaurant.info.areaName}
                  cuisine={restaurant.info.cuisines}
                  rating={restaurant.info.avgRating}
                  deliveryTime={restaurant.info.sla.slaString}
                />
              ) : (
                <RestaurantCard
                  key={restaurant.info.id}
                  resName={restaurant.info.name}
                  imageId={restaurant.info.cloudinaryImageId}
                  address={restaurant.info.areaName}
                  cuisine={restaurant.info.cuisines}
                  rating={restaurant.info.avgRating}
                  deliveryTime={restaurant.info.sla.slaString}
                />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Body;
