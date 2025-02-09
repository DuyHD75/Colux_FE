import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography, Grid, Container, Button } from "@mui/material";
import textConfigs from "../../config/text.config";
import backgroundConfigs from "../../config/background.config";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  selectPosts,
} from "../../redux/reducer/postsSlice";

const Blogs = () => {
  const posts = useSelector(selectPosts);
  const blogs = useSelector(selectPosts);
  const { t } = useTranslation();

  console.log(posts);
  

  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  return (
    <Box sx={{ ...backgroundConfigs.style.backgroundContext }}>
      <Container maxWidth="lg" className="py-10">
        <Typography
          variant="h3"
          sx={{ fontFamily: "Nunito", ...textConfigs.style.headerText, fontSize: "30px", fontWeight: "bold" }}
        >
          {t('home.blogs.title')}
        </Typography>
        <Box>
          {posts.map((blog, index) => (
            <Box
              key={blog.id}
              sx={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "16px",
                marginY: "32px",
                ...backgroundConfigs.style.subBackgroundContext,
              }}
            >
              <Grid container spacing={2} sx={{ display: { xs: "none", md: "flex" } }}>
                {index % 2 === 0 ? (
                  <>
                    <Grid item xs={12} md={6} sx={{ paddingX: "16px", display: "flex", alignItems: "center" }}>
                      <img
                        src={blog.image}
                        alt={blog.title}
                        style={{ width: "100%" }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ paddingX: "16px" }}>
                      <Typography
                        variant="h5"
                        sx={{ fontFamily: "Nunito", ...textConfigs.style.headerText }}
                      >
                        {capitalizeWords(blog.title)}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontFamily: "Nunito", ...textConfigs.style.subText, paddingY: "8px" }}
                      >
                        {blog.content}
                      </Typography>
                      <Button
                        component={Link}
                        to="/colors"
                        variant="contained"
                        color="primary"
                        sx={{
                          fontFamily: "Nunito",
                          ...backgroundConfigs.style.backgroundPrimary,
                          ":hover": {
                            ...backgroundConfigs.style.backgroundSecondary,
                          },
                        }}
                      >
                        Read More
                      </Button>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item xs={12} md={6} sx={{ paddingX: "16px" }}>
                      <Typography
                        variant="h5"
                        sx={{ fontFamily: "Nunito", ...textConfigs.style.headerText }}
                      >
                        {blog.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontFamily: "Nunito", ...textConfigs.style.subText, paddingY: "8px" }}
                      >
                        {blog.content}
                      </Typography>
                      <Button
                        component={Link}
                        to="/colors"
                        variant="contained"
                        color="primary"
                        sx={{
                          fontFamily: "Nunito",
                          ...backgroundConfigs.style.backgroundPrimary,
                          ":hover": {
                            ...backgroundConfigs.style.backgroundSecondary,
                          },
                        }}
                      >
                        Read More
                      </Button>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ paddingX: "16px", display: "flex", alignItems: "center" }}>
                      <img
                        src={blog.image}
                        alt={blog.title}
                        style={{ maxWidth: "100%" }}
                      />
                    </Grid>
                  </>
                )}
              </Grid>

              <Grid container spacing={2} sx={{ display: { xs: "flex", md: "none" }, flexDirection: "column" }}>
                <Grid item xs={12} sx={{ paddingX: "16px", display: "flex", alignItems: "center" }}>
                  <img
                    src={blog.image}
                    alt={blog.title}
                    style={{ maxWidth: "100%" }}
                  />
                </Grid>
                <Grid item xs={12} sx={{ paddingX: "16px" }}>
                  <Typography
                    variant="h6"
                    sx={{ fontFamily: "Nunito", ...textConfigs.style.headerText }}
                  >
                    {capitalizeWords(blog.title)}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontFamily: "Nunito", ...textConfigs.style.subText, paddingY: "8px" }}
                  >
                    {blog.content}
                  </Typography>
                  <Button
                    component={Link}
                    to="/colors"
                    variant="contained"
                    color="primary"
                    sx={{
                      fontFamily: "Nunito",
                      ...backgroundConfigs.style.backgroundPrimary,
                      ":hover": {
                        ...backgroundConfigs.style.backgroundSecondary,
                      },
                    }}
                  >
                    Read More
                  </Button>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Blogs;
