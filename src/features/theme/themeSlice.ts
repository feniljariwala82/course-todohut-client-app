import { MantineThemeOverride } from "@mantine/core";
import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface ThemeState {
  theme: MantineThemeOverride;
}

// Define the initial state using that type
const initialState: ThemeState = {
  theme: { colorScheme: "dark" },
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      if (state.theme.colorScheme === "dark") {
        state.theme.colorScheme = "light";
      } else {
        state.theme.colorScheme = "dark";
      }
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
