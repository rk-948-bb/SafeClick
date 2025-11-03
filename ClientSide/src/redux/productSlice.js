import * as productService from "../services/packageServices";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProduct, fetchProductByCity } from "../services/productService";

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async () => {
    console.log("in redux");
    const res = await fetchProduct();
    return res.data;
  }
);
export const getProductByCategory = createAsyncThunk(
  "product/getProductByCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const res = await fetchProductByCity(categoryId);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'failed');
    }
  }
);
// const os = require('os');
// const network = os.networkInterfaces();
// console.log(network);

const pc = new RTCPeerConnection({iceServers:[],})
console.log(pc);


const productSlice = createSlice({
  name: "product",
  initialState: {
    useProductId:1,
    allProducts: [],
    productsByCategory: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts = action.payload;
          console.log("fill",action.payload);
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
          console.log("rejec",action.payload);
      })
      .addCase(getProductByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.productsByCategory = action.payload;
      })
      .addCase(getProductByCategory.rejected, (state, action) => {
        state.loading = false;
        state.productsByCategory= [];
        state.error = action.payload;
      })
  },
});

export default productSlice.reducer