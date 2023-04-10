import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './redux/weatherSlice';
import thunkMiddleware from 'redux-thunk';

const store = configureStore({
  reducer: {
    weather: weatherReducer,
  }, 
  middleware: [thunkMiddleware],
});

export default store;