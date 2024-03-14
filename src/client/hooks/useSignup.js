import React from 'react';
import {useState} from 'react';
import {toast} from 'react-hot-toast';
import {useAuthContext} from '../context/AuthContext';

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const {setAuthUser} = useAuthContext();

  const signup = async ({username, password, confirmPassword}) => {
    const success = handleInputErrors({username, password, confirmPassword});
    if (!success) return;

    setLoading(true);
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password, confirmPassword}),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      localStorage.setItem('chat-user', JSON.stringify(data));

      toast.success('User successfully created');
      return data;
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {loading, signup};
};

export default useSignup;

const handleInputErrors = ({username, password, confirmPassword}) => {
  if (!username || !password || !confirmPassword) {
    toast.error('All fields are required');
    return false;
  }
  if (password !== confirmPassword) {
    toast.error('Passwords do not match');
    return false;
  }

  if (password.length < 8) {
    toast.error('Password must be at least 8 characters');
    return false;
  }

  return true;
};
