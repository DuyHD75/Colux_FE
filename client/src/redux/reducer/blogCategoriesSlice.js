import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  blogCategories: [
    { id: 1, name: "Trending" },
    { id: 2, name: "Painting Tips" },
    { id: 3, name: "Construction And Maintenance Instructions" },
  ],
};

export const blogCategoriesSlice = createSlice({
  name: 'blogCategories',
  initialState,
  reducers: {
  },
});

export const selectBlogCategories = (state) => state.blogCategories.blogCategories;

export default blogCategoriesSlice.reducer;
