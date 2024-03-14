import {useEffect, useState} from 'react';
import {toast} from 'react-hot-toast';

const useGetConversations = () => {
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState([]);

  const getConversations = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setConversations(data);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getConversations();
  }, []);

  return {conversations, loading};
};

export default useGetConversations;
