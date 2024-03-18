import {useState} from 'react';
import useConversation from '../zustand/useConversation';
import {toast} from 'react-hot-toast';

const useDeleteMessage = () => {
  const [loading, setLoading] = useState(false);
  const {messages, setMessages} = useConversation();

  const deleteMessage = async (messageId) => {
    setLoading(true);

    try {
      const response = await fetch(`/api/messages/delete/${messageId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setMessages(messages.filter((message) => message._id !== messageId));
      toast.success('Message deleted');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {loading, deleteMessage};
};

export default useDeleteMessage;
