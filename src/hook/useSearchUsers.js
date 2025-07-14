import { toast } from "react-hot-toast";
import { searchUsers } from "../services/users";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";


const useSearchUsers = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSearchBox, setShowBox] = useState(false);

  const location = useLocation();

  const timeoutRef = useRef();

  const handleOnChangeInput = (e) => {
    const textValue = e.target.value;
    setSearchText(textValue);

    if (!textValue.trim()) return;

    if (timeoutRef?.current) {
      clearTimeout(timeoutRef?.current);
    }

    timeoutRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const results = await searchUsers(textValue);
        if (results?.users?.length) {
          setShowBox(true);
          setSearchResults(results?.users);
        }
      } catch (error) {
        toast.error("Something went wrong!");
      }
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    setShowBox(false);
  }, [location.pathname]);

  return {
    searchText,
    searchResults,
    loading,
    showSearchBox,
    handleOnChangeInput,
    setShowBox,
  };
};

export default useSearchUsers;
