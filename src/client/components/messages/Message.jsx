import React from 'react';
import {FaRegCircleUser} from 'react-icons/fa6';

const Message = () => {
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <FaRegCircleUser className="w-full h-full" />
        </div>
      </div>
      <div className="chat-bubble text-white bg-blue-500">
        Hey, how are you?
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        12:33
      </div>
    </div>
  );
};

export default Message;
