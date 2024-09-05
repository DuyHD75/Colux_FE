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
  ],
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    // Thêm các reducer nếu cần
  },
});

export const selectCategories = (state) => state.categories.categories;

export default categoriesSlice.reducer;
