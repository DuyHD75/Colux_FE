import { MdOutlineAccountCircle } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FiBox } from "react-icons/fi";
import { IoMdStarOutline } from "react-icons/io";
import { FiHeart } from "react-icons/fi";
import { FiDatabase } from "react-icons/fi";
import { MdOutlineHelpOutline } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";

const navItems = [
    {
        display: 'Home',
        path: "/",
        state: "home"
    },
    {
        display: 'Colors',
        path: "/colors",
        state: "colors"
    },
    {
        display: 'Products',
        path: "/products",
        state: "products"
    },
    {
        display: 'Advisory',
        path: "/advisory",
        state: "advisory"
    },
    {
        display: 'Ideas',
        path: "/ideas",
        state: "ideas"
    },

  {
    display: "Blogs",
    path: "/blogs",
    state: "blogs",
  },
    {
        display: 'Contractors',
        path: "/contractors",
        state: "contractors"
    },
    {
        display: 'About',
        path: "/about",
        state: "about"
    },
    {
        display: 'Contact',
        path: "/contact",
        state: "contact"
    },
    {
        display: 'History Order',
        path: "/orderHistory",
        state: "orderHistory"
    }
]

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
        display: 'Profile',
        path: "/profile",
        state: "profile",
        role: "CUSTOMER"
    },
    {
        display: 'History Order',
        path: "/history_order",
        state: "history.order",
        role: "CUSTOMER"
    },
    {
        display: '3D saved',
        path: "/3D_saved",
        state: "3D.saved",
        role: "CUSTOMER"
    }
]

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

const user = [
    {
        display: "Account",
        path: "/profile",
        icon: <MdOutlineAccountCircle style={{ fontSize: '1.2rem', color:'#1C2759' }} />,
        state: "profile"
   },
   {
        display: "Manage orders",
        path: "/orderHistory",
        icon: <IoDocumentTextOutline style={{ fontSize: '1.2rem',color:'#1C2759' }} />,
        state: "orderHistory",
   },
   {
        display: "3D Saved",
        path: "/3DSaved",
        icon: <FiBox style={{ fontSize: '1.2rem',color:'#1C2759' }} />,
        state: "3DSaved",
   },
   {
        display: "Product Reviews",
        path: "/product_reviews",
        icon: <IoMdStarOutline style={{ fontSize: '1.2rem',color:'#1C2759' }} />,
        state: "product.reviews"
   },
   {
        display: "Favorites",
        path: "/favorites",
        icon: <FiHeart style={{ fontSize: '1.2rem',color:'#1C2759' }} />,
        state: "favorites",

   },
   {
        display: "Points",
        path: "/points",
        icon: <FiDatabase style={{ fontSize: '1.2rem',color:'#1C2759' }} />,
        state: "points",

   },
   {
        display: "Helps",
        path: "/helps",
        icon: <MdOutlineHelpOutline style={{ fontSize: '1.2rem',color:'#1C2759' }} />,
        state: "helps",
     
   },
   {
        display: "Log Out",
        path: "/Logout",
        icon: <FiLogOut style={{ fontSize: '1.2rem', color:'#1C2759'}} />,
        state: "Logout",
  
   },
]

const menuConfigs = { navItems, termItems, settings, user, sectionColors };

export default menuConfigs;
