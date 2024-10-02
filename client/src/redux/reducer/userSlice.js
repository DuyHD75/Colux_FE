import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "User",
  initialState: {
    user: null,
    listFavorites: [],
    listCarts: [],
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {
  setUser,
  // setListFavorites,
  // removeFavorite,
  // addFavorite
} = userSlice.actions;

export default userSlice.reducer;
