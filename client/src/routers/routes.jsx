import Home from "../page/Home";
import Colors from "../page/Colors";
import Auth from "../page/Auth";

export const routesGen = {
  home: "/",
  colors: "/colors",
  colorDetail: (colorId) => `/colors/${colorId}`,
};

const routes = [
  {
    index: true,
    element: <Home />,
    state: "home",
  },
  {
    path: "/colors",
    element: <Colors />,
    state: "colors",
  },
  {
    path: "/colors/:section",
    element: <Colors />,
    state: "colors",
  },
  {
    path: "/colors/:section/:collection",
    element: <Colors />,
    state: "colors",
  },
  {
    path: "/login",
    element: <Auth />,
    state: "login",
  },
  {
    path: "/register",
    element: <Auth />,
    state: "register",
  },
  {
    path: "/forgotPassword",
    element: <Auth />,
    state: "forgotPassword",
  },
  {
    path: "/resetPassword",
    element: <Auth />,
    state: "resetPassword",
  },
];

export default routes;
