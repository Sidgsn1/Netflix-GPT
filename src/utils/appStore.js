import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import moviesReducer from "./moviesSlice"
const appStore=configureStore({//it will have reducer

    reducer:{//and this reducer will have different reducer from different slices

        user:userReducer,
        movies:moviesReducer,
    }
})

export default appStore