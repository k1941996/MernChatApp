import React, { useEffect, useState } from "react";
import ChatHeader from "./ChatHeader";
import MessageWindow from "./MessageWindow/MessageWindow";

import { IoMdSend } from "react-icons/io";
import axios from "axios";

const ChatWindow = (props) => {
  const { isChatLoading, chatData, selectedUser, setChatData } = props;
  const [textMessage, setTextMessage] = useState("");
  const sendMessage = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(`/api/message/send/${selectedUser._id}`, {
        message: textMessage,
        senderId: localStorage.getItem("id"),
      });
      setTextMessage("");

      setChatData((prevChats) => [...prevChats, res.data.newMessage]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const mesasgeContainer = document.getElementById("scrollWindow");

    if (mesasgeContainer) {
      mesasgeContainer.scrollTo(0, mesasgeContainer?.scrollHeight);
    }
  }, [chatData]);

  return (
    <div className="bg-slate-950 flex-[3] text-white">
      {selectedUser ? (
        <div className="flex flex-col h-full">
          <div>
            <ChatHeader selectedUser={selectedUser} />
          </div>
          <div className="flex-1 h-0 overflow-y-auto p-4" id="scrollWindow">
            <MessageWindow isChatLoading={isChatLoading} chatData={chatData} />
          </div>
          <form onSubmit={sendMessage}>
            <div className="flex px-6 py-2 bg-gray-600">
              <label className="input input-bordered flex-1 flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  placeholder="Search"
                  value={textMessage}
                  onChange={(e) => setTextMessage(e.target.value)}
                />
                <IoMdSend onClick={sendMessage} className="cursor-pointer" />
              </label>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex h-full items-center justify-center">Select a Person to chat</div>
      )}
    </div>
  );
};

export default ChatWindow;
