"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface User {
  userName: string;
  password: string;
}

const initialState: User = {
  userName: "",
  password: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername: (state,action) => {
      state.userName = action.payload;
    },
    setPassword: (state,action) => {
      state.password = action.payload;
    },
  },
});

export const { setUsername,setPassword } = userSlice.actions;
export default userSlice.reducer;
