import Home from "../page/Home";
import Colors from "../page/Colors";

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
    path: "/colors/:colorFamily",
    element: <Colors />,
    state: "colors",
  },
];

export default routes;
