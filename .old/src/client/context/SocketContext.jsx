import {createContext, useState, useEffect} from 'react';
import {useAuthContext} from './AuthContext';
import {io} from 'socket.io-client';

export const SocketContext = createContext();

export const SocketContextProvider = ({children}) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const {authUser} = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const newSocket = io('http://localhost:5001', {
        withCredentials: true,
      });

      setSocket(newSocket);

      return () => newSocket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, []);

  return (
    <SocketContext.Provider value={{socket, onlineUsers}}>
      {children}
    </SocketContext.Provider>
  );
};
