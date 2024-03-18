import {useEffect} from 'react';
import {useSocketContext} from '../context/SocketContext';
import useConversation from '../zustand/useConversation';

const useListenMessages = () => {
  const {socket} = useSocketContext();
  const {messages, setMessages} = useConversation();

  useEffect(() => {
    socket?.on('newMessage', (newMessage) => {
      setMessages([...messages, newMessage]);
    });

    socket?.on('deleteMessage', (messageId) => {
      setMessages(messages.filter((message) => message._id !== messageId));
    });

    socket?.on('editMessage', (updatedMessage) => {
      setMessages(
        messages.map((message) =>
          message._id === updatedMessage._id ? updatedMessage : message,
        ),
      );
    });

    return () => socket?.off('newMessage');
  }, [socket, setMessages, messages]);
};

export default useListenMessages;
