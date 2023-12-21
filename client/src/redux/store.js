// store.js
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './reducers/authSlice'; // We'll create this file next

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export default store;