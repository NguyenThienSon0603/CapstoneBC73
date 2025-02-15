import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { projectCategoryServices } from "../services/projectCategory.services";

// Khai báo kiểu dữ liệu cho initialState
type categoryInitialState = {
    categoryList: Category["content"] | null;
}

// Khởi tạo giá trị cho initialState
const initialState: categoryInitialState = {
    categoryList: null,
}

// Async thunk để lấy dữ liệu
export const fetchAllCategory = createAsyncThunk<Category["content"], void>(
    "category/fetchAllCategory",
    async (_, { rejectWithValue }) => {
        try {
            const response = await projectCategoryServices.getAllCategory();
            return response.data.content;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Lỗi khi lấy dữ liệu!");
        }
    }
);


const slice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCategory.fulfilled, (state, action) => {
                state.categoryList = action.payload;
            })
    }
})

export const { actions: categoryActions, reducer: categoryReducer } = slice;
