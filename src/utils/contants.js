import Explore from "../icons/Explore";
import Home from "../icons/Home";
import Message from "../icons/Message";

export const ACCESS_TOKEN = "accessToken";
export const REFRESH_TOKEN = "refreshToken";



export const sidebars = [
    {
      icons: Home,
      title: "Home",
      href: "/",
    },
    {
      icons: Explore,
      title: "Explore",
      href: "/explore",
    },
    {
      icons: Message,
      title: "Messages",
      href: "/messages",
    },
  ];


  export const formatDate = (date) => {
    const hours = new Date(date).getHours();
    const minutes = new Date(date).getMinutes();
    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
}