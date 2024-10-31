import { configureStore } from '@reduxjs/toolkit';
import appStateReducer from './reducer/appStateSlice';
import globalLoadingReducer from './reducer/globalLoadingSlice';
import productReducer from './reducer/productSlice';

const store = configureStore({
    reducer: {
      
        appState: appStateReducer,
        globalLoading: globalLoadingReducer,
        products: productReducer,


    }
});

export default store;