import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import moviesReducer from "./moviesSlice"
import gptReducer from "./gptSlice"
const appStore=configureStore({//it will have reducer

    reducer:{//and this reducer will have different reducer from different slices

        user:userReducer,
        movies:moviesReducer,
        gpt:gptReducer
    }
})

export default appStore