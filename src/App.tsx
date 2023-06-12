import { Button, Link, Typography } from "@mui/material";
import { useAppDispatch } from "app/hooks";
import { toggleTheme } from "features/theme/themeSlice";

const App = () => {
  const dispatch = useAppDispatch();

  const onThemeToggleHandler = () => dispatch(toggleTheme());

  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}.
      <Button
        variant="contained"
        color="primary"
        onClick={onThemeToggleHandler}
      >
        Outlined
      </Button>
    </Typography>
  );
};

export default App;
