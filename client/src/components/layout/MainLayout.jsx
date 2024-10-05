import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import { useDispatch, useSelector } from "react-redux";
import GlobalLoading from "../commons/GlobalLoading";
import Cookies from "js-cookie";
import userApi from "../../api/modules/user.api";
import { setUser } from "../../redux/reducer/userSlice";

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
  const { user } = useSelector((state) => state.user);
 
  useEffect(() => {
    const authUser = async () => {
      if (!user) {
        const { response, err } = await userApi.getInfo();
        if (response) {
          dispatch(setUser(response.data.user));
        }
        if (err) {
          dispatch(setUser(null));
        }
      }
    };
    authUser();
  }, []);


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
