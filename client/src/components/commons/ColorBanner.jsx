import React from "react";
import { Box, Typography, Container, Grid } from "@mui/material";
import textConfigs from "../../config/text.config";
import Navigate from "./Navigate";

const ColorBanner = ({ img, section, title, description, hex }) => {
  return (
    <Box
      sx={{
        backgroundColor: hex,
        minHeight: { xs: "auto", md: "686px" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: { xs: "16px", md: "0" },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={img}
              alt="Explore Paint Colors"
              sx={{
                width: "100%",
                paddingBottom: { xs: "24px", md: "48px" },
                height: "100%", 
                objectFit: "cover",
              }}
            />
          </Grid>

          <Grid item xs={12} md={6} sx={{ paddingLeft: { xs: "0", md: "96px" }, paddingTop: { xs: "0px !important"} }}>
            <Typography
              variant="body1"
              component="p"
              sx={{
                fontSize: { xs: "1rem", md: "1.4rem" }, 
                lineHeight: 1.6,
                ...textConfigs.style.basicFont,
                textAlign: { xs: "center", md: "left" },
                marginBottom: { xs: "16px", md: "0" }, 
              }}
            >
              {section}
            </Typography>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                ...textConfigs.style.basicFont,
                fontSize: { xs: "2rem", md: "3rem" }, 
                textAlign: { xs: "center", md: "left" }, 
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body1"
              component="p"
              sx={{
                fontSize: { xs: "0.9rem", md: "1.1rem" }, 
                lineHeight: 1.6,
                ...textConfigs.style.basicFont,
                textAlign: { xs: "center", md: "left" }, 
              }}
            >
              {description}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ColorBanner;
