import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './CartSlice/cartSlice'
import authReducer from './CartSlice/authSlice' 

const store = configureStore({
    reducer:{
        auth: authReducer,
        cart:cartReducer 

    }
})
export default store;