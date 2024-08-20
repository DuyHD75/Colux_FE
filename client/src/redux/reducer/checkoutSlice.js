import { createSlice } from '@reduxjs/toolkit';



const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: {
   checkoutData: {}
 },
  reducers: {
    setCheckoutDetail: (state, action) => {
      state.checkoutData = action.payload;
    },
  },
});

export const { setCheckoutDetail } = checkoutSlice.actions;

export default checkoutSlice.reducer;