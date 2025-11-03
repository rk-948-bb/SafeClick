import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPackages } from "../services/packageServices";

export const getPackages = createAsyncThunk(
  "packages/getPackages",
  async () => {
    const res = await fetchPackages();
    return res.data;
  }
)

export const choosePackage = createAsyncThunk(
  "packages/choosePackage",
  async (packid) => {
   
  }
)

const packagesSlice = createSlice({
  name: "packages",
  initialState: {
    packageId: -1,
    packages: [],
    loading: false,
    error: null,
  },

  reducers: {

  },
  //create asyncThunc מגיע אחרי
  extraReducers: (builder) => {
    builder
      .addCase(getPackages.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPackages.fulfilled, (state, action) => {
        state.loading = false;
        state.packages = action.payload;
      })
      .addCase(getPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(choosePackage.pending, (state) => {
        state.loading = true;
      })
      .addCase(choosePackage.fulfilled, (state,action) => {
        state.loading = false;
        state.packageId = action.payload;
        console.log("in choosePack redux", state.packageId);
      })
      .addCase(choosePackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default packagesSlice.reducer;
