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
interface AuthState {
  isLoading: boolean;
  isLoggedIn: boolean;
  user?: UserType;
}

// Define the initial state using that type
const initialState: AuthState = {
  isLoading: true,
  isLoggedIn: false,
  user: undefined,
};

export const authSlice = createSlice({
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
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
  },
});

export const { login, logout, setUser, setLoading } = authSlice.actions;

export default authSlice.reducer;
