import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import { useSelector } from "react-redux";
import GlobalLoading from "../commons/GlobalLoading";
import userApi from "../../api/modules/user.api";
import cartApi from "../../api/modules/cart.api";
const actionState = {
  login: "login",
  register: "register",
  forgotPassword: "forgotPassword",
  resetPassword: "resetPassword",
  verify: "verify",
};

const MainLayout = () => {
  const { appState } = useSelector((state) => state.appState);
  const user = localStorage.getItem("user");
  const [itemCart, setItemCart] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const refreshToken = async () => {
      const { response: userInfoResponse } = await userApi.getInfo();
      if (!userInfoResponse) {
        const { response: refreshTokenResponse } = await userApi.refreshToken();
        if (refreshTokenResponse) {
          navigate("/");
        } else {
          localStorage.removeItem("user");
          navigate("/login");
        }
      }
    };
    if (user && appState !== actionState.login) {
      refreshToken();
    }
  }, []);

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
  }, [user]);

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
