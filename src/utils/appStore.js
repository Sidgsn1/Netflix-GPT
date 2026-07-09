import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
const appStore=configureStore({//it will have reducer

    reducer:{//and this reducer will have different reducer from different slices

        user:userReducer,

    }
})

export default appStore