

import client from "../utils/client";

export const getSuggestAccount = async () => {
  const response = await client.get("/api/follow/suggest-account");
  return response.data.account;
};

export const followUser = async (user_follow) => {
  const response = await client.post("/api/follow/user", { user_follow });
  return response.data;
};
