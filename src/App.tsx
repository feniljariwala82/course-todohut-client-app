import { Button, Stack, Text } from "@mantine/core";
import { useAppDispatch } from "app/hooks";
import { toggleTheme } from "features/theme/themeSlice";

const App = () => {
  const dispatch = useAppDispatch();
  const changeThemeHandler = () => dispatch(toggleTheme());

  return (
    <Stack align="center" mt={50}>
      <Text size="xl" weight={500}>
        Welcome to Mantine!
      </Text>
      <Button variant="light" onClick={changeThemeHandler}>
        Toggle Theme
      </Button>
    </Stack>
  );
};

export default App;
