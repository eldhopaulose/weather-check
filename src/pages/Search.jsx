import React, { useState } from "react";
import { FaCloud, FaSun, FaCloudSun, FaCloudRain, FaSnowflake } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { weatherSearchAsync, clearSearch } from "../redux/weatherSlice";
import './Search.scss'

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
      <button className="button-18" role="button" onClick={handleSearch}>Search</button>
      <button className="button-18" role="button" onClick={handleClear}>Clear</button>
      {isLoading ? (
        <div class="spinner">
        <div class="dot1"></div>
        <div class="dot2"></div>
      </div>
      ) : (
        searchResult && searchResult.main && searchResult.main.temp && searchResult.name ? ( // Add null checks for searchResult and main.temp

          <>
           <div className="container main-container card">
           <h1>{searchResult.name}</h1>
            <div>
              {weatherIcon()} {searchResult.weather[0].description}
            </div>
            <div>Temperature: {searchResult.main.temp}°C</div>
            <div>Humidity: {searchResult.main.humidity}%</div>
            <div>Wind Speed: {searchResult.wind.speed} m/s</div>
           </div>
          </>

        ) : (
          <div className="card container">
            <h4>Temperature not found</h4> 
          </div>
        )
      )}
    </div>
  );
}

export default Search;
