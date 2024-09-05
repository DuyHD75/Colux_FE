import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import { Box, Typography, Container, Grid, Chip } from "@mui/material/";
import backgroundConfigs from "../../config/background.config";
import { useSelector } from "react-redux";
import menuConfigs from "../../config/menu.config";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
      cursor: "pointer",
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

const Navigate = () => {
  const { appState } = useSelector((state) => state.appState);
  const { colorFamilies } = useSelector((state) => state.colorFamilies);
  const { colorFamily, productCategory } = useParams();

  return (
    <Box className="p-5" sx={{ ...backgroundConfigs.style.backgroundContext }}>
      <Container maxWidth="lg">
        <Breadcrumbs aria-label="breadcrumb">
          <StyledBreadcrumb
            component="a"
            href="/"
            label="Home"
            icon={<HomeIcon fontSize="small" />}
            sx={{ fontSize: "1rem" }}
          />
          {menuConfigs.navItems.map((item, index) => {
            if (appState === item.state && item.state !== "home") {
              return (
                <StyledBreadcrumb
                  key={index}
                  component="a"
                  href={item.path}
                  label={item.display}
                  sx={{ fontSize: "1rem" }}
                />
              );
            } else {
              return null;
            }
          })}
          {colorFamilies
            .filter(item => item.name === colorFamily)
            .map((item, index) => (
              <StyledBreadcrumb
                key={index}
                component="a"
                href="#"
                label={item.name}
                sx={{ fontSize: "1rem" }}
              />
            ))
          }
          {productCategory && (
            <StyledBreadcrumb
              component="a"
              href="#"
              label={productCategory}
              sx={{ fontSize: "1rem" }}
            />
          )}
        </Breadcrumbs>
      </Container>
    </Box>
  );
};

export default Navigate;
