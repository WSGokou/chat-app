import {FaRegCircleUser} from 'react-icons/fa6';
import {useAuthContext} from '../../context/AuthContext';
import useConversation from '../../zustand/useConversation';
import {timeConvert} from '../../utils/timeConvert';

const Message = ({message}) => {
  const {authUser} = useAuthContext();
  const {selectedConversation} = useConversation();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = timeConvert(message.createdAt);
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
  const bubbleBgColor = fromMe ? 'bg-blue-500' : 'bg-gray-500';

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <FaRegCircleUser className="w-full h-full" />
        </div>
      </div>
      <div className={`chat-bubble text-white bg-blue-500 ${bubbleBgColor}`}>
        {message.content}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
