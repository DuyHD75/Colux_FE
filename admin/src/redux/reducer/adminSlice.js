import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    admin: null
  },
  reducers: {
    setAdmin: (state, action) => {
      if (action.payload === null) {
        localStorage.removeItem('admin');
      } else {
        if (typeof window !== "undefined") {
          localStorage.setItem('admin', JSON.stringify(action.payload));
        }
      }
      state.admin = action.payload;
    }
  }
});

export const { setAdmin } = adminSlice.actions;
export default adminSlice.reducer;

