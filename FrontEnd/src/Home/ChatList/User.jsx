import React from "react";

const User = (props) => {
  const { name, email, isOnline } = props;
  return (
    <div className="flex space-x-4 px-6 py-5 hover:bg-slate-800 duration-300 cursor-pointer">
      <div className={`avatar ${isOnline ? `online` : ""}`}>
        <div className="w-14 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <div>
        <h1>{name}</h1>
        <span>{email}</span>
      </div>
    </div>
  );
};

export default User;
