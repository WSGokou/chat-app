import {FaRegCircleUser} from 'react-icons/fa6';
import {useAuthContext} from '../../context/AuthContext';
import useConversation from '../../zustand/useConversation';
import {timeConvert} from '../../utils/timeConvert';
import MessageOptions from './MessageOptions';
import {useEffect} from 'react';

const Message = ({message}) => {
  const {authUser} = useAuthContext();
  const {selectedConversation, selectedMessage, setSelectedMessage} =
    useConversation();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = timeConvert(message.createdAt);
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
  const bubbleBgColor = fromMe ? 'bg-blue-500' : 'bg-gray-500';
  const clickedMessage = selectedMessage?._id === message._id;

  useEffect(() => {
    // This is a cleanup function that runs when the component unmounts
    return () => {
      setSelectedMessage(null);
    };
  }, [setSelectedMessage]);
  // {setSelectedMessage(message._id !== selectedMessage?._id ? message : null)}

  return (
    <div className={`chat ${chatClassName} relative`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <FaRegCircleUser className="w-full h-full" />
        </div>
      </div>
      <div
        className={`chat-bubble text-white bg-blue-500 ${bubbleBgColor}`}
        onClick={() =>
          setSelectedMessage(
            message._id !== selectedMessage?._id ? message : null,
          )
        }
      >
        {message.content}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
      {clickedMessage && <MessageOptions />}
    </div>
  );
};

export default Message;
