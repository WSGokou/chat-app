import {createContext, useState, useEffect, useContext} from 'react';
import {useAuthContext} from './AuthContext';
import {io} from 'socket.io-client';

export const SocketContext = createContext();
// const ioTarget = 'https://chat.gokou.co.uk';
const ioTarget = 'http://localhost:3001';

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('Socket must be used within an SocketContextProvider');
  }
  return context;
};

export const SocketContextProvider = ({children}) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const {authUser} = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const socket = io(`${ioTarget}`, {
        withCredentials: true,
        query: {
          userId: authUser._id,
        },
      });

      setSocket(socket);

      // socket.on used to listen to events from the server
      socket.on('getOnlineUsers', (users) => {
        setOnlineUsers(users);
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{socket, onlineUsers}}>
      {children}
    </SocketContext.Provider>
  );
};
