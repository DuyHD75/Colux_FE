import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Login from "../components/commons/Login";
import Register from "../components/commons/Register";
import ForgotPassword from "../components/commons/ForgotPassword";
import ResetPassword from "../components/commons/ResetPassword";
import GlobalLoading from "../components/commons/GlobalLoading";

const actionState = {
  login: "login",
  register: "register",
  forgotPassword: "forgotPassword",
  resetPassword: "resetPassword",
};

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
  const { appState } = useSelector((state) => state.appState);

  const [action, setAction] = useState(actionState);

  const switchAuthState = (state) => setAction(state);

  useEffect(() => {
    if (appState) setAction(appState);
  }, [appState]);

  return (
    <Box sx={background}>
      <Box sx={overlay} />
      <Box sx={content}>
        {action === actionState.login && (
          <Login switchAuthState={switchAuthState} />
        )}
        {action === actionState.register && (
          <Register
            switchAuthState={() => switchAuthState(actionState.login)}
          />
        )}
        {action === actionState.forgotPassword && (
          <ForgotPassword
            switchAuthState={() => switchAuthState(actionState.login)}
          />
        )}
        {action === actionState.resetPassword && <ResetPassword />}
      </Box>
    </Box>
  );
};

export default Auth;
