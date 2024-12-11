import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  IconButton,
  Input,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CalculatorIcon from "@mui/icons-material/Calculate";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import ProductCollapse from "./ProductCollapse";
import ProductsRelated from "./ProductRelated";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsFillHexagonFill } from "react-icons/bs";
import { FaCheck } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import textConfigs from "../../config/text.config";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalLoading } from "../../redux/reducer/globalLoadingSlice";
import productsApi from "../../api/modules/products.api";
import { toast } from "react-toastify";
import { useCallback } from "react";
import cartApi from "../../api/modules/cart.api";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const ProductDetailInfo = ({ product }) => {
  const { t } = useTranslation();

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { colorsSearch } = useSelector((state) => state.colorFamilies);

  const [quantity, setQuantity] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [products, setProducts] = useState([]);
  const productsPerPage = 20;
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  console.log('colorSearch', colorsSearch);

  const pageIndex = 0;

  // const rating = 0;
  // const reviewsCount = 0;

  // const fullStars = Math.floor(rating);
  // const hasHalfStar = rating % 1 !== 0;

  const ratingAverage = product.ratingAverage || 0;
  const fullStars = Math.floor(ratingAverage);
  const hasHalfStar = ratingAverage % 1 !== 0;
  const reviewsCount = product.reviewCount || 0;

  const increaseQuantity = () => {
    const inStock = selectedVariant.quantity;
    Number(quantity) < inStock && setQuantity(Number(quantity) + 1);
  };
  const decreaseQuantity = () => {
    Number(quantity) > 1 && setQuantity(Number(quantity) - 1);
  };
  console.log(product);

  const getProductOptions = () => {
    if (product.paints) {
      return product.paints;
    } else if (product.wallpapers) {
      return product.wallpapers;
    } else if (product.floors) {
      return product.floors;
    }
  };
  const dispatch = useDispatch();

  useEffect(() => {
    const products = getProductOptions();

    if (products.length > 0) {
      console.log(products);

      if (Array.isArray(colorsSearch) && colorsSearch.length > 0) {
        const foundProduct = products.find((product) =>
          colorsSearch.includes(product.color.hex)
        );
        console.log("Found product", foundProduct);
        if (foundProduct) {
          setSelectedProduct(foundProduct);
          setSelectedVariant(foundProduct.variants[0]);
        }
        else {
          setSelectedProduct(products[0]);
          setSelectedVariant(products[0].variants[0]);
        }
      }
      else {
        setSelectedProduct(products[0]);
        setSelectedVariant(products[0].variants[0]);
      }

    }
  }, []);

  const location = useLocation();
  const { productCal, selectedProductCal, selectedVariantCal } =
    location.state || {};

  useEffect(() => {
    if (productCal || selectedProductCal || selectedVariantCal) {
      if (product.category.name === "Paint") {
        console.log(selectedProductCal);
        console.log(selectedVariantCal);

        setSelectedProduct(selectedProductCal);
        setSelectedVariant(selectedVariantCal);
      } else if (product.category.name === "Wallpaper") {
        console.log(selectedProductCal);
        console.log(selectedVariantCal);
        setSelectedProduct(selectedProductCal);
        setSelectedVariant(selectedVariantCal);
      } else if (product.category.name === "Floor") {
        console.log(selectedProductCal);
        console.log(selectedVariantCal);
        setSelectedProduct(selectedProductCal);
        setSelectedVariant(selectedVariantCal);
      }
    }
  }, []);

  useEffect(() => {
    const getAllProductPageAble = async (page, size) => {
      dispatch(setGlobalLoading(true));
      try {
        const { response, err } = await productsApi.getProductByCategory(
          product.category.categoryId,
          page,
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
      } finally {
        dispatch(setGlobalLoading(false));
      }
    };
    getAllProductPageAble(pageIndex, productsPerPage);
  }, [dispatch, pageIndex, productsPerPage, product.category.categoryId]);

  const handleProductSelect = (productType) => {
    setSelectedProduct(productType);
    setSelectedVariant(productType.variants[0]);
  };
  console.log("Variant", selectedVariant);

  useEffect(() => {
    const getCart = async () => {
      if (user) {
        try {
          dispatch(setGlobalLoading(true));
          const { response, err } = await cartApi.getCart(user.userId);
          dispatch(setGlobalLoading(false));
          if (response) {
            setCart(response.data.carts);
          }
          if (err) {
            toast.error(err);
          }
        } catch (error) {
          toast.error(error);
        }
      }
    };
    getCart();
  }, [user]);

  const handleAddToCart = (quantity) => {
    if (user) {
      const status = 1;
      const updateQuantityType = "INCREMENTAL";
      const customerId = user.userId;
      const cartId = cart ? cart.cartId : "";
      const cartItems = [
        {
          ...(selectedVariant.categoryName === "Paint" && {
            variantId: selectedVariant.variantId,
          }),
          ...(selectedVariant.categoryName === "Wallpaper" && {
            variantId: selectedVariant.variantId,
          }),
          ...(selectedVariant.categoryName === "Floor" && {
            variantId: selectedVariant.variantId,
          }),
          productId: product.productId,
          quantity: quantity,
          ...(selectedVariant.categoryName === "Paint" && {
            paintId: selectedProduct.id,
          }),
          ...(selectedVariant.categoryName === "Wallpaper" && {
            wallpaperId: selectedProduct.id,
          }),
          ...(selectedVariant.categoryName === "Floor" && {
            floorId: selectedProduct.id,
          }),
        },
      ];

      updateCart(cartId, customerId, status, updateQuantityType, cartItems);
    } else {
      toast.error("Please login to add to cart");
    }
  };

  const handleBuyNow = (quantity) => {
    const checkoutData = {
      products: [
        {
          cartItemQuantity: quantity,
          cartItemVariant: {
            categoryName: selectedVariant.categoryName,
            packageType: selectedVariant.packageType,
            priceSell: selectedVariant.price,
            productDetails: {
              code: product.code,
              ...(selectedVariant.categoryName === "Paint" && {
                paintDetails: {
                  colorId: selectedProduct.color.id,
                  hex: selectedProduct.color.hex,
                  paintId: selectedProduct.id,
                },
              }),
              ...(selectedVariant.categoryName === "Wallpaper" && {
                wallpaperDetails: {
                  wallpaperId: selectedProduct.id,
                },
              }),
              ...(selectedVariant.categoryName === "Floor" && {
                floorDetails: {
                  floorId: selectedProduct.id,
                },
              }),
              productId: product.productId,
              productImage: product.images[0].url,
              productName: product.productName,
            },
            variantDescription: selectedVariant.sizeName,
            variantId: selectedVariant.variantId,
            variantInventory: selectedVariant.quantity,
          },
        },
      ],
      totalAmount: quantity * selectedVariant.price,
      billing: {},
      shippingFee: 0,
    };
    localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
    navigate("/billing");
  };

  const updateCart = useCallback(async (cartId, customerId, status, updateQuantityType, cartItems) => {
    const { response, err } = await cartApi.saveCart(cartId, customerId, status, updateQuantityType, cartItems);
    if (response) {
      toast.success('Added to cart successfully');
    }
    if (err && (err.code === 400 || err.code === 404)) {
      toast.error("Not found cart");
    }
    if (err && err.code === 500) {
      toast.error("Server error.");
    }
  }, []);

  return (
    <Box sx={{ backgroundColor: "#fafaf9", padding: 3 }}>
      <Container maxWidth="lg" sx={{ backgroundColor: "#ffffff", padding: 3 }}>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} md={9}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ ...textConfigs.style.basicFont }}
            >
              {capitalizeWords(product.productName)}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            display="flex"
            alignItems="center"
            justifyContent="end"
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                {[...Array(fullStars)].map((_, i) => (
                  <StarIcon
                    key={i}
                    sx={{ color: "#f39c12", fontSize: "1rem" }}
                  />
                ))}
                {hasHalfStar && (
                  <StarHalfIcon sx={{ color: "#f39c12", fontSize: "1rem" }} />
                )}
                {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map(
                  (_, i) => (
                    <StarBorderIcon
                      key={i}
                      sx={{ color: "#f39c12", fontSize: "1rem" }}
                    />
                  )
                )}
              </Box>

              <Typography
                sx={{ fontSize: "1rem", ...textConfigs.style.basicFont }}
              >{`(${reviewsCount} ${t("reviews")})`}</Typography>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={2} my={2}>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                width: "100%",
              }}
            >
              <Swiper
                style={{
                  "--swiper-navigation-color": "#fff",
                  "--swiper-pagination-color": "#fff",
                }}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
              >
                {product.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image.url}
                      alt={`Product ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "cover",
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Swiper cho ảnh thumbnail */}
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
                style={{ marginTop: "10px" }}
              >
                {product.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image.url}
                      alt={`Product Thumbnail ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "cover",
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            {selectedVariant && (
              <Typography
                variant="h6"
                color="#f11a00"
                gutterBottom
                mb={1}
                sx={{ ...textConfigs.style.basicFont }}
              >
                ${selectedVariant.price} / {selectedVariant.packageType}
              </Typography>
            )}

            <Typography
              variant="body1"
              gutterBottom
              mb={1}
              sx={{ ...textConfigs.style.basicFont }}
            >
              {t("product.detail.note.price")}
            </Typography>
            {product && (
              <Box>
                {product.paints && (
                  <Typography
                    variant="body2"
                    color="#000"
                    fontWeight="bold"
                    sx={{ ...textConfigs.style.basicFont }}
                  >
                    {t("colors")}:
                  </Typography>
                )}
                {product.floors && (
                  <Typography
                    variant="body2"
                    color="#000"
                    fontWeight="bold"
                    sx={{ ...textConfigs.style.basicFont }}
                  >
                    {t("type")}:
                  </Typography>
                )}
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  {getProductOptions().map((product, index) => {
                    return (
                      <React.Fragment key={index}>
                        {product.color && (
                          <Tooltip
                            title={`${product.color.name} (${product.color.code})`}
                            placement="top"
                            arrow
                            sx={{ ...textConfigs.style.basicFont }}
                          >
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
                              {selectedProduct?.id === product.id && (
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
                          </Tooltip>
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
                                selectedProduct?.id === product?.id
                                  ? "#f0f0f0"
                                  : "#fff",
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
                      sx={{ marginTop: 2, ...textConfigs.style.basicFont }}
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
                            backgroundColor:
                              selectedVariant?.variantId === variant.variantId
                                ? "#f0f0f0"
                                : "#fff",
                            width: "120px",
                          }}
                          onClick={() => setSelectedVariant(variant)}
                        >
                          <Typography
                            variant="body2"
                            sx={{ ...textConfigs.style.basicFont }}
                          >
                            {variant.sizeName}{" "}
                            {selectedProduct.color ? "L" : "m"}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </>
                )}
              </Box>
            )}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                my: 1,
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", mb: 1, flex: 1 }}
              >
                <Typography
                  variant="body2"
                  color="#000"
                  fontWeight="bold"
                  sx={{ ...textConfigs.style.basicFont }}
                >
                  {t("brand")}:
                </Typography>
                <Typography
                  variant="body2"
                  ml={1}
                  color="#000"
                  sx={{ ...textConfigs.style.basicFont }}
                >
                  {product.brand.name}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", mb: 1, flex: 1 }}
              >
                <Typography
                  variant="body2"
                  color="#000"
                  fontWeight="bold"
                  sx={{ ...textConfigs.style.basicFont }}
                >
                  {t("product.code")}:
                </Typography>
                <Typography
                  variant="body2"
                  ml={1}
                  color="#000"
                  sx={{ ...textConfigs.style.basicFont }}
                >
                  {product.code}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                mb: 1,
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", mb: 1, flex: 1 }}
              >
                <Typography
                  variant="body2"
                  color="#000"
                  fontWeight="bold"
                  sx={{ ...textConfigs.style.basicFont }}
                >
                  {t("origin")}:
                </Typography>
                <Typography
                  variant="body2"
                  ml={1}
                  color="#000"
                  sx={{ ...textConfigs.style.basicFont }}
                >
                  {product.placeOfOrigin}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", mb: 1, flex: 1 }}
              >
                <Typography
                  variant="body2"
                  color="#000"
                  fontWeight="bold"
                  sx={{ ...textConfigs.style.basicFont }}
                >
                  {t("shipping")}:
                </Typography>
                <Typography variant="body2" ml={1} color="#000">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/colux-alpha-storage.appspot.com/o/commons%2FGHN.png?alt=media&token=bebc7279-0aba-4000-a430-da857cd9ee57"
                    alt=""
                    style={{ height: "20px" }}
                  />
                </Typography>
              </Box>
            </Box>
            {selectedVariant && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 1,
                    flex: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    color="#000"
                    fontWeight="bold"
                    sx={{ ...textConfigs.style.basicFont }}
                  >
                    {t("in.stock")}:
                  </Typography>
                  <Typography
                    variant="body2"
                    ml={1}
                    color="#000"
                    sx={{ ...textConfigs.style.basicFont }}
                  >
                    {selectedVariant.quantity > 0
                      ? `${t("still.in.stock")} (${selectedVariant.quantity
                      } ${t("products")})`
                      : `${t("out.of.stock")}`}
                  </Typography>
                </Box>

                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mb={1}
                  flexDirection="row"
                  sx={{ flex: 1 }}
                >
                  <Box>
                    <IconButton onClick={decreaseQuantity}>
                      <RemoveIcon />
                    </IconButton>
                    <Input
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      sx={{
                        width: 50,
                        textAlign: "center",
                        "& input": {
                          textAlign: "center",
                        },
                      }}
                    />
                    <IconButton onClick={increaseQuantity}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            )}

            <Typography
              variant="body2"
              mt={1}
              color="#000"
              sx={{ ...textConfigs.style.basicFont }}
            >
              {t("product.detail.estimated.cost.title")}
            </Typography>

            <CalculatorIcon
              sx={{
                color: "#1D4Ed8",
                fontSize: "1.2rem",
                marginRight: "8px",
              }}
            />
            <Link
              to="/calculate-price"
              state={{ product, selectedProduct, selectedVariant }}
              className="text-[#1D4Ed8] no-underline"
              style={{
                fontWeight: "bold",
                fontSize: ".8rem",
                ...textConfigs.style.basicFont,
              }}
            >
              {t("product.detail.estimated.cost.link")}
            </Link>
            <Grid container spacing={2} mt={1}>
              <Grid item xs={12} md={6} display="flex" justifyContent="center">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#c11700",
                    padding: "12px",
                    width: "70%",
                    ":hover": { backgroundColor: "#1c2759" },
                    ...textConfigs.style.basicFont,
                  }}
                  onClick={() => {
                    handleAddToCart(quantity);
                  }}
                >
                  {t("add.to.cart")}
                </Button>
              </Grid>
              <Grid item xs={12} md={6} display="flex" justifyContent="center">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#018e4d",
                    padding: "12px",
                    width: "70%",
                    ":hover": { backgroundColor: "#1c2759" },
                    ...textConfigs.style.basicFont,
                  }}
                  onClick={() => {
                    handleBuyNow(quantity);
                  }}
                >
                  {t("buy.now")}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <ProductCollapse product={product} />
        <ProductsRelated products={products} />
      </Container>
    </Box>
  );
};

export default ProductDetailInfo;
