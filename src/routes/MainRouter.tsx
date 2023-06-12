import Navbar from "components/Navbar";
import LoginPage from "pages/auth/Login";
import ErrorIndexPage from "pages/errors/Index";
import { createBrowserRouter } from "react-router-dom";

const mainRouter = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    errorElement: <ErrorIndexPage />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  },
]);

export default mainRouter;
