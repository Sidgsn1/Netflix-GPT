import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: 'gpt',
    initialState: {
        gptMovies: null,
        movieNames: null,
    },
    reducers: {
        addGptMovieResult : (state,action) => {
            const {geminiMovies,tmdbResults} = action.payload
            state.gptMovies = tmdbResults
            state.movieNames = geminiMovies
        },
        clearGptMovieResult: (state) => {
            state.gptMovies = null;
            state.movieNames = null;
        }
    }
})

export const {addGptMovieResult,clearGptMovieResult} = gptSlice.actions

export default gptSlice.reducer