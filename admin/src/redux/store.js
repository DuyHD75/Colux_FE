import { configureStore } from '@reduxjs/toolkit';
import appStateReducer from './reducer/appStateSlice';
import globalLoadingReducer from './reducer/globalLoadingSlice';
import productReducer from './reducer/productSlice';
import dashboardReducer from './reducer/dashboardSlice';
import adminReducer from './reducer/adminSlice';
const store = configureStore({
    reducer: {
      
        appState: appStateReducer,
        globalLoading: globalLoadingReducer,
        products: productReducer,
        dashboard: dashboardReducer,
        admin: adminReducer,
    }
});

export default store;