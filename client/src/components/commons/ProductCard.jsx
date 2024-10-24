import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Box,
  SvgIcon,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import textConfigs from "../../config/text.config";

const HeartOutlineIcon = (props) => (
  <SvgIcon {...props} sx={{ fontSize: "1rem" }}>
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      fill="none"
      stroke="gray"
      strokeWidth="2"
    />
  </SvgIcon>
);

const ProductCard = ({ product }) => {
  const { t } = useTranslation();
  const { productCategory, productCategoryId } = useParams();
  if (!product) {
    return null;
  }

  const ratingAverage = product.ratingAverage || 0;
  const fullStars = Math.floor(ratingAverage);
  const hasHalfStar = ratingAverage % 1 !== 0;
  const reviewsCount = product.reviewsCount || 0;
  

  const handleClick = () => {
    // Lưu sản phẩm vào localStorage
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
      <IconButton
        sx={{
          position: "absolute",
          top: 1,
          right: 3,
          zIndex: 1,
        }}
      >
        <HeartOutlineIcon />
      </IconButton>

      <Link to={`/products/${productCategory}/${productCategoryId}/${product.productName}/${product.productId}`} onClick={handleClick}>
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
              WebkitLineClamp: 2, // Giới hạn số dòng
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              ...textConfigs.style.basicFont,
            }}
          >
            {product.productName}
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
