import { createSlice } from "@reduxjs/toolkit";

const spotlightSlice = createSlice({
    name: "spotlight",

    initialState: {
        showSpotlight: false,
    },

    reducers: {

        openSpotlight: (state) => {
            state.showSpotlight = true;
        },

        closeSpotlight: (state) => {
            state.showSpotlight = false;
        },

    },
});

export const {
    openSpotlight,
    closeSpotlight,
} = spotlightSlice.actions;

export default spotlightSlice.reducer;