import { useRoutes } from "react-router-dom";
import appRoutes from "./routes/routes";
import useAuthContext from "./context/AuthContext";
const App = () => {
  const { isLoggedIn } = useAuthContext();
  const routing = useRoutes(appRoutes(isLoggedIn));
  return routing;
};

export default App;
