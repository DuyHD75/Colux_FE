import React from "react";
import { Typography, Button } from "@mui/material";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Banner = () => {
  const { t } = useTranslation();

  return (
    <Box
      className="banner"
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/colux-alpha-storage.appspot.com/o/commons%2Fhome-baner.jpg?alt=media&token=dad62ec0-b3aa-4bab-851f-14e27f61b18a)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        color: "white",
        textAlign: "center",
        overflow: "hidden",
        marginTop: { xs: "56px", md: "150px" },
      }}
    >
      {/* Gradient Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8))",
          zIndex: 1,
        }}
      />
      <Box
        component={Link}
        to="https://colux-tool.vercel.app/"
        sx={{
          position: "absolute",
          top: "10%",
          left: "10%",
          width: "488px",
          height: "257px",
          background:
            "url('https://firebasestorage.googleapis.com/v0/b/colux-alpha-storage.appspot.com/o/commons%2Fz6129442801654_10148aef02ddc00590ca3ad7b2bd36cc.jpg?alt=media&token=dccb6077-e329-45c6-ba4c-e1ca066b35c9')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          animation: "zoomInOut 8s ease-in-out infinite",
          border: "5px solid rgba(255, 255, 255, 0.5)",
          borderRadius: "15px",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.5)",
          zIndex: 1,
        }}
      />
      <Box
        component={Link}
        to="https://colux-tool.vercel.app/"
        sx={{
          position: "absolute",
          bottom: "15%",
          right: "10%",
          width: "485px",
          height: "257px",
          background:
            "url('https://firebasestorage.googleapis.com/v0/b/colux-alpha-storage.appspot.com/o/commons%2Fz6129451003485_4f2063880920b27849d7de160bbd6f5b.jpg?alt=media&token=55cd6a9e-6d61-4ae1-995b-1468fe9cc076')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          animation: "zoomOutIn 8s ease-in-out infinite",
          border: "5px solid rgba(255, 255, 255, 0.5)",
          borderRadius: "15px",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.5)",
          zIndex: 1,
        }}
      />

      {/* Animated 3D Text */}
      <Typography
        variant="h4"
        sx={{
          zIndex: 2,
          fontWeight: "bold",
          textShadow: "0px 4px 10px rgba(0, 0, 0, 0.7)",
          animation: "fadeIn 2s ease-in-out",
        }}
      >
        {t("home.baner.title")}
      </Typography>

      {/* Subtext */}
      <Typography
        variant="body1"
        sx={{
          zIndex: 2,
          marginTop: 2,
          animation: "fadeIn 2.5s ease-in-out",
          textShadow: "0px 2px 5px rgba(0, 0, 0, 0.7)",
        }}
      >
        {t("home.baner.desc")}
      </Typography>

      {/* Call-to-Action Button */}
      <Button
        component={Link}
        to="https://colux-tool.vercel.app/"
        rel="noopener noreferrer"
        variant="contained"
        sx={{
          zIndex: 2,
          marginTop: 4,
          padding: "15px 30px",
          fontSize: "1rem",
          fontWeight: "bold",
          background: "#2c3766",
          color: "white",
          borderRadius: "50px",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
          transition: "transform 0.3s, box-shadow 0.3s",
          ":hover": {
            transform: "scale(1.15)",
            boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.5)",
            background: "#3c4b88",
          },
        }}
      >
        {t("home.baner.btn")}
      </Button>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes zoomInOut {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 1; }
          }
          @keyframes zoomOutIn {
            0%, 100% { transform: scale(1.1); opacity: 1; }
            50% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </Box>
  );
};

export default Banner;
