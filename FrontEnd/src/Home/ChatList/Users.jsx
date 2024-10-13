import React from "react";
import User from "./User";
import { useSocket } from "../../context/SocketContext";

const Users = (props) => {
  const { allUsers, selectedUser, setSelectedUser } = props;
  const { onlineUsers } = useSocket();

  return (
    <div>
      {allUsers?.length
        ? allUsers.map((e) => {
            const isOnline = onlineUsers?.includes(e._id);
            return (
              <div
                key={e._id}
                className={`${selectedUser?.email === e.email ? `bg-slate-900` : ""}`}
                onClick={() => setSelectedUser(e)}
              >
                <User email={e.email} name={e.name} id={e._id} isOnline={isOnline} />
                <hr className="border-slate-800" />
              </div>
            );
          })
        : null}
    </div>
  );
};

export default Users;
