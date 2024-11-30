import { MdOutlineAccountCircle } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FiBox } from "react-icons/fi";
import { IoMdStarOutline } from "react-icons/io";
import { FiHeart } from "react-icons/fi";
import { FiDatabase } from "react-icons/fi";
import { MdOutlineHelpOutline } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { LuLock } from "react-icons/lu";


const navItems = [
  {
    display: "home",
    path: "/",
    state: "home",
  },
  {
    display: "colors",
    path: "/colors",
    state: "colors",
  },
  {
    display: "products",
    path: "/products",
    state: "products",
  },

  {
    display: "about",
    path: "/about",
    state: "about",
  },
  {
    display: "blogs",
    path: "/blogs",
    state: "blogs",
  },

  {
    display: "contact",
    path: "/contact",
    state: "contact",
  },
  {
    display: "calculate.price",
    path: "/calculate-price",
    state: "calculate.price",
  },
];

const termItems = [
  {
    display: "privacy.policy",
    path: "/privacy_policy",
    state: "privacy.policy",
  },
  {
    display: "terms.and.condition",
    path: "/terms_and_condition",
    state: "terms.and.condition",
  },
  {
    display: "shipping.and.return",
    path: "/shipping_and_return",
    state: "shipping.and.return",
  },
];

const settings = [
  {
    display: "Profile",
    path: "/profile",
    state: "profile",
    role: "CUSTOMER",
  },
  {
    display: "History Order",
    path: "/history_order",
    state: "history.order",
    role: "CUSTOMER",
  },
  {
    display: "3D saved",
    path: "/3D_saved",
    state: "3D.saved",
    role: "CUSTOMER",
  },
];

const sectionColors = [
  {
    display: "Color Family",
    path: "/colors/color-family",
    state: "color.family",
  },
  {
    display: "Room",
    path: "/colors/rooms",
    state: "rooms",
  },
  {
    display: "Collection",
    path: "/colors/collections",
    state: "collections",
  },
  {
    display: "Exterior",
    path: "/colors/exteriors",
    state: "exteriors",
  },
];

const aboutMenu = [
  {
    display: "about.us",
    path: "/about",
    state: "about",
  },
  {
    display: "constructors",
    path: "/constructors",
    state: "constructors",
  },
  {
    display: "advisory",
    path: "/advisory",
    state: "advisory",
  },
];

const user = [
  {
    display: "Account",
    path: "/profile",
    icon: (
      <MdOutlineAccountCircle
        style={{ fontSize: "1.2rem", color: "#1C2759" }}
      />
    ),
    state: "profile",
  },
  {
    display: "Change Password",
    path: "/changePassword",
    icon: (
      <LuLock
        style={{ fontSize: "1.2rem", color: "#1C2759" }}
      />
    ),
    state: "changePassword",
  },
  {
    display: "Manage orders",
    path: "/orderHistory",
    icon: (
      <IoDocumentTextOutline style={{ fontSize: "1.2rem", color: "#1C2759" }} />
    ),
    state: "orderHistory",
  },
  // {
  //   display: "3D Saved",
  //   path: "/3DSaved",
  //   icon: <FiBox style={{ fontSize: "1.2rem", color: "#1C2759" }} />,
  //   state: "3DSaved",
  // },
  {
    display: "Product Reviews",
    path: "/product_reviews",
    icon: <IoMdStarOutline style={{ fontSize: "1.2rem", color: "#1C2759" }} />,
    state: "productReviews",
  },
  // {
  //   display: "Favorites",
  //   path: "/favorites",
  //   icon: <FiHeart style={{ fontSize: "1.2rem", color: "#1C2759" }} />,
  //   state: "favorites",
  // },
  {
    display: "Points",
    path: "/points",
    icon: <FiDatabase style={{ fontSize: "1.2rem", color: "#1C2759" }} />,
    state: "points",
  },
  {
    display: "Helps",
    path: "/helps",
    icon: (
      <MdOutlineHelpOutline style={{ fontSize: "1.2rem", color: "#1C2759" }} />
    ),
    state: "helps",
  },
  {
    display: "Log Out",
    path: "/logout",
    icon: <FiLogOut style={{ fontSize: "1.2rem", color: "#1C2759" }} />,
    state: "logout",
  },
];

const menuConfigs = {
  navItems,
  termItems,
  settings,
  user,
  sectionColors,
  aboutMenu,
};

export default menuConfigs;
