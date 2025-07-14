import { Suspense, useContext } from "react";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import "./index.css"
// component
import { AuthContext } from "./context/AuthContext";
import routers from "./routers";

import ThemeProvider from "./theme";
import TopLoading from "./components/TopLoading";
import useUserInfomation from "./hook/useUserInfomation";
import StartLoader from "./components/Start";

function App() {
  const { user } = useContext(AuthContext);

  useUserInfomation();

  if (typeof user === "undefined") {
    return <StartLoader/>;
  }

  return (
    <HelmetProvider>
      <ThemeProvider>
        <Suspense fallback={<TopLoading/>}>
          <RouterProvider router={routers} />
        </Suspense>
      </ThemeProvider>
    </HelmetProvider>
  );
}
export default App;
