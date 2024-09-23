import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [
    { id: 1, name: "Interior Paint" },
    { id: 2, name: "Exterior Paint" },
    { id: 3, name: "Bedroom" },
    { id: 4, name: "Living Room" },
    { id: 5, name: "Kitchen Room" },
    { id: 6, name: "Dining Room" },
    { id: 7, name: "Floor" },
    { id: 8, name: "Wall Decal" },
    // { id: 9, name: "All Product"},
  ],
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
  },
});

export const selectCategories = (state) => state.categories.categories;

export default categoriesSlice.reducer;
