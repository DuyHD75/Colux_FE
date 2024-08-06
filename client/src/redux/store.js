import { configureStore } from '@reduxjs/toolkit';
import colorReducer from './reducer/colorSlice';
import categoriesReducer from './reducer/categoriesSlice';
import collectionReducer from './reducer/collectionSlice';
import userReducer from './reducer/useSlice';
import appStateReducer from './reducer/appStateSlice';
import blogReducer from './reducer/blogSlice';
import productReducer from './reducer/productSlice';
import constructedReducer from './reducer/constructedSlice';

const store = configureStore({
    reducer: {
        colorFamilies: colorReducer,
        categories: categoriesReducer,
        collections: collectionReducer,
        user: userReducer,
        appState: appStateReducer,
        blogs: blogReducer,
        products: productReducer,
        constructed: constructedReducer,
    }
});

export default store;