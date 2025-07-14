import client from "../utils/client";

export const createConversation = async (data) => {
  try {
    const response = await client.post("/api/conversations/create-conversation", data);
    return response.data;
  } catch (error) {
    console.error("Error creating conversation:", error);
    throw error;
  }
};

export const getConversations = async (id) => {
  try {
    const response = await client.get(`/api/conversations/get-conversations/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting conversations:", error);
    throw error;
  }
};

export const getMessageList = async (conversationId) => {
  try {
    const response = await client.get(`/api/conversations/get-message-list/${conversationId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting message list:", error);
    throw error;
  }
};

export const getActiveConversations = async (userId) => {
  try {
    const response = await client.get(`/api/conversations/get-active-conversations/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting active conversations:", error);
    throw error;
  }
};


export const sendMessage = async (data) => {
  try {
    const response = await client.post("/api/messages/send-message", data);
    return response.data;
  } catch (error) {
    console.error("Error creating conversation:", error);
    throw error;
  }
};


export const markMessageAsRead = async (messageId) => {
  try {
    const response = await client.put(`/api/messages/mark-as-read/${messageId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting active conversations:", error);
    throw error;
  }
};

export const getChatHistory = async (conversationId) => {
  try {
    const response = await client.get(`/api/messages/get-chat-history/${conversationId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting active conversations:", error);
    throw error;
  }
};

export const getConversation = async (data) => {
  try {
    const response = await client.post("/api/conversations/get-conversation/get", data);
    return response.data;
  } catch (error) {
    console.error("Error creating conversation:", error);
    throw error;
  }
};

export const setConversation = async (data) => {
  try {
     const response =  await client.post('/api/conversations/create-conversation', data);

    return response.data
  } catch (error) {
      console.log('Error while calling setConversation API ', error);
  }
}

export const getMessages = async (id) => {
  try {
      let response = await client.get(`/api/messages/message/get/${id}`);
      return response.data
  } catch (error) {
      console.log('Error while calling getMessages API ', error);
  }
}

export const newMessages = async (data) => {
  try {
      return await client.post('/api/messages/message/add', data);
  } catch (error) {
      console.log('Error while calling newConversations API ', error);
  }
}