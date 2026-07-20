import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: 'gpt',
    initialState: {
        showGptSearch: false,
        gptMovies: null,
        movieNames: null,
    },
    reducers: {
        toggleGptSearchView : (state) => {
            state.showGptSearch = !state.showGptSearch
        },
        addGptMovieResult : (state,action) => {
            const {geminiMovies,tmdbResults} = action.payload
            state.gptMovies = tmdbResults
            state.movieNames = geminiMovies
        }
    }
})

export const {toggleGptSearchView, addGptMovieResult} = gptSlice.actions

export default gptSlice.reducer