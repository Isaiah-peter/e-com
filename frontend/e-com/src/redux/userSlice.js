import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: {},
    isFetching: false,
    error: false,
  },

  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    logoutSuccess: (state) => { 
      state.currentUser = {}
      state.isFetching = false
      state.error = false
    }
  },
});

export const { loginFailure, loginStart, loginSuccess, logoutSuccess } = userSlice.actions;
export default userSlice.reducer;
