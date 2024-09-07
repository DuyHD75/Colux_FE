import Home from "../page/Home";
import Colors from "../page/Colors";
import Cart from "../page/Cart";
import Checkout from "../page/Checkout";
import WishList from "../page/WishList";
import PaymentBilling from "../page/PaymentBilling";
import ColorDetail from "../page/detail/ColorDetail";

import Auth from "../page/Auth";

export const routesGen = {
  home: "/",
  colors: "/colors",
  colorDetail: (colorId) => `/colors/${colorId}`,
  cart: "/cart",
  checkout: "/checkout",
  wishlist: "/wishlist",
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
    state: "colorsSection",
  },
  {
    path: "/colors/:section/:collection",
    element: <Colors />,
    state: "colorsSectionCollection",
  },
  {
    path: "/colors/:section/:collection/:colorName",
    element: <ColorDetail />,
    state: "colorDetail",
  },
  {
    path: "/cart",
    element: <Cart />,
    state: "cart",
  },
  {
    path: "/checkout",
    element: <Checkout />,
    state: "checkout",
  },
  {
    path: "/wishlist",
    element: <WishList />,
    state: "cart",
  },
  {
    path: "/billing",
    element: <PaymentBilling />,
    state: "paymentBilling",
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
