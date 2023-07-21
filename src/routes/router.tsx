import Navbar from "components/Navbar";
import IsGuest from "middleware/auth/IsGuest";
import LoginPage from "pages/auth/Login";
import SignupPage from "pages/auth/Signup";
import ErrorIndexPage from "pages/errors/Index";
import { createBrowserRouter } from "react-router-dom";
import tasksRouter from "routes/tasksRouter";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    errorElement: <ErrorIndexPage />,
    children: [
      {
        index: true,
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
      /**
       * tasks router
       */
      tasksRouter,
    ],
  },
]);

export default Router;
