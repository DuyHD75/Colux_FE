import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import { useSelector } from "react-redux";
import GlobalLoading from "../commons/GlobalLoading";

const actionState = {
  login: "login",
  register: "register",
  forgotPassword: "forgotPassword",
  resetPassword: "resetPassword",
};

const MainLayout = () => {
  const { appState } = useSelector((state) => state.appState);

  const showHeaderFooter = !(
    appState === actionState.login ||
    appState === actionState.register ||
    appState === actionState.forgotPassword ||
    appState === actionState.resetPassword
  );

  return (
    <div>
      {/* header */}
      {showHeaderFooter && <Header />}
      {/* header */}
      {/* global loading */}
      <GlobalLoading />
      {/* global loading */}
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
