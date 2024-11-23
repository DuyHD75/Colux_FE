import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import { useDispatch, useSelector } from "react-redux";
import GlobalLoading from "../commons/GlobalLoading";
import Cookies from "js-cookie";
import userApi from "../../api/modules/user.api";
import { setUser } from "../../redux/reducer/userSlice";
import ChatPopup from "../commons/ChatPopup";
import { StompSessionProvider } from 'react-stomp-hooks';
import cartApi from "../../api/modules/cart.api";
import { toast } from "react-toastify";


const actionState = {
  login: "login",
  register: "register",
  forgotPassword: "forgotPassword",
  resetPassword: "resetPassword",
  verify: "verify",
};

const MainLayout = () => {
  const { appState } = useSelector((state) => state.appState);
  const dispatch = useDispatch();
  const  user  = localStorage.getItem("user");
  const [itemCart, setItemCart] = useState(0);


  // useEffect(() => {
  //   const authUser = async () => {
  //     if (!user) {
  //       const { response, err } = await userApi.getInfo();
  //       if (response && response.data.user.role === "USER") {
  //         dispatch(setUser(response.data.user));
  //       }
  //       if (err) {
  //         dispatch(setUser(null));
  //       }
  //     }
  //   };
   
  //   authUser();
  // }, []);


  useEffect(() => {
    const getCart = async () => {
      if (user) {
        const { response, err } = await cartApi.getCart(user.userId);
        if (response) {
          setItemCart(response.data.carts.cartItems.length);
          console.log(itemCart);

        }
      }
    };
    getCart();
  },
    [user,]);


  const showHeaderFooter = !(
    appState === actionState.login ||
    appState === actionState.register ||
    appState === actionState.forgotPassword ||
    appState === actionState.resetPassword ||
    appState === actionState.verify
  );

  return (
    <div>
      {/* header */}
      {showHeaderFooter && <Header itemCart={itemCart} />}
      {/* header */}
      {/* global loading */}
      <GlobalLoading />
      {/* global loading */}
      {/* <StompSessionProvider url="https://colux.site/ws">
        <ChatPopup />
      </StompSessionProvider> */}
      {/* <ChatPopup   /> */}
      <Box className="flex min-h-screen">
        {/* main */}
        <Box
          className="flex-grow overflow-hidden min-h-screen"
          component="main"
        >
          <Outlet />
        </Box>
        {/* main */}
      </Box>
      {/* footer */}
      {showHeaderFooter && <Footer />}
      {/* footer */}
    </div>
  );
};

export default MainLayout;
