import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, Paper } from "@mui/material";
import { HashLoader } from "react-spinners";
const GlobalLoading = () => {
  const { globalLoading } = useSelector((state) => state.globalLoading);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (globalLoading) {
      setIsLoading(true);
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [globalLoading]);

  return (
    <div>
      <Paper
        sx={{
          opacity: isLoading ? 1 : 0,
          pointerEvent: "none",
          transition: "all .3s ease-in",
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: isLoading ? 10000 : -10000,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <HashLoader color="#1c2759" loading size={75} speedMultiplier={1.2} />
        </Box>
      </Paper>
    </div>
  );
};

export default GlobalLoading;
