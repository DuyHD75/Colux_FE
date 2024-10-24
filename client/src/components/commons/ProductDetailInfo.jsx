import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  IconButton,
  Input,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CalculatorIcon from "@mui/icons-material/Calculate";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import data from "../../data/data";
import ProductCollapse from "./ProductCollapse";
import ProductsRelated from "./ProductRelated";
import { Link } from "react-router-dom";
import { BsFillHexagonFill } from "react-icons/bs";
import { FaCheck } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import textConfigs from "../../config/text.config";
import { useDispatch } from "react-redux";
import { setGlobalLoading } from "../../redux/reducer/globalLoadingSlice";
import productsApi from "../../api/modules/products.api";
import { toast } from "react-toastify";

const colors = data.colors;

const ProductDetailInfo = ({ product }) => {
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [products, setProducts] = useState([]);
  const productsPerPage = 20;
  const [pageIndex, setPageIndex] = useState(0);

  const rating = 0;
  const reviewsCount = 0;

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const increaseQuantity = () => {
    const inStock = selectedVariant.quantity;
    quantity < inStock && setQuantity(quantity + 1);
  };
  const decreaseQuantity = () => {
    quantity > 1 && setQuantity(quantity - 1);
  };

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
      setSelectedProduct(products[0]);
      setSelectedVariant(products[0].variants[0]);
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
        
        console.log(response);

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
              {product.productName}
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
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
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                "& img": {
                  width: { xs: "100%", md: "100%" },
                  height: { xs: "auto", md: "auto" },
                  objectFit: "cover",
                },
              }}
            >
              <img
                src={product.images.length > 0 ? product.images[0].url : ""}
                alt="Product Detail"
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
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
                  <Typography variant="body2" color="#000" fontWeight="bold" sx={{ ...textConfigs.style.basicFont }}>
                    {t("colors")}:
                  </Typography>
                )}
                {product.wallpapers && (
                  <Typography variant="body2" color="#000" fontWeight="bold" sx={{ ...textConfigs.style.basicFont }}>
                    {t("type")}:
                  </Typography>
                )}
                {product.floors && (
                  <Typography variant="body2" color="#000" fontWeight="bold" sx={{ ...textConfigs.style.basicFont }}>
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
                                selectedProduct === product
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
                                selectedProduct === product
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
                            width: "100px",
                          }}
                          onClick={() => setSelectedVariant(variant)}
                        >
                          <Typography
                            variant="body2"
                            sx={{ ...textConfigs.style.basicFont }}
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
                  {product.code}
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
                        ? `${t("still.in.stock")} (${
                            selectedVariant.quantity
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
              <Grid item xs={12} md={6}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#f11a00",
                    padding: "12px",
                    ":hover": { backgroundColor: "#01ae5e" },
                    ...textConfigs.style.basicFont,
                  }}
                  fullWidth
                >
                  {t("add.to.cart")}
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#01ae5e",
                    padding: "12px",
                    ...textConfigs.style.basicFont,
                  }}
                  fullWidth
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
