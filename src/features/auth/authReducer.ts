import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserType {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  remember_me_token: string | null;
  created_at: string;
  updated_at: string;
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
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = undefined;
      state.isLoggedIn = false;
    },
    setUser: (state, { payload }: PayloadAction<UserType>) => {
      state.isLoggedIn = true;
      state.user = payload;
    },
  },
});

export const { login, logout, setUser } = themeSlice.actions;

export default themeSlice.reducer;
