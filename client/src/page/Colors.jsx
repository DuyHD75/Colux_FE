import React, { Fragment } from "react";
import Navigate from "../components/commons/Navigate";
import ColorSwitcher from "../components/commons/ColorSwitcher";
import { Box } from "@mui/material";

const Colors = () => {
  return (
    <Fragment >
      <Box sx={{ marginTop: {xs: "56px", md: "96px"}}}>
      <Navigate></Navigate>
      <ColorSwitcher></ColorSwitcher>
      </Box>
    </Fragment>
  );
};

export default Colors;
