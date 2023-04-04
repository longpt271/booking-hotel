import { createSlice } from '@reduxjs/toolkit';

// Tạo state mặc định
const initialHomeState = {
  data: [],
  isLoading: false,
  error: null,
};

// Tạo Slice home
const homeSlice = createSlice({
  name: 'home',
  initialState: initialHomeState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Phương thức tạo actions
export const homeActions = homeSlice.actions;

export default homeSlice.reducer;
