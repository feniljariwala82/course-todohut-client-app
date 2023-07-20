import { useAppSelector } from "app/hooks";
import { Navigate, useLocation } from "react-router-dom";

const IsGuest = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  if (isLoggedIn) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/tasks" state={{ from: location }} replace />;
  }

  return children;
};

export default IsGuest;
