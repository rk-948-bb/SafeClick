import { configureStore } from "@reduxjs/toolkit";
import packageReducer from "../redux/packageSlice"
import purchaseReducer from "../redux/purchaseSlice"
import productReducer from "../redux/productSlice";
import userReducer from '../redux/userSlice';
import categoryReducer from '../redux/categorySlice';

export const store = configureStore({
  reducer: {
    Package: packageReducer,
    Product: productReducer,
    Purchase: purchaseReducer,
    User: userReducer,
    Category: categoryReducer
  },
});