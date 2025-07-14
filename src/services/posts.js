
import client from "../utils/client";

export const addPost = async (post) => {
  const response = await client.post("/api/posts/create", post);
  return response.data;
};

export const getPosts = async (
  limit,
  page,
  type
) => {
  const response = await client.get("/api/posts/gets", {
    params: {
      limit,
      skip: page?.pageParam || 0,
      type,
    },
  });
  return response.data;
};

export const likePost = async (post_id) => {
  const response = await client.post("/api/reaction/like", { post_id });
  return response.data;
};

export const savePost = async (post_id) => {
  const response = await client.post("/api/savepost/save", { post_id });
  return response.data;
};


export const getPost = async (_id) => {
  const response = await client.get(`/api/posts/get/${_id}`);
  return response.data.post;
};

export const HidePost = async (_id) => {
  const response = await client.post(`/api/posts/${_id}/hide`);
  return response.data.post;
};

export const getSavePost = async (_id) => {
  const response = await client.get(`/api/posts/get-savepost/${_id}`);
  return response.data;
};

export const getComment = async (
  post_id,
  parent_id
) => {
  const path = parent_id
    ? `/api/posts/comment/gets/${post_id}?parent_id=${parent_id}`
    : `/api/posts/comment/gets/${post_id}`;

  const response = await client.get(path);
  return response.data.comments;
};

export const createComment = async ({
  post_id,
  comment,
}) => {
  const response = await client.post(
    "/api/posts/comment/create",
    {
      post_id,
      comment,
    }
  );
  return response.data.comment;
};

export const likeComment = async (comment_id) => {
  const response = await client.post("/api/reaction/like-comment", {
    comment_id,
  });
  return response.data;
};

export const replyComment = async (values) => {
  const response = await client.post(
    "/api/posts/reply-comment/create",
    values
  );
  return response.data;
};

export const removePost = async (post_id) => {
  const response = await client.post("/api/posts/remove", { post_id });
  return response.data;
};

export const editPost = async (values) => {
  const response = await client.post(
    `/api/posts/edit/${values._id}`,
    values
  );
  return response.data;
};

export const deleteComment = async (comment_id) => {
  const response = await client.post("/api/posts/comment/remove", { comment_id });
  return response.data;
};
