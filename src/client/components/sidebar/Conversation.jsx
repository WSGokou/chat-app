import React from 'react';
import {FaRegCircleUser} from 'react-icons/fa6';
import useConversation from '../../zustand/useConversation';

const Conversation = ({conversation, lastIdx}) => {
  const {selectedConversation, setSelectedConversation} = useConversation();

  const isSelected = selectedConversation?._id === conversation._id;

  return (
    <>
      <div
        className={`Conversation-container flex gap-2 items-center hover:bg-blue-500 rounded p-2 py-1 cursor-pointer
    ${isSelected && 'bg-blue-500'}`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className="Avatar-container avatar">
          <div className="w-12 rounded-full">
            <FaRegCircleUser className="w-full h-full" />
          </div>
        </div>

        <div className="Username-container flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">
              {conversation.username.charAt(0).toUpperCase() +
                conversation.username.slice(1)}
            </p>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Conversation;
