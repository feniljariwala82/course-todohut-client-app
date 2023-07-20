import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface TaskType {
  id: number;
  title: string;
  description: string;
  priority: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

// Define a type for the slice state
interface ThemeState {
  tasks: TaskType[];
}

// Define the initial state using that type
const initialState: ThemeState = {
  tasks: [],
};

export const themeSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTasks: (state, { payload }: PayloadAction<TaskType[]>) => {
      state.tasks = payload;
    },
  },
});

export const { setTasks } = themeSlice.actions;

export default themeSlice.reducer;
