import React from "react";
import {
  Typography,
  Button,
  Container,
  Card,
  CardContent,
} from "@mui/material";
import Box from "@mui/material/Box";
import backgroundConfigs from "../../config/background.config";
import textConfigs from "../../config/text.config";
import { Link } from "react-router-dom";

const AdvisoryBanner = () => {
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
        minHeight: "400px",
      }}
    >
      <Container maxWidth="lg">

        <Card sx={{width: {xs: "100%", md: "50%"}}}>
          <CardContent>
            <Typography
              variant="h4"
              gutterBottom
              sx={{ ...textConfigs.style.headerText }}
            >
              Custom Home Design Advisory
            </Typography>
            <Typography
              variant="body1"
              paragraph
              sx={{ ...textConfigs.style.subHeaderText }}
            >
              Unlock the Door to Your Dream Home with KOLUX 3D Home Design Services 
            </Typography>
            <Typography
              variant="body1"
              paragraph
              sx={{ ...textConfigs.style.subHeaderText }}
            >
              Discover the Art of Personalized Home Design with KOLUX's 3D Advisory
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
              Get advice now!
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default AdvisoryBanner;
