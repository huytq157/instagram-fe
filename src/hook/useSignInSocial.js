import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { AuthContext } from "../context/AuthContext";
import { setToken } from "../utils/token";


const useSignInSocial = function (loginFunction) {
  const [signInSocialLoading, setSignInSocialLoading] = useState(false);
  const [signInSocialErrorMess, setSignInSocialErrorMess] = useState("");

  const { setUser } = useContext(AuthContext);

  const { mutateAsync } = useMutation(loginFunction);

  const handleSignIn = async function (provider) {
    let toastId;
    setSignInSocialLoading(true);

    try {
      const response = await signInWithPopup(auth, provider);
      const idTokens = await response.user.getIdToken();

      toastId = toast.loading("Account verification...");
      const googleResponse = await mutateAsync({ idTokens });

      if (googleResponse.success) {
        setToken(googleResponse.accessToken, googleResponse.refreshToken);
        setUser(googleResponse.user);
        signOut(auth);
        toast.success("Sign in success", { id: toastId });
      }
    } catch (error) {
      setSignInSocialErrorMess(error.message);
      toast.error("Sign in failed", { id: toastId });
    } finally {
      setSignInSocialLoading(false);
    }
  };

  return {
    handleSignIn,
    signInSocialLoading,
    signInSocialErrorMess,
  };
};

export default useSignInSocial;
