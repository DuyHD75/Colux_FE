import React, { useState } from "react";
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

const colors = data.colors;

const ProductDetailInfo = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");

  const {
    rating = 0,
    image,
    name,
    reviewsCount = 0,
    features = [],
    colorIds = [],
  } = product;

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const increaseQuantity = () =>
    quantity < product.stock && setQuantity(quantity + 1);
  const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);

  // Mock function to get color options based on colorIds
  const getColorOptions = () => {
    return colors.filter((color) => colorIds.includes(color.id));
  };

  return (
    <Box sx={{ backgroundColor: "#fafaf9", padding: 3 }}>
      <Container maxWidth="lg" sx={{ backgroundColor: "#ffffff", padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Product Detail
        </Typography>
        <Grid container spacing={2} my={2}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                "& img": {
                  width: { xs: "100%", md: "400px" },
                  height: { xs: "auto", md: "400px" },
                  objectFit: "cover",
                },
              }}
            >
              <img src={product.image} alt="Product Detail" />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="h6" color="#f11a00" gutterBottom>
              Price: ${product.price}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 2,
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
              <Typography sx={{ fontSize: "1rem" }}>
                {`(${reviewsCount} Reviews)`}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography variant="body2" color="#000" fontWeight="bold">
                In Stock:
              </Typography>
              <Typography variant="body2" ml={1} color="#000">
                {product.stock}
              </Typography>
            </Box>
            <Typography variant="body1" gutterBottom>
              {product.description}
            </Typography>
            <Box display="flex" alignItems="center" mb={2}>
              <CalculatorIcon />
              <Link
                to="/calculate-price"
                className="text-[#1D4Ed8] no-underline hover:underline"
              >
                Calculate estimated costs now
              </Link>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb={2}
              flexDirection={{ xs: "column", md: "row" }}
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
              {product.paintId && (
                <FormControl
                  variant="outlined"
                  sx={{ width: "100%", maxWidth: "250px" }}
                >
                  <Select
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      Select Color
                    </MenuItem>
                    {getColorOptions().map((color) => (
                      <MenuItem key={color.id} value={color.id}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Box
                            sx={{
                              width: 24,
                              height: 24,
                              backgroundColor: color.hex,
                              borderRadius: "50%",
                            }}
                          />
                          {color.name}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#f11a00",
                    padding: "20px",
                    ":hover": { backgroundColor: "#01ae5e" },
                  }}
                  fullWidth
                >
                  Add to Cart
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#01ae5e",
                    padding: "20px",
                  }}
                  fullWidth
                >
                  Buy Now
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <ProductCollapse product={product} />
        <ProductsRelated product={product} />
      </Container>
    </Box>
  );
};

export default ProductDetailInfo;
