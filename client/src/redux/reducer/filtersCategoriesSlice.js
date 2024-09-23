import { createSlice } from '@reduxjs/toolkit';

const filtersByCategory = {
  1: {
    surfaceOptions: [
      'Aluminum',
      'Galvanized Steel',
      'Wood',
      'Stucco',
      'Cement',
      'Plywood',
    ],
    featureOptions: [
      'Bảo vệ bề mặt gỗ đến 5 năm',
      'Chống trầy xước',
      'Chống bám bẩn',
      'Chống rạn nứt',
    ],
  },
  2: { 
    surfaceOptions: [
      'Aluminum',
      'Galvanized Steel',
      'Wood',
      'Stucco',
      'Cement',
      'Plywood',
    ],
    featureOptions: [
      'Bảo vệ bề mặt gỗ đến 5 năm',
      'Chống trầy xước',
      'Chống bám bẩn',
      'Chống rạn nứt',
    ],
  },
  3: {
    surfaceOptions: [
      'Aluminum',
      'Galvanized Steel',
      'Wood',
      'Stucco',
      'Cement',
      'Plywood',
    ],
    featureOptions: [
      'Bảo vệ bề mặt gỗ đến 5 năm',
      'Chống trầy xước',
      'Chống bám bẩn',
      'Chống rạn nứt',
    ],
  },
  4: {
    surfaceOptions: [
      'Aluminum',
      'Galvanized Steel',
      'Wood',
      'Stucco',
      'Cement',
      'Plywood',
    ],
    featureOptions: [
      'Bảo vệ bề mặt gỗ đến 5 năm',
      'Chống trầy xước',
      'Chống bám bẩn',
      'Chống rạn nứt',
    ],
  },
  5: {
    surfaceOptions: [
      'Aluminum',
      'Galvanized Steel',
      'Wood',
      'Stucco',
      'Cement',
      'Plywood',
    ],
    featureOptions: [
      'Bảo vệ bề mặt gỗ đến 5 năm',
      'Chống trầy xước',
      'Chống bám bẩn',
      'Chống rạn nứt',
    ],
  },
  6: {
    surfaceOptions: [
      'Aluminum',
      'Galvanized Steel',
      'Wood',
      'Stucco',
      'Cement',
      'Plywood',
    ],
    featureOptions: [
      'Bảo vệ bề mặt gỗ đến 5 năm',
      'Chống trầy xước',
      'Chống bám bẩn',
      'Chống rạn nứt',
    ],
  },
  7: {
    surfaceOptions: [
      'Wood',
      'Tile',
      'Laminate',
      'Vinyl',
      'Concrete',
    ],
    featureOptions: [
      'Chống trơn trượt',
      'Dễ lau chùi',
      'Chống mài mòn',
    ],
  },
  8: {
    surfaceOptions: [
      'Smooth Wall',
      'Textured Wall',
      'Painted Wall',
      'Glass',
      'Metal',
      'Plastic',
    ],
    featureOptions: [
      'Dễ lau chùi',
      'Chống thấm nước',
      'Không gây bong tróc sơn',
      'Thân thiện với môi trường',
    ],
  },
};



const filterCategoriesSlice = createSlice({
  name: 'filterCategories',
  initialState: filtersByCategory,
  reducers: {
    updateFiltersByCategory: (state, action) => {
      const { category, surfaceOptions, featureOptions } = action.payload;
      if (state[category]) {
        state[category].surfaceOptions = surfaceOptions;
        state[category].featureOptions = featureOptions;
      }
    },
  },
});

export const selectFiltersByCategory = (state, categoryId) => {
  console.log('State:', state);
  console.log('Category ID:', categoryId);
  
  // Lấy bộ lọc theo id
  const categoryFilters = state.filterCategories[categoryId];

  if (!categoryFilters) {
    console.warn(`Category ID '${categoryId}' không tồn tại trong filterCategories.`);
    return { surfaceOptions: [], featureOptions: [] };
  }

  console.log('Selector Filters:', categoryFilters);
  return categoryFilters;
};

// Xuất reducers và selector
export const { updateFiltersByCategory } = filterCategoriesSlice.actions;
export default filterCategoriesSlice.reducer;