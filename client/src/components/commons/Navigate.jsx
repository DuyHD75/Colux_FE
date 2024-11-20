import React from "react";
import { Link, useParams } from "react-router-dom";
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import { Box, Container, Chip } from "@mui/material/";
import backgroundConfigs from "../../config/background.config";
import { useSelector } from "react-redux";
import menuConfigs from "../../config/menu.config";
import data from "../../data/data";
import { selectPosts } from "../../redux/reducer/postsSlice";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  const { appState } = useSelector((state) => state.appState);
  const { colorFamilies } = useSelector((state) => state.colorFamilies);
  const { colorFamily } = useParams();
  const posts = useSelector(selectPosts);

  const {
    section,
    collection,
    colorName,
    collectionId,
    colorId,
    categoryName,
    productCategory,
    productCategoryId,
    productName,
    productId,
    slug,
  } = useParams();
  // console.log({ section, collectionName, categoryName, slug });

  const post = posts.find((post) => post.slug === slug);

  return (
    <Box className="p-5" sx={{ ...backgroundConfigs.style.backgroundContext }}>
      <Container maxWidth="lg">
        <Breadcrumbs aria-label="breadcrumb">
          <StyledBreadcrumb
            component="a"
            href="/"
            label={t("home")}
            icon={<HomeIcon fontSize="small" />}
            sx={{ fontSize: "1rem" }}
          />

          {menuConfigs.navItems.map((item, index) => {
            if (appState === item.state && item.state !== "home" && item.state !== "colors") {
              return (
                <StyledBreadcrumb
                  key={index}
                  component="a"
                  href={item.path}
                  label={t(item.display)}
                  sx={{ fontSize: "1rem" }}
                />
              );
            } else {
              return null;
            }
          })}

          {menuConfigs.aboutMenu.map((item, index) => {
            if (appState === item.state) {
              return (
                <StyledBreadcrumb
                  key={index}
                  component="a"
                  href={item.path}
                  label={t(item.display)}
                  sx={{ fontSize: "1rem" }}
                />
              );
            } else {
              return null;
            }
          })}

          {section && (
            <StyledBreadcrumb
              component="a"
              href={`/colors/color-family/All Colors/0`}
              label={t("colors")}
              sx={{ fontSize: "1rem" }}
            />
          )}

          {section && (
            <StyledBreadcrumb
              component="a"
              href={`/colors/${section}/${collection}/${collectionId}`}
              label={collection}
              sx={{ fontSize: "1rem" }}
            />
          )}

          {section && colorName && (
            <StyledBreadcrumb
              component="a"
              href={`/colors/${section}/${collection}/${collectionId}/${colorName}/${colorId}`}
              label={colorName}
              sx={{ fontSize: "1rem" }}
            />
          )}

          {productCategory && productName && (
            <StyledBreadcrumb
              component="a"
              href={`/products/`}
              label={t("products")}
              sx={{ fontSize: "1rem" }}
            />
          )}

          {productCategory && (
            <StyledBreadcrumb
              component="a"
              href={`/products/${encodeURIComponent(
                productCategory
              )}/${productCategoryId}`}
              label={productCategory}
              sx={{ fontSize: "1rem" }}
            />
          )}

          {productName && productCategory && (
            <StyledBreadcrumb
              component="a"
              href={`/products/${encodeURIComponent(
                productCategory
              )}/${productCategoryId}/${productName}/${productId}`}
              label={productName}
              sx={{ fontSize: "1rem" }}
            />
          )}

          {section === "blog" && (
            <StyledBreadcrumb
              component="a"
              href="/blogs"
              label="Blogs"
              sx={{ fontSize: "1rem" }}
            />
          )}

          {appState === "calculate-price" && (
            <StyledBreadcrumb
            component="a"
            href="/calculate-price"
            label={t("calculate.price")}
            sx={{ fontSize: "1rem" }}
          />
          )}

          {section === "blog" && categoryName && (
            <StyledBreadcrumb
              component="a"
              href={`/blogs/category/${encodeURIComponent(categoryName)}`}
              label={categoryName}
              sx={{ fontSize: "1rem" }}
            />
          )}

          {post && (
            <StyledBreadcrumb
              component={Link}
              to={`/blogs/${post.slug}`}
              label={post.title}
              sx={{ fontSize: "1rem" }}
            />
          )}
        </Breadcrumbs>
      </Container>
    </Box>
  );
};

export default Navigate;
