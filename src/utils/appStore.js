import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import moviesReducer from "./moviesSlice"
import gptReducer from "./gptSlice"
import watchlistReducer from "./watchlistSlice"
import watchlistUIReducer from "./watchlistUISlice"
const appStore=configureStore({//it will have reducer

    reducer:{//and this reducer will have different reducer from different slices

        user:userReducer,
        movies:moviesReducer,
        gpt:gptReducer,
        watchlist:watchlistReducer,
        watchlistUI:watchlistUIReducer
    }
})

export default appStore