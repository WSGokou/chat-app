import {FaPen, FaRegCircleUser} from 'react-icons/fa6';
import {useAuthContext} from '../../context/AuthContext';
import useConversation from '../../zustand/useConversation';
import {timeConvert} from '../../utils/timeConvert';
import MessageOptions from './MessageOptions';
import {useEffect} from 'react';
import useEditMessage from '../../hooks/useEditMessage';

const Message = ({message}) => {
  const {authUser} = useAuthContext();
  const {selectedMessage, setSelectedMessage} = useConversation();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = timeConvert(message.createdAt);
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
  const bubbleBgColor = fromMe ? 'bg-blue-500 cursor-pointer' : 'bg-gray-500';
  const clickedMessage = fromMe && selectedMessage?._id === message._id;

  const editingMessage = selectedMessage?.edit;
  const {editMessage} = useEditMessage();

  const handleEditMessage = async (e) => {
    e.preventDefault();
    await editMessage(selectedMessage._id, selectedMessage.content);
    setSelectedMessage(null);
  };

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
        onClick={() => {
          if (!selectedMessage || !selectedMessage.edit)
            setSelectedMessage(
              message._id !== selectedMessage?._id ? message : null,
            );
        }}
      >
        {editingMessage && selectedMessage._id === message._id ? (
          <form onSubmit={handleEditMessage}>
            <input
              type="text"
              value={selectedMessage.content}
              onChange={(e) =>
                setSelectedMessage({
                  ...selectedMessage,
                  content: e.target.value,
                })
              }
              className={`w-full input input-bordered h-10 ${
                editingMessage ? 'block' : 'hidden'
              }`}
            />
          </form>
        ) : (
          message.content
        )}
      </div>
      <div
        className={`chat-footer opacity-50 text-xs flex gap-1 items-center ${
          fromMe && 'flex-row-reverse'
        }`}
      >
        <p>{formattedTime}</p>
        <p>{message.createdAt !== message.updatedAt && <FaPen />}</p>
      </div>
      <div className="absolute">{clickedMessage && <MessageOptions />}</div>
    </div>
  );
};

export default Message;
