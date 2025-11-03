import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPurchase, fetchPurchaseImpl, postPurchase, postPurchaseImpl } from "../services/purchaseService";

export const addPurchase = createAsyncThunk(
  "purchase/addPurchase",
  async (purchase) => {
    console.log("addPurchase in slice", purchase);
    const res = await postPurchase(purchase);
    console.log(res);

    return res.data;
  }
);

export const getAllPurchases = createAsyncThunk(
  "purchase/getAllPurchases",
  async (userId) => {
    console.log("get all purchases", userId);

    const res = await fetchPurchase(userId);
    return res.data;
  }
);

export const getAllPurchasesImpl = createAsyncThunk(
  "purchase/getAllPurchasesImpl",
  async (userId) => {
    const res = await fetchPurchaseImpl(userId);
    return res.data;
  }
);
export const addPurchaseImpl = createAsyncThunk(
  "purchase/addPurchaseImpl",
  async (pImpl) => {
    console.log("addPurchaseImpl", pImpl);
    const res = await postPurchaseImpl(pImpl);
    return res.data;
  }
);

const purchaseSlice = createSlice({
  name: "purchase",
  initialState: {
    purchase: {},
    historyPurchases: [],
    historyPurchasesImpl: [],
    loading: false,
    error: null,
  },

  reducers: {

  },
  //create asyncThunk מגיע אחרי
  extraReducers: (builder) => {
    builder
      .addCase(addPurchase.pending, (state) => {
        state.loading = true;
        console.log('pending purchase');
      })
      .addCase(addPurchase.fulfilled, (state, action) => {
        state.loading = false;
        console.log('fullfilld purchase', action.payload);

        state.purchase = action.payload;
      })
      .addCase(addPurchase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log('rejected purchase', action.error);
        
      })
      .addCase(getAllPurchasesImpl.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPurchasesImpl.fulfilled, (state, action) => {
        state.loading = false;
        state.historyPurchasesImpl = action.payload;
      })
      .addCase(getAllPurchasesImpl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllPurchases.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPurchases.fulfilled, (state, action) => {
        state.loading = false;
        state.historyPurchases = action.payload;
      })
      .addCase(getAllPurchases.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addPurchaseImpl.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPurchaseImpl.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addPurchaseImpl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});
export default purchaseSlice.reducer