import axios from "axios";
import client, { baseURL } from "../utils/client";

export const signIn = async (data) => {
  const response = await client.post("/api/auth/signin", data);
  return response.data;
};

export const getMe = async () => {
  const response = await client.get("/api/auth/me");
  return response.data;
};

export const signUp = async (data) => {
  const response = await client.post("/api/auth/signup", data);
  return response.data;
};

export const socialLogin = async (data) => {
  const response = await client.post("/api/auth/social", data);
  return response.data;
};

export const sentOtp = async (data) => {
  const response = await client.post("/api/auth/sentOtp", data);
  return response.data;
};

export const Verify = async (data) => {
  const response = await client.post("/api/auth/verifyOtp", data);
  return response.data;
};


export const ResetPassword = async (token, password, confirmPassword) => {
  try {
    const response = await client.post(`/api/auth/resetPassword/${token}`, {
      password: password,
      confirmPassword: confirmPassword,
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi đặt lại mật khẩu", error);
    throw error;
  }
};

export const logout = async (data) => {
  const response = await client.post("/api/auth/logout", data);
  return response.data;
};

export const activeAccount = async (activeToken) => {
  const response = await client.get(`/api/auth/active/${activeToken}`);
  return response.data;
};

export const refreshToken = async (refreshToken) => {
  const response = await axios.post(`${baseURL}/api/auth/refreshToken`, {
    refreshToken,
  });
  return response.data;
};
