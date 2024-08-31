import { configureStore } from '@reduxjs/toolkit';
import colorFamiliesReducer from './reducer/colorFamiliesSlice';
import categoriesReducer from './reducer/categoriesSlice';
import collectionReducer from './reducer/collectionSlice';
import userReducer from './reducer/useSlice';
import appStateReducer from './reducer/appStateSlice';
import blogReducer from './reducer/blogSlice';
import productReducer from './reducer/productSlice';
import constructedReducer from './reducer/constructedSlice';
import globalLoadingReducer from './reducer/globalLoadingSlice';

const store = configureStore({
    reducer: {
        colorFamilies: colorFamiliesReducer,
        categories: categoriesReducer,
        collections: collectionReducer,
        user: userReducer,
        appState: appStateReducer,
        blogs: blogReducer,
        products: productReducer,
        constructed: constructedReducer,
        globalLoading: globalLoadingReducer,
    }
});

export default store;