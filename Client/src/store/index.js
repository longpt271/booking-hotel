import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './auth';
import toastReducer from './toast';
import homeReducer from './home';
import transReducer from './trans';

// Tạo Redux store
const store = configureStore({
  reducer: {
    // auth: authReducer,
    toast: toastReducer,
    home: homeReducer,
    trans: transReducer,
  },
});

export default store;
