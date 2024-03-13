import React from 'react';
import {FaRegCircleUser} from 'react-icons/fa6';

const Conversation = () => {
  return (
    <>
      <div className="Conversation container flex gap-2 items-center hover:bg-blue-500 rounded p-2 py-1 cursor-pointer">
        <div className="Avatar-container avatar">
          <div className="w-12 rounded-full">
            <FaRegCircleUser className="w-full h-full" />
          </div>
        </div>

        <div className="Username-container flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">Goku</p>
          </div>
        </div>
      </div>

      <div className="divider my-0 py-0 h-1" />
    </>
  );
};

export default Conversation;
