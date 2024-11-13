import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Grid,
  Rating,
  List,
  ListItem,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import data from "../../data/data";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BsFillHexagonFill } from "react-icons/bs";
import { FaCheck } from "react-icons/fa6";
import textConfigs from "../../config/text.config";

const blogs = data.blogs;

const ProductCollapse = ({ product }) => {
  const { t } = useTranslation();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [reviews, setReviews] = useState([]);

  const filteredReviews = reviews.filter(
    (review) => review.productId === product.productId
  );

  const getProductOptions = () => {
    if (product.paints) {
      return product.paints;
    } else if (product.wallpapers) {
      return product.wallpapers;
    } else if (product.floors) {
      return product.floors;
    }
  };

  useEffect(() => {
    const products = getProductOptions();

    if (products.length > 0) {
      setSelectedProduct(products[0]);
    }
  }, []);

  const handleProductSelect = (productType) => {
    setSelectedProduct(productType);
  };

  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ ...textConfigs.style.basicFont }}>
            {t("product.info")}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" sx={{ ...textConfigs.style.basicFont, paddingBottom: "4px" }}>
            {product.code}
          </Typography>
          <Typography variant="h6" sx={{ ...textConfigs.style.basicFont, paddingBottom: "4px" }}>
            {product.productName}
          </Typography>
          <Typography variant="body2" sx={{ ...textConfigs.style.basicFont, paddingBottom: "4px" }}>
            {product.description}
          </Typography>
          <Typography variant="body2" sx={{ ...textConfigs.style.basicFont, paddingBottom: "4px" }}>
            <strong>{t("origin")}:</strong> {product.placeOfOrigin}
          </Typography>
          <Typography variant="body2" sx={{ ...textConfigs.style.basicFont, paddingBottom: "4px" }}>
            <strong>{t("warranty")}:</strong> {product.warranty}
          </Typography>
          <Typography variant="body2" sx={{ ...textConfigs.style.basicFont, paddingBottom: "4px" }}>
            <strong>{t("applicable.surface")}:</strong>{" "}
            {product.applicableSurface}
          </Typography>

          {product && (
            <Box>
              {product.paints && (
                <Typography
                  variant="body2"
                  color="#000"
                  fontWeight="bold"
                  sx={{ ...textConfigs.style.basicFont, paddingBottom: "4px" }}
                >
                  {t("colors")}:
                </Typography>
              )}
              {product.wallpapers && (
                <Typography
                  variant="body2"
                  color="#000"
                  fontWeight="bold"
                  sx={{ ...textConfigs.style.basicFont, paddingBottom: "4px" }}
                >
                  {t("type")}:
                </Typography>
              )}
              {product.floors && (
                <Typography
                  variant="body2"
                  color="#000"
                  fontWeight="bold"
                  sx={{ ...textConfigs.style.basicFont, paddingBottom: "4px" }}
                >
                  {t("type")}:
                </Typography>
              )}
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                {getProductOptions().map((product, index) => {
                  return (
                    <React.Fragment key={index}>
                      {product.color && (
                        <Box
                          sx={{
                            position: "relative",
                            display: "inline-block",
                            cursor: "pointer",
                          }}
                          onClick={() => handleProductSelect(product)}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.transform = "scale(1.1)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.transform = "scale(1)")
                          }
                        >
                          <BsFillHexagonFill
                            size={window.innerWidth < 600 ? 20 : 40}
                            style={{
                              color: product.color.hex,
                              filter: "drop-shadow(0px 0px 4px #ccc)",
                              transition: "transform 0.2s ease-in-out",
                            }}
                          />
                          {selectedProduct === product && (
                            <FaCheck
                              style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                color: "#fff",
                                fontSize: window.innerWidth < 600 ? 10 : 20,
                              }}
                            />
                          )}
                        </Box>
                      )}
                      {product.area && (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 1,
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            marginBottom: 1,
                            cursor: "pointer",
                            backgroundColor:
                              selectedProduct === product ? "#f0f0f0" : "#fff",
                            width: "100px",
                          }}
                          onClick={() => handleProductSelect(product)}
                        >
                          <Typography
                            variant="body2"
                            sx={{ ...textConfigs.style.basicFont }}
                          >
                            {product.area} m2
                          </Typography>
                        </Box>
                      )}
                      {product.numberOfPiecesPerBox && (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 1,
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            marginBottom: 1,
                            cursor: "pointer",
                            backgroundColor:
                              selectedProduct === product ? "#f0f0f0" : "#fff",
                            width: "100px",
                          }}
                          onClick={() => handleProductSelect(product)}
                        >
                          <Typography
                            variant="body2"
                            sx={{ ...textConfigs.style.basicFont }}
                          >
                            {product.numberOfPiecesPerBox} {t("pieces")}
                          </Typography>
                        </Box>
                      )}
                    </React.Fragment>
                  );
                })}
              </Box>
              {selectedProduct && (
                <>
                  <Typography
                    variant="body2"
                    color="#000"
                    fontWeight="bold"
                    sx={{ marginTop: 2, ...textConfigs.style.basicFont, paddingBottom: "4px" }}
                  >
                    {t("size")}:
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      flexWrap: "wrap",
                    }}
                  >
                    {selectedProduct.variants.map((variant, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: 1,
                          border: "1px solid #ddd",
                          borderRadius: "4px",
                          marginBottom: 1,
                          cursor: "pointer",
                          backgroundColor: "#fff",
                          width: "100px",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ ...textConfigs.style.basicFont, paddingBottom: "4px" }}
                        >
                          {variant.sizeName}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </>
              )}
            </Box>
          )}
          <Typography
            variant="body2"
            sx={{ fontWeight: "bold", mb: 0, ...textConfigs.style.basicFont, paddingBottom: "4px" }}
          >
            {t("property")}:
          </Typography>
          <Box
            sx={{
              mb: 1,
              maxHeight: "200px",
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            <List sx={{ paddingX: 2, paddingY: 0 }}>
              {product.properties &&
                product.properties.map((property, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      padding: "0",
                      display: "flex",
                      alignItems: "center",
                      paddingBottom: "4px"
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: "bold",
                        fontSize: "0.875rem",
                        ...textConfigs.style.basicFont,
                      }}
                    >
                      {property.property.name}:
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "0.875rem",
                        ...textConfigs.style.basicFont,
                      }}
                      paddingLeft={1}
                    >
                      {property.value}{" "}
                      {property.property.name === "Coverage" && "L/m2"}
                    </Typography>
                  </ListItem>
                ))}
            </List>
          </Box>
          <Typography
            variant="body2"
            sx={{ fontWeight: "bold", mb: 0, ...textConfigs.style.basicFont, paddingBottom: "4px" }}
          >
            {t("features")}:
          </Typography>
          <Box
            sx={{
              mb: 1,
              maxHeight: "200px",
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            <List sx={{ paddingX: 2, paddingY: 0 }}>
              {product.features &&
                product.features.map((feature, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      padding: "0",
                      display: "flex",
                      alignItems: "center",
                      paddingBottom: "4px"
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: "bold",
                        fontSize: "0.875rem",
                        ...textConfigs.style.basicFont,
                      }}
                    >
                      {feature.feature.name}:
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "0.875rem",
                        ...textConfigs.style.basicFont,
                      }}
                      paddingLeft={1}
                    >
                      {feature.value}
                    </Typography>
                  </ListItem>
                ))}
            </List>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ ...textConfigs.style.basicFont }}>
            {t("review.title")}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review) => (
              <Grid container spacing={2} key={review.id} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={4}>
                  <Box display="flex" alignItems="center">
                    <Rating
                      value={review.rating}
                      precision={0.1}
                      readOnly
                      size="small"
                    />
                    <Typography sx={{ ml: 1, ...textConfigs.style.basicFont }}>
                      {review.rating} / 5
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography
                    variant="subtitle1"
                    sx={{ ...textConfigs.style.basicFont }}
                  >
                    {review.user}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ ...textConfigs.style.basicFont }}
                  >
                    {review.date}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ ...textConfigs.style.basicFont }}
                  >
                    {review.comment}
                  </Typography>
                </Grid>
              </Grid>
            ))
          ) : (
            <Typography sx={{ ...textConfigs.style.basicFont }}>
              {t("no.review")}
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ ...textConfigs.style.basicFont }}>
            {t("tip.advice")}
          </Typography>
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
                    <Typography
                      variant="h6"
                      sx={{ ...textConfigs.style.basicFont }}
                    >
                      {blog.title}
                    </Typography>
                  </Link>
                  <Typography
                    variant="body2"
                    sx={{ ...textConfigs.style.basicFont }}
                  >
                    <strong>{t("expert")}:</strong> {blog.expert}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ ...textConfigs.style.basicFont }}
                  >
                    {blog.description}
                  </Typography>
                </Grid>
              </Grid>
            ))}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default ProductCollapse;
