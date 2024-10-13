import React from "react";
import Message from "./Message";

const MessageWindow = (props) => {
  const { chatData } = props;
  const id = localStorage.getItem("id");
  return (
    <>
      {!!chatData?.length ? (
        <div>
          {chatData.map((chat) => {
            const received = chat.senderId !== id;
            return <Message message={chat.message} key={chat?._id} received={received} />;
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full"> Say Hi!!</div>
      )}
    </>
  );
};

export default MessageWindow;
