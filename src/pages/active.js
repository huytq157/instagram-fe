import { useEffect, useContext } from "react";
import { toast } from "react-hot-toast";

// component
import { AuthContext } from "../context/AuthContext";
import { activeAccount } from "../services/auth";
import { setToken } from "../utils/token";
import useQueryParams from "../hook/useQueryParams";

const Active = () => {
  const queryParams = useQueryParams();
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const toastId = toast.loading("Active account...");
      try {
        const response = await activeAccount(
          queryParams.get("activeToken") 
        );
        if (response.success) {
          setToken(response.accessToken, response.refreshToken);
          setUser(response.user);
          toast.success("Active account success", { id: toastId });
        }
      } catch (error) {
        toast.error("Active account failed", { id: toastId });
      }
    })();
  }, []);

  return <></>;
};

export default Active;
