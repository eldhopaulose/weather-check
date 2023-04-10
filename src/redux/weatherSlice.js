import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    searchQuery: '',
    searchResault: {},
    isLoading: false,
  },
  reducers: {
    search: (state, action) => {
      state.searchQuery = action.payload;
      state.isLoading = true;
    },
    searchSuccess: (state, action) => {
        state.searchResult = action.payload;
        state.isLoading = false;
      },
    searchError: (state) => {
      state.searchResault = {};
      state.isLoading = false;
    },
    clearSearch: (state) => {
      state.searchQuery = "";
      state.searchResault = {};
    },
  },
});

export const { search, searchSuccess, searchError, clearSearch } = weatherSlice.actions;


export const weatherSearchAsync = (query) => async (dispatch) => {
  try {
    dispatch(search(query));
    const response = await axios.post(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=55ac5c584ff8bf5c6b35049608ecff56`);
    dispatch(searchSuccess(response.data));
  } catch (error) {
    dispatch(searchError());
  }
};

export default weatherSlice.reducer;
