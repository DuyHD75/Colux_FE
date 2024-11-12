import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Navigation } from "swiper/modules";
import textConfigs from "../../config/text.config";
import backgroundConfigs from "../../config/background.config";
import { useParams } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import { useTranslation } from "react-i18next";

const ProductsRelated = ({ products }) => {
  const { t } = useTranslation();
  const { productCategory, productCategoryId } = useParams();

  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = Math.ceil(products.length / 3);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handlePrev = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleClick = (product) => {
    localStorage.setItem("selectedProduct", JSON.stringify(product));
  };

  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <Box mt={5}>
      <Typography
        variant="h4"
        align="center"
        sx={{
          ...textConfigs.style.headerText,
          paddingBottom: "20px",
        }}
      >
        Related Products
      </Typography>
      <Grid
        container
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {products.length > 3 && (
          <Grid
            item
            xs={0}
            md={1}
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            <Button
              size="small"
              className="button-prev"
              onClick={handlePrev}
              disabled={activeStep === 0}
              sx={{
                ...backgroundConfigs.style.subBackgroundContext,
                ...textConfigs.style.headerText,
                width: "40px",
                height: "40px",
                ":hover": { ...backgroundConfigs.style.backgroundContext },
              }}
            >
              <KeyboardArrowLeft />
            </Button>
          </Grid>
        )}
        <Grid item xs={12} md={10}>
          <Swiper
            breakpoints={{
              0: {
                slidesPerView: 1,
                slidesPerGroup: 1,
              },
              576: {
                slidesPerView: 3,
                slidesPerGroup: 3,
              },
            }}
            spaceBetween={20}
            navigation={
              products.length > 3
                ? {
                    nextEl: ".button-next",
                    prevEl: ".button-prev",
                  }
                : false
            }
            modules={[Navigation]}
            className="swiperRelated"
          >
            {products.map((relatedProduct, index) => {
              const ratingAverage = relatedProduct.ratingAverage ?? 0
              const fullStars = Math.floor(ratingAverage);
              const hasHalfStar = ratingAverage % 1 !== 0;

              return (
                <SwiperSlide key={index}>
                  <Card
                    sx={{
                      m: 1,
                      maxWidth: 345,
                      height: 400,
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                    }}
                  >
                    <Button
                      href={`/products/${productCategory}/${productCategoryId}/${relatedProduct.productName}/${relatedProduct.productId}`}
                      onClick={handleClick(relatedProduct)} 
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: 140,
                          width: "100%",
                        }}
                      >
                        <CardMedia
                          component="img"
                          sx={{
                            marginTop: "10px",
                            width: "45%",
                            height: 120,
                            objectFit: "cover",
                          }}
                          image={
                            relatedProduct.images.length > 0 &&
                            relatedProduct.images[0].url
                          }
                          alt={relatedProduct.productName}
                        />
                      </Box>
                    </Button>
                    <CardContent
                      sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="div"
                          sx={{
                            fontSize: "0.75rem",
                            display: "-webkit-box",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "bold",
                            ...textConfigs.style.basicFont,
                          }}
                        >
                          {capitalizeWords(relatedProduct.productName)}
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {[...Array(fullStars)].map((_, i) => (
                              <StarIcon
                                key={i}
                                sx={{ color: "#f39c12", fontSize: "1rem" }}
                              />
                            ))}
                            {hasHalfStar && (
                              <StarHalfIcon
                                sx={{ color: "#f39c12", fontSize: "1rem" }}
                              />
                            )}
                            {[
                              ...Array(5 - fullStars - (hasHalfStar ? 1 : 0)),
                            ].map((_, i) => (
                              <StarBorderIcon
                                key={i}
                                sx={{ color: "#f39c12", fontSize: "1rem" }}
                              />
                            ))}
                          </Box>
                          <Typography
                            variant="body2"
                            sx={{
                              ml: 0,
                              fontSize: "0.75rem",
                              ...textConfigs.style.basicFont,
                            }}
                          >
                            {`(${relatedProduct.reviewsCount || 0} ${t(
                              "reviews"
                            )})`}
                          </Typography>
                        </Box>
                        <Box
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            fontSize: "0.65rem",
                            ...textConfigs.style.basicFont,
                          }}
                        >
                          <ul>
                            {relatedProduct.features
                              .slice(0, 3)
                              .map((feature, i) => (
                                <li key={i}>{feature.feature.name}</li>
                              ))}
                            {relatedProduct.features.length > 3 && <li>...</li>}
                          </ul>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Grid>
        {products.length > 3 && (
          <Grid
            item
            xs={0}
            md={1}
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            <Button
              size="small"
              className="button-next"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
              sx={{
                width: "40px",
                height: "40px",
                ":hover": { backgroundColor: "#ddd" },
              }}
            >
              <KeyboardArrowRight />
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ProductsRelated;
