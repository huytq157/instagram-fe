import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../services/auth";
import { toast } from "react-hot-toast";
import { REFRESH_TOKEN } from "../utils/contants";
import { removeToken } from "../utils/token";
// import { SocketContext } from "../context/SocketContext";

const useLogout = () => {
  const { setUser } = useContext(AuthContext);
//   const { socketRef } = useContext(SocketContext);
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation(logout, {
    onSuccess: (response) => {
      if (response.success) {
        removeToken();
        setUser(null);
        toast.success("Logout success!");
        queryClient.clear();
        // socketRef.current?.disconnect();
      }
    },
    onError: () => {
      toast.error("Logout failed!");
    },
  });

  const handleLogout = async () => {
    const toastId = toast.loading("Logout....");
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    if (!refreshToken) return;
    await mutateAsync({ refreshToken }).finally(() => toast.dismiss(toastId));
  };

  return { isLoading, handleLogout };
};

export default useLogout;
