import client from "../utils/client";

export const getUserInfoById = async (_id) => {
  const response = await client.get(`/api/users/get/${_id}`);
  return response.data;
};

export const getMyPost = async (_id, page) => {
  const resposne = await client.get(`/api/users/get/posts/${_id}`, {
    params: {
      limit: 6,
      skip: page.pageParam || 0,
    },
  });
  return resposne.data;
};

export const editProfile = async (values) => {
  const response = await client.put("/api/users/edit-profile", values);
  return response.data;
};

export const searchUsers = async (searchText) => {
  const response = await client.get("/api/users/search", {
    params: { searchText },
  });
  return response.data;
};


export const getFollowings = async (userId) => {
  const response = await client.get(`/api/users/get-followings/${userId}`);
  return response.data;
};


export const getFollowers = async (userId) => {
  const response = await client.get(`/api/users/get-followers/${userId}`);
  return response.data;
};

