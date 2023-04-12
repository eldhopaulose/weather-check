import React, { useState } from "react";
import {
  FaCloud,
  FaSun,
  FaCloudSun,
  FaCloudRain,
  FaSnowflake,
} from "react-icons/fa";
import { BsDropletFill, BsWind } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { weatherSearchAsync, clearSearch } from "../redux/weatherSlice";
import "./Search.scss";

function Search() {
  const dispatch = useDispatch();
  const { searchQuery, searchResult, isLoading } = useSelector(
    (state) => state.weather
  );
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    dispatch(weatherSearchAsync(query));
  };

  const handleClear = () => {
    dispatch(clearSearch());
    setQuery("");
  };

  const weatherIcon = () => {
    const weatherId = searchResult.weather[0].id;
    if (weatherId >= 200 && weatherId < 300) {
      return <FaCloudRain />;
    } else if (weatherId >= 300 && weatherId < 600) {
      return <FaCloudRain />;
    } else if (weatherId >= 600 && weatherId < 700) {
      return <FaSnowflake />;
    } else if (weatherId === 800) {
      return <FaSun />;
    } else {
      return <FaCloud />;
    }
  };

  console.log(searchResult);
  return (
    <div>
      <input
        className="input-field"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="button-18" role="button" type="submit" onClick={handleSearch}>
        Search
      </button>
      <button className="button-18" role="button" onClick={handleClear}>
        Clear
      </button>
      {isLoading ? (
        <div className="spinner">
          <div className="dot1"></div>
          <div className="dot2"></div>
        </div>
      ) : searchResult &&
        searchResult.main &&
        searchResult.main.temp &&
        searchResult.name ? ( // Add null checks for searchResult and main.temp
        <>
          <div className="container main-container card">
            <h1 className="">{searchResult.name}</h1>
            <div>
            <h1 className="componet-center">{Math.round(searchResult.main.temp - 273.15)}°C</h1>
            </div>
            <div className="componet-center">
             <h5>{searchResult.weather[0].description}</h5>
            </div>
            <div>
              <h4><BsDropletFill /> {searchResult.main.humidity}%</h4>
            </div>
            <div>
              <h4><BsWind /> {searchResult.wind.speed} m/s</h4>
              <h1 className="weather-icon">{weatherIcon()}</h1>
            </div>
            <div>
            
            </div>
          </div>
        </>
      ) : (
        <div className="card container">
          <h4>No weather data found </h4>
        </div>
      )}
    </div>
  );
}

export default Search;
