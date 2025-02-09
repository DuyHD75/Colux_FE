import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import Navigate from "./Navigate";
import menuConfigs from "../../config/menu.config";
import { Link, useNavigate } from "react-router-dom";
import textConfigs from "../../config/text.config";
import { useDispatch, useSelector } from "react-redux";
import userApi from "../../api/modules/user.api";
import { toast } from "react-toastify";
import { setUser } from "../../redux/reducer/userSlice";

const UserSidebar = ({ children }) => {
  const { appState } = useSelector((state) => state.appState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { response, err } = await userApi.logout();
    if (response) {
      dispatch(setUser(null));
      localStorage.removeItem('user')
      navigate("/");
      toast.success("Logout Success.");
    }
    if (err) {
      toast.error(err);
    }
  };

  return (
    <>
      {/* Phần header điều hướng */}
      <Box pt={{ xs: "56px", md: "152px" }}>
        <Navigate />
      </Box>

      {/* Nội dung chính */}
      <Box
        p={{ xs: "0 0 1rem 0", md: "0 152px 1rem 152px" }}
        bgcolor="#EAEAEA"
        minHeight="inherit"
        sx={{
          position: "relative",
        }}
      >
        <Stack
          spacing={{ xs: 0, md: 4 }}
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
          pt="27px"
        >
          {/* Hiển thị menu */}
          <Stack
            width={{ xs: "100%", md: "20%" }}
            position={{ xs: "absolute", md: "relative" }}
            zIndex={{ xs: 0, md: "auto" }}
            top={{ xs: 0, md: "auto" }}
            bgcolor={{ xs: "white", md: "transparent" }}
            display={{ xs: "none", md: "flex" }}
            direction="column"
            spacing={2}
            alignItems="center"
          >
            {menuConfigs.user.map((item, index) => (
              <Button
                component={Link}
                to={item.state === "logout" ? undefined : item.path}
                onClick={item.state === "logout" ? handleLogout : undefined}
                key={index}
                sx={{
                  mr: 2,
                  fontFamily: '"Nunito", sans-serif',
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  color: "secondary.contrastText",
                  textTransform: "normal",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  padding: "0.6rem 10px",
                  width: "100%",
                  bgcolor: appState.includes(item.state)
                    ? "white"
                    : "transparent",
                  borderRadius: appState.includes(item.state)
                    ? "0 8px 8px 0"
                    : "0px",
                  borderLeft: appState.includes(item.state)
                    ? "2px solid #1C2759"
                    : "none",
                  "&:hover": {
                    color: "secondary.colorText",
                    bgColor: "rgba(0,0,0,0.5)",
                  },
                }}
              >
                <Box sx={{ marginRight: "1rem" }}> {item.icon}</Box>
                <Typography
                  variant="p"
                  sx={{
                    ...textConfigs.style.headerText,
                    fontSize: "1rem",
                    textTransform: "none",
                  }}
                >
                  {item.display}
                </Typography>
              </Button>
            ))}
          </Stack>

          {/* Nội dung children */}
          <Box
            sx={{
              marginTop: { xs: "-20px !important", md: "0 !important" }, 
              width: "100%",
            }}
          >
            {children}
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default UserSidebar;

