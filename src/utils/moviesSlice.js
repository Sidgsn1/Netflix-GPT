import { createSlice } from "@reduxjs/toolkit";

const moviesSlice=createSlice({
    name:"movies",
    initialState:{
        nowPlayingMovies:null,
        trailerVideo: null,
        popularMovies: null,
        topRatedMovies: null,
        upcomingMovies: null,
        trendingToday: null,
        trendingWeek: null,
        genres: {},
    },
    reducers:{
        addNowPlayingMovies:(state,action)=>{
            state.nowPlayingMovies = action.payload
        },
        addTrailerVideo: (state,action)=>{
            state.trailerVideo = action.payload
        },
        addPopularMovies:(state,action)=>{
            state.popularMovies = action.payload
        },
        addTopRatedMovies:(state,action)=>{
            state.topRatedMovies = action.payload
        },
        addUpcomingMovies: (state,action)=>{
            state.upcomingMovies = action.payload
        },
        addMovieGenres: (state,action)=>{
            state.genres = action.payload
        },
        addTrendingToday: (state, action) => {
            state.trendingToday = action.payload;
        },

        addTrendingWeek: (state, action) => {
            state.trendingWeek = action.payload;
        },
    }
})

export const { addNowPlayingMovies, addTrailerVideo, addPopularMovies, addTopRatedMovies, addUpcomingMovies,addTrendingToday,addTrendingWeek,addMovieGenres } = moviesSlice.actions
export default moviesSlice.reducer