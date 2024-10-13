import React from "react";
import PropTypes from "prop-types";

const Message = (props) => {
  const { received, message } = props;
  return (
    <div>
      <div className={`chat ${received ? "chat-start" : "chat-end"}`}>
        <div className="chat-bubble ">{message}</div>
      </div>
    </div>
  );
};

export default Message;

Message.proptypes = {
  received: PropTypes.bool,
  message: PropTypes.string,
};
