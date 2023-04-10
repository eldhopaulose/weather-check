import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { weatherSearchAsync, clearSearch } from "../redux/weatherSlice";

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

  console.log(searchResult);
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleClear}>Clear</button>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
    {searchResult && searchResult.length === 0 ? (
      <>
        <h1>{searchResult.main.temp}</h1>
      </>
    ): (
      <p>No results found</p>
    )}
  </>
      )}
    </div>
  );
}

export default Search;
