import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
     name: "User",
     initialState: {
          user: null,
          listFavorites: [],
          listCarts: [],
     },
     reducers: {
          setUser: (state, action) => {
            state.user = false
          },
     }
});

export const {
     setUser,
} = userSlice.actions;

export default userSlice.reducer;