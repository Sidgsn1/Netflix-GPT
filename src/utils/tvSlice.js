import { createSlice } from "@reduxjs/toolkit";

const tvSlice=createSlice({
    name:"tvShows",
    initialState: {
        airingToday: null,
        popularTV: null,
        topRatedTV: null,
        onTheAir: null,
        genres: {},
    },
        reducers: {

        addAiringTodayTV: (state, action) => {
            state.airingToday = action.payload;
        },

        addPopularTV: (state, action) => {
            state.popularTV = action.payload;
        },

        addTopRatedTV: (state, action) => {
            state.topRatedTV = action.payload;
        },

        addOnTheAirTV: (state, action) => {
            state.onTheAir = action.payload;
        },

        addTVGenres: (state, action) => {
            state.genres = action.payload;
        },
    },
})

export const {addAiringTodayTV,addOnTheAirTV,addPopularTV,addTVGenres,addTopRatedTV}=tvSlice.actions
export default tvSlice.reducer