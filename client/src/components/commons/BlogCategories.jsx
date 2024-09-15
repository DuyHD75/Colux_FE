import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Pagination,
} from "@mui/material";
import {
  selectPosts,
  filterPostsByCategory,
  clearCategoryFilter,
} from "../../redux/reducer/postsSlice";
import Sidebar from "../../components/commons/SidebarBlog";
import textConfigs from "../../config/text.config";
import backgroundConfigs from "../../config/background.config";

const BlogCategories = () => {
  const { categoryName } = useParams();
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  const formattedCategoryName = categoryName
    ? categoryName.replace(/-/g, " ")
    : "";

  useEffect(() => {
    if (formattedCategoryName) {
      dispatch(filterPostsByCategory(formattedCategoryName));
    } else {
      dispatch(clearCategoryFilter());
    }
  }, [formattedCategoryName, dispatch]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const paginatedPosts = posts.slice(startIndex, endIndex);

  const hasPosts = posts.length > 0;
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <Container
      sx={{
        padding: "2rem 0",
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <div style={{ position: "sticky", top: 0 }}>
            <Sidebar />
          </div>
        </Grid>
        <Grid item xs={12} md={9}>
          {hasPosts ? (
            <>
              <Grid container spacing={4}>
                {paginatedPosts.map((post) => (
                  <Grid item xs={12} sm={6} md={4} key={post.id}>
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
                          sx={textConfigs.style.basicFont}
                        >
                          {post.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          paragraph
                          sx={textConfigs.style.subText}
                        >
                          {post.excerpt}
                        </Typography>
                      </CardContent>

                      <Button
                        component={Link}
                        to={`/blogs/${post.slug}`}
                        variant="contained"
                        sx={{
                          ...backgroundConfigs.style.backgroundPrimary,
                          "&:hover": {
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

              <Grid container justifyContent="center" sx={{ marginTop: 3 }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Grid>
            </>
          ) : (
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                minHeight: "50vh",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "#333", textAlign: "center", mb: 2 }}
              >
                No Posts Available
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default BlogCategories;
