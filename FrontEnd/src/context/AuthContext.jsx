import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const AuthContextProvider = (props) => {
  const { children } = props;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);
  useEffect(() => {
    const email = localStorage.getItem("email");
    const id = localStorage.getItem("id");
    const name = localStorage.getItem("name");
    if (email) {
      setAuthUser({ email, id, name });
      setIsLoggedIn(true);
    }
  }, []);

  const values = { isLoggedIn, setIsLoggedIn, authUser, setAuthUser };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

const useAuthContext = () => useContext(AuthContext);
export default useAuthContext;
