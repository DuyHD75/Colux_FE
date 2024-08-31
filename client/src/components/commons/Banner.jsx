import React from "react";
import { Typography, Button } from "@mui/material";
import Box from "@mui/material/Box";
import backgroundConfigs from "../../config/background.config";
import textConfigs from "../../config/text.config";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <Box
      className="banner"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(https://sonnano40.vn/upload/images/s%C6%A1n-nh%C3%A0-m%C3%A0u-ghi-sang-tr%E1%BB%8Dng.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "20px",
        textAlign: "center",
        marginTop: {xs: "56px", md: "96px"},
        minHeight: "600px",
        
      }}
    >
      <Typography variant="h4" gutterBottom sx={{...textConfigs.style.headerText,}}>
      Experience a new living space with 3D Interior Paint
      </Typography>
      <Typography variant="body1" paragraph sx={{...textConfigs.style.headerText,}}>
      Exquisite colors and patterns create an impressive and unique space for your home!
      </Typography>
      <Button
        component={Link}
        to="/colors"
        variant="contained"
        color="primary"
        sx={{
          ...backgroundConfigs.style.backgroundPrimary,
          ":hover": { ...backgroundConfigs.style.backgroundSecondary },
          ...textConfigs.style.normalText,
        }}
      >
        Explore now!
      </Button>
    </Box>
  );
};

export default Banner;
