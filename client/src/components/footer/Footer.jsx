import React from "react";
import { Box, Typography, Container, Grid } from "@mui/material/";
import BackgroundColor from "../../config/background.config";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import menuConfigs from "../../config/menu.config";

const Footer = () => {
  return (
    <Box
      className="font-['Nunito']"
      sx={{ ...BackgroundColor.style.backgroundPrimary }}
    >
      <Container maxWidth="lg">
        <Box className="py-10">
          <Grid container>
            <Grid
              item
              xs={12}
              md={4}
              key="aboutUs"
              className="text-white"
              sx={{ paddingRight: "32px", mb: 3, mx: { xs: 1, md: 0 } }}
            >
              <Typography
                className="font-bold no-underline"
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  letterSpacing: "1rem",
                  fontSize: "2rem",
                  overflow: "inherit",
                  fontFamily: "Nunito",
                  fontWeight: 700,
                }}
              >
                KOLUX
              </Typography>
              <Typography variant="h5" sx={{ fontFamily: "Nunito" }}>
                Get to know our Company
              </Typography>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontFamily: "Nunito",
                  marginBottom: "8px",
                }}
              >
                Whether around the corner or across the world, KOLUX people and
                products have been making an impact for over 150 years.
              </Typography>
              <Link
                to="/about"
                className="text-white capitalize text-xl font-['Nunito']"
              >
                READ MORE ABOUT US
              </Link>
            </Grid>
            <Grid container item  xs={12} md={8}>
              <Grid
                item
                xs={12}
                md={4}
                key="ourCompany"
                className="text-white font-['Nunito']"
                sx={{ mb: 3 }}
              >
                <Typography
                  variant="h5"
                  sx={{ fontFamily: "Nunito", marginX: "8px" }}
                >
                  Our Company
                </Typography>
                {menuConfigs.navItems.map((item, index) => (
                  <Link
                    to={item.path}
                    key={index}
                    className="my-1 mx-2 text-white flex"
                  >
                    {item.display}
                  </Link>
                ))}
              </Grid>

              <Grid
                item
                xs={12}
                md={4}
                key="termsOfUse"
                className="text-white"
                sx={{ mb: 3 }}
              >
                <Typography
                  variant="h5"
                  sx={{ fontFamily: "Nunito", marginX: "8px" }}
                >
                  Terms of Use
                </Typography>
                {menuConfigs.termItems.map((item, index) => (
                  <Link
                    to={item.path}
                    key={index}
                    className="my-1 mx-2 text-white flex"
                  >
                    {item.display}
                  </Link>
                ))}
              </Grid>

              <Grid item xs={12} md={4} key="product" className="text-white">
                <Typography
                  variant="h5"
                  sx={{ fontFamily: "Nunito", marginX: "8px" }}
                >
                  User
                </Typography>
                {menuConfigs.settings.map((item, index) => (
                  <Link
                    to={item.path}
                    key={index}
                    className="my-1 mx-2 text-white flex"
                  >
                    {item.display}
                  </Link>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Typography
          sx={{
            color: "#fff",
            fontFamily: '"Nunito", sans-serif',
            fontSize: "1rem",
            fontWeight: 400,
            paddingY: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderTop: "1px solid #fff",
          }}
        >
          © Design By KOLUX - 2024
        </Typography>
      </Container>
    </Box>
  );
};
export default Footer;
