import { createSlice } from "@reduxjs/toolkit";

const tvDetailsSlice = createSlice({
    name: "tvDetails",

    initialState: {
        data: null,
        certification: null,
        watchProviders: null,
        seasonEpisodes: null,
    },

    reducers: {
        setTVDetails: (state, action) => {
            state.data = action.payload;
        },

        setTVCertification: (state, action) => {
            state.certification = action.payload;
        },

        setTVWatchProviders: (state, action) => {
            state.watchProviders = action.payload;
        },

        setTVSeasonEpisodes: (state, action) => {
            state.seasonEpisodes = action.payload;
        },

        clearTVDetails: (state) => {
            state.data = null;
            state.certification = null;
            state.watchProviders = null;
            state.seasonEpisodes = null;
        },
    },
});

export const {
    setTVDetails,
    setTVCertification,
    setTVWatchProviders,
    setTVSeasonEpisodes,
    clearTVDetails,
} = tvDetailsSlice.actions;

export default tvDetailsSlice.reducer;