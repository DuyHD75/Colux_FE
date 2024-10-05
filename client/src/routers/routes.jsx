import Home from "../page/Home";
import Colors from "../page/Colors";
import Cart from "../page/Cart";
import Checkout from "../page/Checkout";
import WishList from "../page/WishList";
import PaymentBilling from "../page/PaymentBilling";
import ColorDetail from "../page/detail/ColorDetail";
import OrderHistory from "../page/OrderHistory";
import Profile from "../page/Profile";
import ProductReviews from "../page/ProductReviews";
import PrivacyPolicy from "../page/PrivacyPolicy";
import ContactUs from "../page/ContactUs";
import Products from "../page/Products";
import ProductDetail from "../page/detail/ProductDetail"
import Auth from "../page/Auth";
import Contractors from "../page/Contractors";
import Advisory from "../page/Advisory";
import CalculatePrice from "../page/CalculatePrice";
import AboutUs from "../page/AboutUs";
import TermsAndConditions from "../page/TermsAndConditions";
import Helps from "../page/Helps";
import Points from "../page/Points";
import BlogHome from "../page/BlogHome";
import BlogDetail from "../page/detail/BlogDetail";
import VerifyEmail from "../components/commons/VerifyEmail";
import ChangePassword from "../page/ChangePassword";

export const routesGen = {
  home: "/",
  colors: "/colors",
  colorDetail: (colorId) => `/colors/${colorId}`,
  cart: "/cart",
  checkout: "/checkout",
  wishlist: "/wishlist",
  orderHistory: "/orderHistory",
  paymentBilling: "/billing",
  profile: "/profile",
  productReviews: "/product_reviews",
  privacyPolicy: "/privacyPolicy",
  contactUs: "/contact",
  aboutUs: "/about",
  termsAndConditions: "/terms_and_condition",
  helps: "/helps",
  points : "/points",
  changePassword: "/changePassword",  
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
    path: "/products",
    element: <Products></Products>,
    state: "products",
  },

  {
    path: "/products/:productCategory",
    element: <Products></Products>,
    state: "products",
  },
  {
    path: "/products/:productCategory/:productName",
    element: <ProductDetail></ProductDetail>,
    state: "productDetail",
  },

  {
    path: "/blogs",
    element: <BlogHome></BlogHome>,
    state: "blogs",
  },
  {
    path: "/blogs/:slug",
    element: <BlogDetail></BlogDetail>,
    state: "blogs",
  },
  {
  path: "/blogs/category/:categoryName",
  element: <BlogHome/>,
  state: "blogs",

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
    path: "/verify/:user/:key",
    element: <VerifyEmail />,
    state: "verify",
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
  {
    path: "/constructors",
    element: <Contractors />,
    state: "constructors",
  },
  {
    path: "/advisory",
    element: <Advisory />,
    state: "advisory",
  },
  {
    path: "/calculate-price",
    element: <CalculatePrice />,
    state: "calculate-price",
  }, 
  {
    path: "/orderHistory",
    element: <OrderHistory />,
    state: "orderHistory"
  },
  {
    path: "/profile",
    element: <Profile />,
    state: "profile"
  },
  {
    path: "/product_reviews",
    element: <ProductReviews />,
    state: "productReviews"
  },
  {
    path: "/privacy_policy",
    element: <PrivacyPolicy />,
    state: "privacy.policy"
  },
  {
    path: "/contact",
    element: <ContactUs />,
    state: "contact"
  },
  {
    path: "/about",
    element: <AboutUs />,
    state: "about"
  },
  {
    path: "/terms_and_condition",
    element: <TermsAndConditions />,
    state: "terms.and.condition"
  },
  {
    path: "/helps",
    element: <Helps />,
    state: "helps"
  },
  {
    path: "/points",
    element: <Points />,
    state: "points"
  },
  {
    path: "/changePassword",
    element: <ChangePassword />,
    state: "changePassword"
  },
];

export default routes;
