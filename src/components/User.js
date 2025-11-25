import React, { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
const User = ({ age }) => {
  const [info, setInfo] = useState(null);

  async function fetchUserData() {
    const data = await fetch("https://api.github.com/users/shantvanu");
    const jsonData = await data.json();
    // console.log(jsonData);
    setInfo(jsonData);
    // console.log(jsonData.name, jsonData.location);
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  // const { location, bio, avatar_url } = info;

  return !info ? (
    <Shimmer />
  ) : (
    <div>
      <h1>
        {" "}
        <img src={info.avatar_url} alt="No Phot as of now" />{" "}
      </h1>
      <h2>Name :- {info?.name}</h2> <h2> Age :- {age} </h2>
      <h4>
        {" "}
        <span>Bio:-{info.bio} </span>{" "}
      </h4>
      <h4>Location : {info.location}</h4>
      <h4>Contact : 9024161201</h4>
    </div>
  );
};

export default User;
