import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      (state.currentUser = action.payload),
        (state.error = null),
        (state.loading = false);
    },
    signInfailure: (state, action) => {
      (state.error = action.payload), (state.loading = false);
    },
  },
});

export const { signInStart, signInSuccess, signInfailure } = userSlice.actions;

export default userSlice.reducer;