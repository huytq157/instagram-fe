import { createContext, useContext, useEffect, useRef} from "react";
import { AuthContext } from "./AuthContext";
import { io} from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";
import { notificationKey } from "../utils/react-query-key";

export const SocketContext = createContext({
  socketRef: { current: null },
});

const SocketContextProvider = ({ children }) => {
  const socketRef = useRef(null);
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    socketRef.current = io(process.env.REACT_APP_SOCKET_URL);
  }, [user?._id, socketRef.current]);

  useEffect(() => {
    socketRef.current?.emit("new-connection", user);
  }, [user?._id, socketRef.current]);

  useEffect(() => {
    socketRef.current?.on("return-users", (users) => {
    });
  }, [user?._id, socketRef.current]);

  useEffect(() => {
    socketRef.current?.on(
      "new-notification",
      (notification) => {
        if (Notification.permission === "granted") {
          const notify = new Notification(
            `${notification.from_user?.username}`,
            {
              body: notification.message,
              image: notification?.from_user?.avatar,
              icon: "/images/logo-gradient.png",
            }
          );

          notify.onclick = () => {
            // @ts-ignore
            window.location = notification.url;
          };
        }

        const key = notificationKey.GET_NOTIFICATION;
        const newData = queryClient.getQueryData([key]);
        if (newData) {
          newData.notifications.unshift(notification);
          queryClient.setQueryData([key], newData);
        }
      }
    );
  }, [user?._id, socketRef.current]);

  return (
    <SocketContext.Provider value={{ socketRef: socketRef }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
