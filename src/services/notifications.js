import client from "../utils/client";

export const createNotification = async (
  values
) => {
  const response = await client.post("/api/notifications/create", values);
  return response.data;
};

export const getNotification = async () => {
  const response = await client.get(
    "/api/notifications/gets"
  );
  return response.data;
};

export const updateStatusSeen = async () => {
  const response = await client.put("/api/notifications/update-seen");
  return response.data;
};
