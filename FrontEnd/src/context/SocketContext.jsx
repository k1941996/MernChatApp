import React, { createContext, useContext, useEffect, useState } from "react";
import useAuthContext from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();
const SocketContextProvider = (props) => {
  const { children } = props;
  const { authUser } = useAuthContext();

  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (authUser) {
      const socket = io({
        query: {
          userId: authUser.id,
        },
      });
      setSocket(socket);
      socket.on("onlineUsers", (users) => {
        setOnlineUsers(users);
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};

export const useSocket = () => useContext(SocketContext);
export default SocketContextProvider;
