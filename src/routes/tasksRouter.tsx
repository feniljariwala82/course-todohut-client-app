import RequireAuth from "middleware/auth/RequireAuth";
import TasksCreatePage from "pages/tasks/Create";
import TasksEditPage from "pages/tasks/Edit";
import TasksIndexPage from "pages/tasks/Index";
import TasksShowPage from "pages/tasks/Show";
import { RouteObject } from "react-router-dom";

const tasksRouter: RouteObject = {
  path: "tasks",
  children: [
    {
      index: true,
      element: (
        <RequireAuth>
          <TasksIndexPage />
        </RequireAuth>
      ),
    },
    {
      path: "create",
      element: (
        <RequireAuth>
          <TasksCreatePage />
        </RequireAuth>
      ),
    },
    {
      path: ":id",
      element: (
        <RequireAuth>
          <TasksShowPage />
        </RequireAuth>
      ),
    },
    {
      path: ":id/edit",
      element: (
        <RequireAuth>
          <TasksEditPage />
        </RequireAuth>
      ),
    },
  ],
};

export default tasksRouter;
