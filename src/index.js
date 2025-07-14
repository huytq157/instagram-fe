import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster, toast } from "react-hot-toast";

import AuthContextProvider from "./context/AuthContext.js";
import SocketContextProvider from "./context/SocketContext.js";
import CreatePostModalContextProvider from "./context/CreatePostModalContext.js";
import UserProvider from "./context/UserProvider.js";

const queryClientOptions = {
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
    mutations: {
      onError: () => {
        toast.error("Something went wrong!");
      },
    },
  },
};

const queryClient = new QueryClient(queryClientOptions);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <UserProvider>

    <AuthContextProvider>
      <CreatePostModalContextProvider>
        <SocketContextProvider>
          <App />
          <Toaster />
        </SocketContextProvider>
      </CreatePostModalContextProvider>
    </AuthContextProvider>
    </UserProvider>
  </QueryClientProvider>
);

reportWebVitals();
