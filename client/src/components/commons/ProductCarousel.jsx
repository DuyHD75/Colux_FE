import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Container,
  CardMedia,
} from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import textConfigs from "../../config/text.config";
import backgroundConfigs from "../../config/background.config";
import { useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useTranslation } from "react-i18next";
import productsApi from "../../api/modules/products.api";
import { toast } from "react-toastify";

const ProductCarousel = () => {
  const [products, setProducts] = useState([]);
  const productsPerPage = 10;

  const theme = useTheme();
  const { t } = useTranslation();

  const dispatch = useDispatch();
  useEffect(() => {
    const getTopProducts = async (page, size) => {
      try {
        const { response, err } = await productsApi.getTopProducts(
          page - 1,
          size
        );
        if (response) {
          setProducts([...response.data.products.content]);
        } else if (err) {
          toast.error(err);
        }
      } catch (error) {
        console.log("Error", error);
        toast.error("An error occurred while fetching products.");
      }
    };
    getTopProducts(1, productsPerPage);
  }, [dispatch, 1, productsPerPage]);

  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = Math.ceil(products.length / 3);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handlePrev = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (products.length === 0) {
    return null;
  }

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
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          {capitalizeWords(t("home.products.title"))}
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
                      m: 1,
                      maxWidth: 345,
                      height: 400,
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                    }}
                  >
                    <Button
                      href={`/products/${product.categoryName}/${product.categoryId}/${product.name}/${product.productId}`}
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
                          image={product.image && product.image}
                          alt={product.name}
                        />
                      </Box>
                    </Button>
                    <CardContent
                      sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "center",
                        textAlign: "center",
                        paddingBottom: "16px",
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
                            fontSize: "14px",
                            display: "-webkit-box",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                            fontWeight: "bold",
                            ...textConfigs.style.basicFont,
                          }}
                        >
                          {capitalizeWords(product.name)}
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: "12px",
                            color: "gray",
                            marginTop: "4px",
                            ...textConfigs.style.basicFont,
                          }}
                        >
                          {t("sold")}: {product.sold} {t("products")}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          marginTop: "16px",
                          padding: "8px",
                          backgroundColor: "#f8f9fa",
                          borderRadius: "8px",
                          width: "100%",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: "12px",
                            color: "gray",
                            ...textConfigs.style.basicFont,
                          }}
                        >
                          🚀 {t("free.ship")}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: "12px",
                            color: "gray",
                            ...textConfigs.style.basicFont,
                          }}
                        >
                          🌟 {t("return")}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          width: "100%",
                          borderTop: "1px solid #e0e0e0",
                          marginTop: "16px",
                          paddingTop: "8px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/colux-alpha-storage.appspot.com/o/commons%2FGHN.png?alt=media&token=bebc7279-0aba-4000-a430-da857cd9ee57" // Thay bằng đường dẫn logo GHN
                          alt="GHN Logo"
                          style={{ height: "24px" }}
                        />
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: "12px",
                            fontWeight: "bold",
                            color: "#4caf50",
                            ...textConfigs.style.basicFont,
                          }}
                        >
                          GHN Express
                        </Typography>
                      </Box>
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
