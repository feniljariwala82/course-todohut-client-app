import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserType {
  firstName: string;
  lastName: string;
  email: string;
}

// Define a type for the slice state
interface ThemeState {
  isLoggedIn: boolean;
  user?: UserType;
}

// Define the initial state using that type
const initialState: ThemeState = {
  isLoggedIn: false,
  user: undefined,
};

export const themeSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<UserType>) => {
      state.user = payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = undefined;
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = themeSlice.actions;

export default themeSlice.reducer;
