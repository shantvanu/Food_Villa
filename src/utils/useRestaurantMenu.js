import { useState, useEffect } from "react";
import { MENU_API } from "./constants";

const useRestaurantMenu = (resID) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, [resID]);

  const fetchMenu = async () => {
    const data = await fetch(MENU_API + encodeURIComponent(resID));
    const jsonData = await data.json();
    setResInfo(jsonData.data);
  };

  return resInfo;
};

export default useRestaurantMenu;
