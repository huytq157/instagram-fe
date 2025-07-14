import { createBrowserRouter } from "react-router-dom";

import { lazy } from "react";
import AuthLayout from "../components/Layouts/AuthLayout";
import MainLayout from "../components/Layouts/MainLayout";
import ProtecedLayout from "../components/Layouts/ProtecedLayout";
import DetailsPost from "../components/Post/DetailsPost";

const Home = lazy(() => import("../pages"));
const SignIn = lazy(() => import("../pages/signin"));
const SignUp = lazy(() => import("../pages/signup"));
const Active = lazy(() => import("../pages/active"));
const Forgot = lazy(() => import("../pages/forgot"));
const Verify = lazy(() => import("../pages/verify"));
const Reset = lazy(() => import("../pages/reset"));
const Profile = lazy(() => import("../pages/profile"));
const EditProfile = lazy(() => import("../pages/editprofile"));
const Explore = lazy(() => import("../pages/explore"));
const Messages = lazy(() => import("../pages/messages"));

const routers = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtecedLayout>
        <MainLayout>
          <Home />
        </MainLayout>
      </ProtecedLayout>
    ),
  },

  {
    path: "/signin",
    element: (
      <AuthLayout>
        <SignIn />
      </AuthLayout>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthLayout>
        <SignUp />
      </AuthLayout>
    ),
  },
  {
    path: "/active",
    element: (
      <AuthLayout>
        <Active />
      </AuthLayout>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <AuthLayout>
        <Forgot />
      </AuthLayout>
    ),
  },
  {
    path: "/verify",
    element: (
      <AuthLayout>
        <Verify />
      </AuthLayout>
    ),
  },
  {
    path: "/reset/:token",
    element: (
      <AuthLayout>
        <Reset />
      </AuthLayout>
    ),
  },
  {
    path: "/profile/:_id",
    element: (
      <ProtecedLayout>
        <MainLayout>
          <Profile />
        </MainLayout>
      </ProtecedLayout>
    ),
  },

  {
    path: "/edit-profile",
    element: (
      <ProtecedLayout>
        <MainLayout>
          <EditProfile />
        </MainLayout>
      </ProtecedLayout>
    ),
  },

  {
    path: "/explore",
    element: (
      <ProtecedLayout>
        <MainLayout>
          <Explore />
        </MainLayout>
      </ProtecedLayout>
    ),
  },

  {
    path: "/messages",
    element: (
      <ProtecedLayout>
        <MainLayout>
          <Messages />
        </MainLayout>
      </ProtecedLayout>
    ),
  },

  {
    path: "/post/:_id",
    element: (
      <ProtecedLayout>
        <DetailsPost />
      </ProtecedLayout>
    ),
  },
]);

export default routers;
