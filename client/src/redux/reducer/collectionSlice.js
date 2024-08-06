import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  collections: [
    {id: 1, name: "Top 50 Colors", listCode: ["#b0212a", "#93161f", "#8a181f", "#942425", "#bf4a60"]},
    {id: 2, name: "Colormix Forecast", listCode: ["#ffb801", "#f8c452", "#ffe298", "#f4d77f", "#efd59c"]},
    {id: 3, name: "Historic Paint Colors", listCode: ["#b0212a", "#93161f", "#8a181f", "#942425", "#bf4a60"]},
    {id: 4, name: "Emerald Designer Edition", listCode: ["#b0212a", "#93161f", "#8a181f", "#942425", "#bf4a60"]},
    {id: 5, name: "Pottery Barn", listCode: ["#b0212a", "#93161f", "#8a181f", "#942425", "#bf4a60"]},
    {id: 6, name: "Rejuvenation", listCode: ["#b0212a", "#93161f", "#8a181f", "#942425", "#bf4a60"]},
    {id: 7, name: "West Elm", listCode: ["#b0212a", "#93161f", "#8a181f", "#942425", "#bf4a60"]},
    {id: 8, name: "Finest Whites & Neutrals", listCode: ["#b0212a", "#93161f", "#8a181f", "#942425", "#bf4a60"]}
  ],
};
  
  export const collectionSlice = createSlice({
    name: "Collections",
    initialState: initialState,
    reducers: {

    }
  })
  
  export default collectionSlice.reducer;