import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  userId: "",
  isAuthed: false,
  users: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.isAuthed = true;
    },
    logout() {
      return initialState;
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;



