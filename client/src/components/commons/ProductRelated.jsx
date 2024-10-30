import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
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

const ProductsRelated = ({ products }) => {
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
            {products.map((relatedProduct, index) => (
              <SwiperSlide key={index}>
                <Card
                  sx={{
                    borderRadius: 0,
                    border: "1px solid #ddd",
                    boxShadow: "none",
                    minHeight: "400px",
                  }}
                >
                  <CardContent
                    sx={{
                      padding: 0,
                      "&:last-child": {
                        padding: 0,
                      },
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid
                        item
                        xs={12}
                        style={{ textAlign: "center", padding: 0 }}
                      >
                        <div
                          style={{
                            width: "50%",
                            height: "200px",
                            overflow: "inherit",
                            position: "relative",
                          }}
                        >
                          <img
                            src={
                              relatedProduct.images.length > 0 &&
                              relatedProduct.images[0].url
                            }
                            alt={relatedProduct.name}
                            style={{
                              width: "100%",
                              height: "auto",
                              position: "absolute",
                              left: "50%",
                              bottom: "-15%",
                            }}
                          />
                        </div>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sx={{
                          padding: "20px",
                          marginLeft: "12px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{
                            marginTop: "20px",
                            fontSize: "0.75rem",
                            display: "-webkit-box",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                            width: "100%",
                            textAlign: "center",
                            fontWeight: "bold",
                            ...textConfigs.style.basicFont,
                          }}
                        >
                          {relatedProduct.productName}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            ...textConfigs.style.subText,
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            textOverflow: "ellipsis",
                            width: "100%",
                            textAlign: "center",
                            minHeight: "60px",
                          }}
                        >
                          {relatedProduct.description}
                        </Typography>
                        <Button
                          variant="contained"
                          href={`/products/${productCategory}/${productCategoryId}/${relatedProduct.productName}/${relatedProduct.productId}`}
                          sx={{
                            ...backgroundConfigs.style.backgroundPrimary,
                            marginTop: "8px",
                            ":hover": {
                              ...backgroundConfigs.style.backgroundSecondary,
                              ...textConfigs.style.basicFont,
                            },
                          }}
                          onClick={handleClick(relatedProduct)}
                        >
                          View Detail
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
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
