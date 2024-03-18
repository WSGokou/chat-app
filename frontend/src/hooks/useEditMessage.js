import {useState} from 'react';
import useConversation from '../zustand/useConversation';
import {toast} from 'react-hot-toast';

const useEditMessage = () => {
  const [loading, setLoading] = useState(false);
  const {messages, setMessages} = useConversation();

  const editMessage = async (messageId, content) => {
    setLoading(true);

    try {
      const response = await fetch(`/api/messages/edit/${messageId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({content}),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);

      const updatedMessages = messages.map((message) =>
        message._id === messageId ? data : message,
      );
      setMessages(updatedMessages);
      toast.success('Message updated');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {loading, editMessage};
};

export default useEditMessage;
