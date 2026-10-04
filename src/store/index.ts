import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import favouriteReducer from "./slices/favouriteSlice";
// import userReducer from "./slices/userSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        favourite: favouriteReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;