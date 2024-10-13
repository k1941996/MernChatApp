import { Navigate } from "react-router-dom";
import HomePage from "../Pages/Homepage";
import Signup from "../Pages/Signup";
import Login from "../Pages/Login";

const appRoutes = (isLoggedIn) => [
  {
    path: "/",
    element: isLoggedIn ? <HomePage /> : <Navigate to="/login" />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
];
export default appRoutes;
