import { createSlice } from '@reduxjs/toolkit';

// Tạo state mặc định
const initialTransState = {
  data: [],
  isLoading: false,
  error: null,
};

// Tạo Slice trans
const transSlice = createSlice({
  name: 'trans',
  initialState: initialTransState,
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
export const transActions = transSlice.actions;

export default transSlice.reducer;
