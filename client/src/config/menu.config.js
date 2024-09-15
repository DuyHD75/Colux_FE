const navItems = [
  {
    display: "Home",
    path: "/",
    state: "home",
  },
  {
    display: "Colors",
    path: "/colors",
    state: "colors",
  },
  {
    display: "Products",
    path: "/products",
    state: "products",
  },

  {
    display: "Blogs",
    path: "/blogs",
    state: "blogs",
  },
  {
    display: "About",
    path: "/about",
    state: "about",
  },
  {
    display: "Contact",
    path: "/contact",
    state: "contact",
  },
];

const termItems = [
  {
    display: "Privacy Policy",
    path: "/privacy_policy",
    state: "privacy.policy",
  },
  {
    display: "Terms and Condition",
    path: "/terms_and_condition",
    state: "terms.and.condition",
  },
  {
    display: "Shipping and Return",
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

const menuConfigs = { navItems, termItems, settings, sectionColors };

export default menuConfigs;
