import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [
    { id: 1, name: "Interior Paint" },
    { id: 2, name: "Exterior Paint" },
    { id: 3, name: "Bedroom" },
    { id: 4, name: "Living Room" },
    { id: 5, name: "Kitchen Room" },
    { id: 6, name: "Dining room" },
    { id: 7, name: "Floor" },
    { id: 8, name: "Wall Decal" }
  ],
};

export const categoriesSlice = createSlice({
  name: "Categories",
  initialState: initialState,
  reducers: {

  }
})

export default categoriesSlice.reducer;