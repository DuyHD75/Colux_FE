import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Card,
  CardContent,
  Box,
  Grid,
  Rating,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import data from "../../data/data";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const reviews = data.reviews;
const blogs = data.blogs;
const colors = data.colors;

const ProductCollapse = ({ product }) => {
  const filteredReviews = reviews.filter(
    (review) => review.productId === product.id
  );

  const { colorFamilies } = useSelector((state) => state.colorFamilies);

  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Product Info</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Card>
            <CardContent>
              <Typography variant="h5">{product.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
              {product.wallpaperId && (
                <Typography>
                  <strong>Size:</strong> {product.size}
                </Typography>
              )}

              {product.floorId && (
                <Typography>
                  <strong>Size:</strong> {product.size}
                </Typography>
              )}

              {product.paintId && (
                <>
                  <Typography>
                    <strong>Volume:</strong> {product.volume}
                  </Typography>
                  <Typography>
                    <strong>Coverage:</strong> {product.coverage}
                  </Typography>
                  <Typography>
                    <strong>Drying Time:</strong> {product.dryingTime}
                  </Typography>
                  <Typography>
                    <strong>Layers:</strong> {product.layers}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography component="span" sx={{ mr: 1 }}>
                      <strong>Color Available:</strong>
                    </Typography>
                    <ul
                      style={{
                        listStyleType: "none",
                        padding: 0,
                        margin: 0,
                        display: "flex",
                        flexWrap: "wrap",
                      }}
                    >
                      {product.colorIds &&
                        product.colorIds.map((colorId, index) => {
                          const color = colors.find((c) => c.id === colorId);
                          const colorFamily = colorFamilies.find(
                            (cf) => cf.id === color.colorFamily
                          );

                          if (color) {
                            return (
                              <li key={index} style={{ display: "block" }}>
                                <Link
                                  to={`/colors/color-family/${colorFamily.name}/${color.name}`}
                                  style={{
                                    color: "inherit",
                                    textDecoration: "none",
                                  }}
                                  onMouseOver={(e) =>
                                    (e.target.style.color = color.hex)
                                  }
                                  onMouseOut={(e) =>
                                    (e.target.style.color = "inherit")
                                  }
                                >
                                  "{color.code}"
                                </Link>
                                {index < product.colorIds.length - 1 && ", "}
                              </li>
                            );
                          }

                          return (
                            <Typography
                              key={index}
                              component="span"
                              style={{ display: "inline" }}
                            >
                              No Color Available
                            </Typography>
                          );
                        })}
                    </ul>
                  </Box>
                </>
              )}

              <Typography variant="body2">
                <strong>Features:</strong>
              </Typography>
              <ul>
                {product.features &&
                  product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
              </ul>
            </CardContent>
          </Card>
        </AccordionDetails>
      </Accordion>

    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">Rating & Review</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <Grid container spacing={2} key={review.id} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={4}>
                <Box display="flex" alignItems="center">
                  <Rating value={review.rating} precision={0.1} readOnly size="small" />
                  <Typography sx={{ ml: 1 }}>{review.rating} / 5</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="subtitle1">{review.user}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {review.date}
                </Typography>
                <Typography variant="body2">{review.comment}</Typography>
              </Grid>
            </Grid>
          ))
        ) : (
          <Typography>No reviews available for this product.</Typography>
        )}
      </AccordionDetails>
    </Accordion>

    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">Tips & Advice</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {blogs
          .filter((blog) => blog.type === "tips" || blog.type === "advice")
          .map((blog) => (
            <Grid container spacing={2} key={blog.id} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={2}>
                <img
                  src={blog.img}
                  alt={blog.title}
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    objectFit: "cover",
                    height: "auto",
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={10}>
                <Link
                  to={`/blogs/${blog.id}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <Typography variant="h6">{blog.title}</Typography>
                </Link>
                <Typography variant="body2" color="text.secondary">
                  <strong>Expert:</strong> {blog.expert}
                </Typography>
                <Typography variant="body2">{blog.description}</Typography>
              </Grid>
            </Grid>
          ))}
      </AccordionDetails>
    </Accordion>
    </>
  );
};

export default ProductCollapse;
