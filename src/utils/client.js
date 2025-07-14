import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./contants";
import { jwtDecode } from "jwt-decode";
import { refreshToken } from "../services/auth";
import { removeToken, setToken } from "./token";

export const baseURL = process.env.REACT_APP_URL;

const client = axios.create({
  baseURL,
});

let refreshTokenRequest = null;

client.interceptors.request.use(async (config) => {
  let accessToken = localStorage.getItem(ACCESS_TOKEN);

  if (config.baseURL && config.baseURL.includes("/logout")) {
    return config;
  }

  if (accessToken) {
    const decodedToken = jwtDecode(accessToken);

    if (decodedToken.exp * 1000 < new Date().getTime()) {
      if (!localStorage.getItem(REFRESH_TOKEN)) {
        return config;
      }

      try {
        refreshTokenRequest = refreshTokenRequest
          ? refreshTokenRequest
          : refreshToken(localStorage.getItem(REFRESH_TOKEN));

        const response = await refreshTokenRequest;

        accessToken = response.accessToken;

        setToken(response.accessToken, response.refreshToken);

        refreshTokenRequest = null;
      } catch (error) {
        console.log(error);
        removeToken();
      }
    }

    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export default client;
