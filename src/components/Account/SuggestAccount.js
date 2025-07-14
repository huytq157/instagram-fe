import { Box, Typography } from "@mui/material";
import AccountProfile from "./AccountProfile";
import { useQuery } from "@tanstack/react-query";
import AccountItem from "./AccountItem";
import { accountKey } from "../../utils/react-query-key";
import { getSuggestAccount } from "../../services/follow";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import AccountItemSkeleton from "../Sleketon/AccountItemSkeleton";
import Fail from "../Sleketon/Fail";

const SuggestAccount = () => {
  const { user } = useContext(AuthContext);
  const { data, isLoading, isError, isFetching } = useQuery(
    [accountKey.GET_SUGGEST_ACCOUNT],
    getSuggestAccount
  );

  if (isError) {
    return<Fail/>;
  }

  return (
    <Box>
      <AccountProfile />
      <Box sx={{ mt: 3 }}>
        <Typography variant="overline" display="block" gutterBottom>
          Gợi ý cho bạn
        </Typography>

        {isLoading && <AccountItemSkeleton/>}

        {data?.map((account) => (
          <Box key={account._id}>
            {account?._id !== user?._id && (
              <AccountItem isFetching={isFetching} account={account} />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SuggestAccount;
