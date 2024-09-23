import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectPosts } from "../../redux/reducer/postsSlice"; // Adjust the import path as needed
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import textConfigs from "../../config/text.config";
import backgroundConfigs from "../../config/background.config";

const RelatedPosts = ({ currentPostSlug, textConfigs }) => {
  const posts = useSelector(selectPosts);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const recentPosts = posts
    .filter((p) => p.slug !== currentPostSlug)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  if (recentPosts.length === 0) {
    return null;
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Read more
      </Typography>
      <Grid container spacing={3}>
        {recentPosts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.slug}>
            <Card
              sx={{
                boxShadow: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  height: 200,
                  width: "100%",
                  objectFit: "cover",
                }}
                image={post.image}
                alt={post.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={textConfigs?.style?.headerText}
                >
                  {post.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  paragraph
                  sx={textConfigs?.style?.subText}
                >
                  {post.excerpt}
                </Typography>
              </CardContent>

              <Button
                component={Link}
                to={`/blogs/${post.slug}`}
                variant="contained"
                color="primary"
                sx={{
                  fontFamily: "Nunito",
                  ...backgroundConfigs.style.backgroundPrimary,
                  ":hover": {
                    ...backgroundConfigs.style.backgroundSecondary,
                  },
                  marginBottom: "1rem",
                  alignSelf: "center",
                }}
              >
                Read More
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default RelatedPosts;
