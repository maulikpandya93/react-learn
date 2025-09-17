import { useEffect, useState } from "react";
import apiData from "../utils/api";
import RestaurantCard from "./RestaurantCard";
import { CDN_URL } from "../utils/constants";
import Shimmer from "./Shimmer";

const Body = () => {
  console.log("bodyyyyyyyy");

  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredListOfRestaurants, setFilteredListOfRestaurants] = useState(
    []
  );
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.1414233&lng=72.84855979999999&collection=83631&tags=layout_CCS_Pizza&sortBy=&filters=&type=rcv2&offset=0&page_type=null"
    );
    const json = await data.json();
    setListOfRestaurants(json?.data?.cards || []);
    setFilteredListOfRestaurants(json?.data?.cards || []);
  };

  return !listOfRestaurants?.length ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
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
            onClick={() => {
              console.log(searchText);
              const filteredRestaurants = listOfRestaurants.filter((data) =>
                data?.card?.card?.info?.name?.includes(searchText)
              );
              console.log("🚀 ~ filteredRestaurants:", filteredRestaurants);

              setFilteredListOfRestaurants(filteredRestaurants);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            const filteredRestaurants = listOfRestaurants.filter(
              (data) => data?.card?.card?.info?.avgRating > 4
            );

            setListOfRestaurants(filteredRestaurants);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {filteredListOfRestaurants.map((data) => {
          const {
            name = null,
            cuisines = null,
            avgRating = null,
            sla = null,
          } = data?.card?.card?.info || {};
          return (
            data?.card?.card?.info && (
              <RestaurantCard
                key={data?.card?.card?.info?.id}
                data={{
                  resName: name,
                  cuisine: cuisines?.join(", "),
                  rating: avgRating,
                  deliveryTime: `${sla?.deliveryTime} minutes`,
                  img: `${CDN_URL}/${data?.card?.card?.info?.cloudinaryImageId}`,
                }}
              />
            )
          );
        })}
      </div>
    </div>
  );
};

export default Body;
