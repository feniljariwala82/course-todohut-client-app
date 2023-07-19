import Navbar from "components/Navbar";
import IsGuest from "middleware/auth/IsGuest";
import RequireAuth from "middleware/auth/RequireAuth";
import LoginPage from "pages/auth/Login";
import SignupPage from "pages/auth/Signup";
import ErrorIndexPage from "pages/errors/Index";
import TasksIndexPage from "pages/tasks/Index";
import { createBrowserRouter } from "react-router-dom";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    errorElement: <ErrorIndexPage />,
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
        path: "login",
        element: (
          <IsGuest>
            <LoginPage />
          </IsGuest>
        ),
      },
      {
        path: "signup",
        element: (
          <IsGuest>
            <SignupPage />
          </IsGuest>
        ),
      },
      {
        path: "tasks",
        children: [
          {
            index: true,
            element: <TasksIndexPage />,
          },
        ],
      },
    ],
  },
]);

export default Router;
