import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import textConfigs from "../../config/text.config";
import backgroundConfigs from "../../config/background.config";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useParams } from "react-router-dom";

const ProductCarousel = () => {
  const { products } = useSelector((state) => state.products);
  const { productCategory } = useParams();
  const theme = useTheme();

  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = Math.ceil(products.length / 3);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handlePrev = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ ...backgroundConfigs.style.backgroundPrimary }}>
      <Container
        maxWidth="lg"
        sx={{ justifyContent: "center", paddingY: "64px" }}
      >
        <Typography
          variant="h3"
          align="center"
          sx={{
            ...textConfigs.style.headerText,
            color: "#fff",
            paddingBottom: "20px",
          }}
        >
          View our most popular products
        </Typography>
        <Grid
          container
          sx={{ display: "flex", alignItems: "center", justifyContent: "end" }}
        >
          <Grid
            item
            xs={0}
            md={1}
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "start",
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
                width: "50px",
                height: "50px",
                ":hover": { ...backgroundConfigs.style.backgroundContext },
              }}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
            </Button>
          </Grid>
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
              spaceBetween={30}
              navigation={{
                nextEl: ".button-next",
                prevEl: ".button-prev",
              }}
              modules={[Navigation]}
              className="swiperProduct"
            >
              {products.map((product, index) => (
                <SwiperSlide key={product.id}>
                  <Card
                    sx={{
                      borderRadius: 0,
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
                          md={12}
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
                              src={product.image}
                              alt={product.name}
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
                          md={12}
                          sx={{
                            ...backgroundConfigs.style.backgroundContext,
                            padding: "20px",
                            marginLeft: "10px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Typography
                            variant="h5"
                            gutterBottom
                            sx={{
                              marginTop: "20px",

                              ...textConfigs.style.headerText,
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              width: "100%",
                              textAlign: "center",
                            }}
                          >
                            {product.name}
                          </Typography>
                          <Typography
                            variant="body1"
                            gutterBottom
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
                            {product.description}
                          </Typography>
                          <Button
                            variant="contained"
                            href={`/products/${productCategory}/${product.name}`}
                            sx={{
                              ...backgroundConfigs.style.backgroundPrimary,
                              marginTop: "16px",
                              ":hover": {
                                ...backgroundConfigs.style.backgroundSecondary,
                              },
                            }}
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
          <Grid
            item
            xs={0}
            md={1}
            sx={{ display: { xs: "none", md: "flex" }, justifyContent: "end" }}
          >
            <Button
              size="small"
              className="button-next"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
              sx={{
                ...backgroundConfigs.style.subBackgroundContext,
                ...textConfigs.style.headerText,
                width: "50px",
                height: "50px",
                ":hover": { ...backgroundConfigs.style.backgroundContext },
              }}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductCarousel;
