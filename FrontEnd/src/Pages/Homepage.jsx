import { useEffect, useState } from "react";
import ChatList from "../Home/ChatList/ChatList";
import ChatWindow from "../Home/ChatWindow/ChatWindow";
import axios from "axios";
import { useSocket } from "../context/SocketContext";

export default function HomePage() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatData, setChatData] = useState([]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  const { socket } = useSocket();
  const getChatsOfSelectedUser = async () => {
    setIsChatLoading(true);
    const senderId = localStorage.getItem("id");
    const res = await axios.post(`/api/message/get/${selectedUser._id}`, { senderId });
    setChatData(res.data);
    setIsChatLoading(false);
  };
  useEffect(() => {
    if (selectedUser) {
      getChatsOfSelectedUser();
    }
  }, [selectedUser]);

  useEffect(() => {
    socket.on("message", (data) => {
      const mesasgeContainer = document.getElementById("scrollWindow");
      window.scrollTo(0, mesasgeContainer.scrollHeight);
      setChatData((prevChats) => [...prevChats, data]);
    });
    return () => socket.off("message");
  }, []);

  return (
    <div className="flex h-screen">
      <ChatList setSelectedUser={setSelectedUser} selectedUser={selectedUser} />
      <ChatWindow
        isChatLoading={isChatLoading}
        chatData={chatData}
        selectedUser={selectedUser}
        setChatData={setChatData}
      />
    </div>
  );
}
