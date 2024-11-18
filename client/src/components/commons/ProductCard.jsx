import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import textConfigs from "../../config/text.config";


const ProductCard = ({ product }) => {
  const { t } = useTranslation();
  const { productCategory, productCategoryId } = useParams();
  if (!product) {
    return null;
  }

  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const ratingAverage = product.ratingAverage || 0;
  const fullStars = Math.floor(ratingAverage);
  const hasHalfStar = ratingAverage % 1 !== 0;
  const reviewsCount = product.reviewsCount || 0;
  

  const handleClick = () => {
    localStorage.setItem("selectedProduct", JSON.stringify(product));
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        height: 300,
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >

      <Link to={`/products/${productCategory ? productCategory : product.category.name}/${productCategoryId ? productCategoryId : product.category.category}/${product.productName}/${product.productId}`} onClick={handleClick}>
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
            image={product.images.length > 0 && product.images[0].url}
            alt={product.productName}
          />
        </Box>
      </Link>
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
            {capitalizeWords(product.productName)}
          </Typography>
          {Number.isFinite(fullStars) && (
          <Box sx={{ mt: 1,}}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {[...Array(fullStars)].map((_, i) => (
                <StarIcon key={i} sx={{ color: "#f39c12", fontSize: "1rem" }} />
              ))}
              {hasHalfStar && (
                <StarHalfIcon sx={{ color: "#f39c12", fontSize: "1rem" }} />
              )}
              {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
                <StarBorderIcon
                  key={i}
                  sx={{ color: "#f39c12", fontSize: "1rem" }}
                />
              ))}
            </Box>
            <Typography variant="body2" sx={{ ml: 0, fontSize: "0.75rem", ...textConfigs.style.basicFont, }}>
              {`(${reviewsCount} ${t("reviews")})`}
            </Typography>
          </Box>
          )}
          <Box
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "0.65rem", ...textConfigs.style.basicFont, }}
          >
            <ul>
              {product.features.slice(0, 3).map((feature, i) => (
                <li key={i}>{feature.feature.name}</li>
              ))}
              {product.features.length > 3 && <li>...</li>}
            </ul>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
