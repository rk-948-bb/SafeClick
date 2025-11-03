import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPackages } from "../services/packageServices";
import { fetchCategory } from "../services/categoryServices";

export const getCategory = createAsyncThunk(
  "packages/getCategory",
  async () => {
    const res = await fetchCategory();
    return res.data;
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categoryList: [],
    loading: false,
    error: null,
  },

  reducers: {

  },
  //create asyncThunc מגיע אחרי
  extraReducers: (builder) => {
    builder
      .addCase(getCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryList = action.payload;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default categorySlice.reducer;
