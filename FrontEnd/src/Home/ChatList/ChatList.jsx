import React, { useEffect, useState } from "react";
import Search from "../../Components/Search/Search";
import { BsChatRightTextFill } from "react-icons/bs";
import { RiLogoutCircleRLine } from "react-icons/ri";
import Users from "./Users";
import axios from "axios";
import UserLoading from "../../Components/Search/Loading/UserLoading";

const ChatList = (props) => {
  const { setSelectedUser, selectedUser } = props;
  const [allUsers, setAllUsers] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const getAllUsers = async () => {
    setLoading(true);
    const res = await axios.get("/api/user/getAllUsers");

    setAllUsers(res.data.users);
    setLoading(false);
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="flex flex-1">
      <div className="w-[10%] p-4 flex flex-col justify-between items-center">
        <div className="hover:bg-slate-600 duration-300 p-4 rounded-full">
          <BsChatRightTextFill fontSize={20} />
        </div>
        <div>
          <RiLogoutCircleRLine fontSize={24} />
        </div>
      </div>

      <div className="w-[90%] bg-black text-white flex flex-col">
        <div>
          <h1 className="font-bold text-3xl p-2 px-11">Chats</h1>
          <Search />
          <hr />
        </div>
        <div className="flex-1 overflow-y-auto h-0">
          {isLoading ? (
            <UserLoading />
          ) : (
            <Users allUsers={allUsers} setSelectedUser={setSelectedUser} selectedUser={selectedUser} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatList;
