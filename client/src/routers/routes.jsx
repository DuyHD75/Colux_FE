import Home from "../page/Home";
import Colors from "../page/Colors";
import Cart from "../page/Cart";
import Checkout from "../page/Checkout";
import WishList from "../page/WishList";
import PaymentBilling from "../page/PaymentBilling";


export const routesGen = {
  home: "/",
  colors: "/colors",
  colorDetail: (colorId) => `/colors/${colorId}`,
  cart: "/cart",
    checkout: "/checkout",
    wishlist: "/wishlist"
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
  
    {
        path: "/cart",
        element: <Cart/>,
        state: "cart"
    },
    {
        path: "/checkout",
        element: <Checkout/>,
        state: "checkout"
    },
    {
        path: "/wishlist",
        element: <WishList/>,
        state: "cart"
    },
    {
        path: "/billing",
        element: <PaymentBilling/>,
        state: "paymentBilling"
    },
];

export default routes;
