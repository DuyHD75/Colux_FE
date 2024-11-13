import { Box } from "@mui/material";
import React from "react";
import Login from "../components/common/Login";

const background = {
  position: "relative",
  width: "100vw",
  height: "100vh",
  backgroundImage: `url(https://anthomevn.vn/wp-content/uploads/2022/07/6811-4-KG.jpg)`,
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const overlay = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 1,
};

const content = {
  position: "relative",
  zIndex: 2,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
};

const Auth = () => {
  return (
    <Box sx={background}>
      <Box sx={overlay} />
      <Box sx={content}>
        <Login />
      </Box>
    </Box>
  );
};

export default Auth;