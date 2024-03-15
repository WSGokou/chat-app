import {useState} from 'react';
import {useAuthContext} from '../context/AuthContext';

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const {setAuthUser} = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);

      localStorage.removeItem('chat-user');
      setAuthUser(null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {loading, logout};
};

export default useLogout;
