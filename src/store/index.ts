import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
// import { projectReducer } from "./projectManagement.slice";
import { categoryReducer } from "./projectCategory.slice";

export const store = configureStore({
    reducer: {
        categoryReducer,
    },
})

export type RootState = ReturnType<(typeof store)['getState']>;

// Định dạng lại useDispatch để dispatch được actionThunk trong TypeScript
type AppDispatch = (typeof store)['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>();