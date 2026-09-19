import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import moviesReducer from "./moviesSlice"
// import gptReducer from "./gptSlice"
import spotlightReducer from "./spotlightSlice";
import watchlistReducer from "./watchlistSlice"
import watchlistUIReducer from "./watchlistUISlice"
import tvReducer from "./tvSlice"
import movieDetailsReducer from "./movieDetailsSlice";
import tvDetailsReducer from "./tvDetailsSlice";
const appStore=configureStore({//it will have reducer

    reducer:{//and this reducer will have different reducer from different slices

        user:userReducer,
        movies:moviesReducer,
        tv:tvReducer,
        spotlight: spotlightReducer,
        watchlist:watchlistReducer,
        watchlistUI:watchlistUIReducer,
        movieDetails: movieDetailsReducer,
        tvDetails: tvDetailsReducer,
    }
})

export default appStore