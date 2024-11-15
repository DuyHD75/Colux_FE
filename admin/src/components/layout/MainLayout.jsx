import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import Navbar from "../Navbar";
import { useSelector } from "react-redux";
import GlobalLoading from "../common/GlobalLoading";
import SlideSBar from "../common/SlideBar";

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
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {showHeaderFooter && <Navbar />}
      <GlobalLoading />
      
      <Box sx={{ display: 'flex', flex: 1 }}>
        {showHeaderFooter && (
          <Box
            component="nav"
            sx={{
              width: 240,
              flexShrink: 0,
              position: 'fixed',
              height: '100vh',
              borderRight: '1px solid #eee',
              bgcolor: 'background.paper',
              zIndex: 1000
            }}
          >
            <SlideSBar />
          </Box>
        )}
        
        <Box
          component="main"
          sx={{
            bgcolor:'#F8F9FA',
            flexGrow: 1,
            p: 3,
            ml: showHeaderFooter ? '240px' : 0,
            mt: showHeaderFooter ? '64px' : 0
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
