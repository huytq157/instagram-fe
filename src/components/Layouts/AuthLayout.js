import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Box } from "@mui/system";
import useQueryParams from "../../hook/useQueryParams";

const AuthLayout = ({ children }) => {
  const { user } = useContext(AuthContext);
  const queryParams = useQueryParams();

  if (user) {
    return <Navigate to={queryParams.get("redirect") || "/"} />;
  }

  return <Box>{children}</Box>;
};

export default AuthLayout;
