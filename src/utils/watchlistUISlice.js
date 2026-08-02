import { createSlice } from "@reduxjs/toolkit";

const watchlistUISlice = createSlice({
    name: "watchlistUI",

    initialState: {
        filter: "all",
        sortBy: "Recently Added",
        view: "grid",
    },

    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload;
        },

        setSortBy: (state, action) => {
            state.sortBy = action.payload;
        },

        setView: (state, action) => {
            state.view = action.payload;
        },
    },
});

export const {
    setFilter,
    setSortBy,
    setView,
} = watchlistUISlice.actions;

export default watchlistUISlice.reducer;