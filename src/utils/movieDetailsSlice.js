import { createSlice } from "@reduxjs/toolkit";

const movieDetailsSlice = createSlice({
    name: "movieDetails",

    initialState: {
        data: null,
        certification: null,
        watchProviders: null
    },

    reducers: {
        setMovieDetails: (state, action) => {
            state.data = action.payload;
        },

        setMovieCertification: (state, action) => {
            state.certification = action.payload;
        },

        setMovieWatchProviders: (state, action) => {
            state.watchProviders = action.payload;
        },

        clearMovieDetails: (state) => {
            state.data = null;
            state.certification = null;
            state.watchProviders = null;
        },
    },
});

export const {
    setMovieDetails,
    setMovieCertification,
    setMovieWatchProviders,
    clearMovieDetails,
} = movieDetailsSlice.actions;

export default movieDetailsSlice.reducer;