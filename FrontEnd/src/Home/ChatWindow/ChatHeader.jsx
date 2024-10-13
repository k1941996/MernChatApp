import React from "react";
import { useSocket } from "../../context/SocketContext";

const ChatHeader = (props) => {
  const { selectedUser } = props;
  const { onlineUsers } = useSocket();
  const isOnline = onlineUsers.includes(selectedUser._id);
  return (
    <div className="p-4 px-6 flex items-center gap-4 bg-gray-900">
      <div className={`avatar ${isOnline ? `online` : ""}`}>
        <div className="w-14 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <div>
        <div className="font-semibold text-xl">{selectedUser?.name}</div>
        {isOnline && <div className="text-xs">Online</div>}
      </div>
    </div>
  );
};

export default ChatHeader;
