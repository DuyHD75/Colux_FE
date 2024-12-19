import React from "react";
import { Box } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../footer/Footer";
import Navbar from "../Navbar";
import { useSelector } from "react-redux";
import GlobalLoading from "../common/GlobalLoading";
import SlideSBar from "../common/SlideBar";
import { useEffect } from "react";
import userApi from "../../api/modules/admin.api";

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

  const employee = localStorage.getItem("employee");
  const admin = localStorage.getItem("admin");
  const navigate = useNavigate();

  useEffect(() => {
    const refreshToken = async () => {
      const { response: userInfoResponse } = await userApi.getInfo();
      console.log(userInfoResponse);
      
      if (!userInfoResponse) {
        const { response: refreshTokenResponse } = await userApi.refreshToken();
        if (refreshTokenResponse) {
          if (admin) {
            navigate("/dashboard");
          }
          if (employee) {
            navigate("/manage-products");
          }
        } else {
          localStorage.removeItem("employee");
          localStorage.removeItem("admin");
          navigate("/login");
        }
      }
    };
    console.log(admin);
    console.log((admin || employee) && appState !== actionState.login);
    console.log(employee);
    console.log(appState);
    console.log(actionState.login);
    console.log(appState !== actionState.login);
    
    if ((admin || employee) && appState !== actionState.login) {
      refreshToken();
    }
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {showHeaderFooter && <Navbar />}
      <GlobalLoading />
      <Box sx={{ display: "flex", flex: 1 }}>
        {showHeaderFooter && (
          <Box
            component="nav"
            sx={{
              width: 240,
              flexShrink: 0,
              position: "fixed",
              height: "100vh",
              borderRight: "1px solid #eee",
              bgcolor: "background.paper",
              zIndex: 1000,
            }}
          >
            <SlideSBar />
          </Box>
        )}

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: showHeaderFooter ? 3 : 0,
            ml: showHeaderFooter ? "240px" : 0,
            mt: showHeaderFooter ? "64px" : 0,
          }}
        >
          <Outlet />
        </Box>
      </Box>

      {showHeaderFooter && <Footer />}
    </Box>
  );
};

export default MainLayout;
