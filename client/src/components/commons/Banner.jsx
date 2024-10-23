import React from "react";
import { Typography, Button } from "@mui/material";
import Box from "@mui/material/Box";
import backgroundConfigs from "../../config/background.config";
import textConfigs from "../../config/text.config";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Banner = () => {
  const { t } = useTranslation();
  return (
    <Box
      className="banner"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/colux-alpha-storage.appspot.com/o/commons%2Fhome-baner.jpg?alt=media&token=dad62ec0-b3aa-4bab-851f-14e27f61b18a)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "20px",
        textAlign: "center",
        marginTop: {xs: "56px", md: "96px"},
        minHeight: "600px",
        
      }}
    >
      <Typography variant="h4" gutterBottom sx={{...textConfigs.style.headerText,}}>
      {t('home.baner.title')}
      </Typography>
      <Typography variant="body1" paragraph sx={{...textConfigs.style.headerText,}}>
      {t('home.baner.desc')}
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
        {t('home.baner.btn')}
      </Button>
    </Box>
  );
};

export default Banner;
