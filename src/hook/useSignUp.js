import { useState } from "react";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "../services/auth";


const useSignUp = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { mutateAsync, isLoading } = useMutation(signUp, {
    onSuccess: (response) => {
      if (response.success) {
        setErrorMessage("");
        setSuccessMessage(response.message);
        toast.success("Sign up success");
      }
    },
    onError: (error) => {
      const message = (error).response?.data.message;
      setErrorMessage(message);
      toast.error("Sign up failed");
    },
  });

  const handleSignUp = async (values) => {
    setErrorMessage("");
    setSuccessMessage("");
    const toastId = toast.loading("Account verification...");
    mutateAsync(values).finally(() => toast.dismiss(toastId));
  };

  return {
    handleSignUp,
    isLoading,
    successMessage,
    errorMessage,
  };
};

export default useSignUp;
