import { signUp, logIn } from "../services/usersService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
  "user/login",
  async (user, { rejectWithValue }) => {
    try {
      const res = await logIn(user);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Login failed');
    }
  }
);

export const signup = createAsyncThunk(
  "user/signup",
  async (newUser, { rejectWithValue }) => {
    try {
      const res = await signUp(newUser);
      return res.data;
    }
    catch (err) {
      return rejectWithValue(err.response?.data || 'signUp failed');

    }

  }
);
export const userSignout = createAsyncThunk(
  "user/userSignout",
  async (_, { rejectWithValue }) => {
    try {
      // Assuming you have a signout service function
      // await signOut();
      return {}; // Return an empty object or any relevant data
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Signout failed');
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: {},
    newUser: {},
    loginuser: false,
    loading: false,
    error: null,
  },

  reducers: {

  },
  //create asyncThunk מגיע אחרי
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.loginuser = true;
        console.log("redux current",state.currentUser)
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.loginuser = false;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.newUser = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(userSignout.pending, (state) => {
        state.loading = true;
      })
      .addCase(userSignout.fulfilled, (state, action) => {
        state.loading = false;
        state.newUser = {};
        state.currentUser = {};
        state.loginuser = false;
        console.log("user redux signout");
        
      })
      .addCase(userSignout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});
export default userSlice.reducer