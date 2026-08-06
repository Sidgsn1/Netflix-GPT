import { createSlice } from "@reduxjs/toolkit";

const watchlistSlice = createSlice({
    name:"watchlist",
    initialState:{
        movies:[],
    },
    reducers:{
        addMovie: (state, action) => {
            const mediaExist = state.movies.some(
                (movie) =>
                    movie.movieId === action.payload.movieId &&
                    movie.mediaType === action.payload.mediaType
            );

            if (mediaExist) return;

            state.movies.push(action.payload);
        },
        removeMovie: (state, action) => {
            state.movies = state.movies.filter(
                (movie) =>
                    !(
                        movie.movieId === action.payload.movieId &&
                        movie.mediaType === action.payload.mediaType
                    )
            );
        },
        setWatchlist:(state,action)=>{
            state.movies=action.payload
        }
    }
})

export const{addMovie,removeMovie,setWatchlist}=watchlistSlice.actions
export default watchlistSlice.reducer