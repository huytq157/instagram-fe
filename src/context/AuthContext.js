import { createContext, useState, useRef , useEffect} from "react";
import {io} from "socket.io-client"


export const AuthContext = createContext({
  user: undefined,
  setUser: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [activeUsers, setActiveUsers]= useState([])
  const [newMessageFlag, setNewMessageFlag] = useState(false);
  const socket = useRef()

  useEffect(() => {
      // socket.current = io(process.env.REACT_APP_SOCKET_CHAT)
      socket.current = io("https://socket-chat-z7hd.onrender.com/")
    }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, socket, activeUsers, setActiveUsers , newMessageFlag, setNewMessageFlag }}>
      {children}
    </AuthContext.Provider>
  );
};



export default AuthContextProvider;
