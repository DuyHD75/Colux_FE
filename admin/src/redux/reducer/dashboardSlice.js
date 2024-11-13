import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dashboard: {
    customers: {
      type: "customers",
      title: "Tổng số khách hàng",
      value: 0
    },
    totalProduct: 0,
    totalOrder: 0,
    totalBrand: 0,
    products: [],
    thisWeekData: [],
    lastWeekData: [],
    transactions: [],
    registrations: []
  }
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDashboardData: (state, action) => {
      state.dashboard = action.payload;
    }
  }
});

export const { setDashboardData } = dashboardSlice.actions;
export default dashboardSlice.reducer;
