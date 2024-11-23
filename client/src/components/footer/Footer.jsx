import React from "react";
import { Box, Typography, Container, Grid } from "@mui/material/";
import BackgroundColor from "../../config/background.config";
import { Link } from "react-router-dom";
import menuConfigs from "../../config/menu.config";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

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
              <Box
                className="font-bold no-underline"
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  letterSpacing: ".8rem",
                  fontSize: "1.8rem",
                  overflow: "inherit",
                  fontFamily: "Nunito",
                  fontWeight: 700,
                }}
              >
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/colux-alpha-storage.appspot.com/o/commons%2Fgooglecolab-svgrepo-com.svg?alt=media&token=8c73424a-2f2d-47dd-a4c5-960063e52e40"
                  alt="Colux Logo"
                  style={{
                    width: "40px",
                    height: "40px",
                    marginRight: "8px",
                  }}
                />
                LUX
              </Box>
              <Typography variant="h5" sx={{ fontFamily: "Nunito" }}>
                {t("footer.title")}
              </Typography>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontFamily: "Nunito",
                  marginBottom: "8px",
                }}
              >
                {t("footer.desc")}
              </Typography>
              <Link
                to="/about"
                className="text-white capitalize text-xl font-['Nunito']"
              >
                {t("footer.btn")}
              </Link>
            </Grid>
            <Grid container item xs={12} md={8}>
              <Grid
                item
                xs={12}
                md={6}
                key="ourCompany"
                className="text-white font-['Nunito']"
                sx={{ mb: 3 }}
              >
                <Typography
                  variant="h5"
                  sx={{ fontFamily: "Nunito", marginX: "8px" }}
                >
                  {t("footer.our")}
                </Typography>
                {menuConfigs.navItems.map((item, index) => (
                  <Link
                    to={item.path}
                    key={index}
                    className="my-1 mx-2 text-white flex"
                  >
                    {t(item.display)}
                  </Link>
                ))}
              </Grid>

              <Grid
                item
                xs={12}
                md={6}
                key="termsOfUse"
                className="text-white"
                sx={{ mb: 3 }}
              >
                <Typography
                  variant="h5"
                  sx={{ fontFamily: "Nunito", marginX: "8px" }}
                >
                  {t("footer.term")}
                </Typography>
                {menuConfigs.termItems.map((item, index) => (
                  <Link
                    to={item.path}
                    key={index}
                    className="my-1 mx-2 text-white flex"
                  >
                    {t(item.display)}
                  </Link>
                ))}
              </Grid>

              {/* <Grid item xs={12} md={4} key="product" className="text-white">
                <Typography
                  variant="h5"
                  sx={{ fontFamily: "Nunito", marginX: "8px" }}
                >
                  {t("footer.user")}
                </Typography>
                {menuConfigs.settings.map((item, index) => (
                  <Link
                    to={item.path}
                    key={index}
                    className="my-1 mx-2 text-white flex"
                  >
                    {t(item.display)}
                  </Link>
                ))}
              </Grid> */}
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
