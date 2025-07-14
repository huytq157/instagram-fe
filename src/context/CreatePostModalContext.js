import { createContext, useState } from "react";


export const CreatePostModalContext = createContext({
  isOpen: false,
  post: null,
  action: "create",
  setIsOpen: () => {},
  setPost: () => {},
  setAction: () => {},
});

const CreatePostModalContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [post, setPost] = useState(null);
  const [action, setAction] = useState("create");

  return (
    <CreatePostModalContext.Provider
      value={{ isOpen, setIsOpen, post, setPost, action, setAction }}
    >
      {children}
    </CreatePostModalContext.Provider>
  );
};

export default CreatePostModalContextProvider;
