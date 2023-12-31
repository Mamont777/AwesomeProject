import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  login: null,
  email: null,
  stateChange: false,
  avatar: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      login: payload.login,
      email: payload.email,
      avatar: payload.avatar,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSignOut: () => initialState,
    updateAvatar: (state, { payload }) => ({
      ...state,
      avatar: payload.avatar,
    }),
    authError: (state, { payload }) => ({
      ...state,
      authError: payload.error,
    }),
  },
});

export const {
  updateUserProfile,
  authStateChange,
  authSignOut,
  updateAvatar,
  authError,
} = authSlice.actions;
export const authReducer = authSlice.reducer;
