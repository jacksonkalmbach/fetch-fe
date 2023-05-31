import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  email: string;
}

const initialState: UserState = {
  name: "Jack",
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    clearUser: (state) => {
      state.name = "";
      state.email = "";
    },
  },
});

export const { setName, setEmail, clearUser } = userSlice.actions;

export default userSlice.reducer;
