import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { useAppSelector } from "app/hooks";
import { ReactNode } from "react";
import darkTheme from "theming/dark";
import lightTheme from "theming/light";

interface ThemeWrapperProps {
  children: ReactNode;
}

const ThemeWrapper = ({ children }: ThemeWrapperProps) => {
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <main>
      <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {/* The rest of your application */}
        {children}
      </ThemeProvider>
    </main>
  );
};

export default ThemeWrapper;
