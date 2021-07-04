import React from "react";

const Message = (props) => {
  return (
    <div className="border message_bubble px-2">
      <p className="text-muted">{props.message.username}</p>
      <p>{props.message.msg}</p>
    </div>
  );
};

export default Message;
