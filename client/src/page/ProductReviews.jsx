import React, { useEffect, useState } from "react";
import UserSidebar from "../components/commons/UserSidebar";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Pagination,
  PaginationItem,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import textConfigs from "../config/text.config";
import { MdOutlineDelete } from "react-icons/md";
import { RiDoubleQuotesL } from "react-icons/ri";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { productReviewss } from "../data/Product";
import { toast } from "react-toastify";
import { IoMdClose } from "react-icons/io";
import ImageComponent from "../components/commons/ImageComponent";
import prodcutsApi from "../api/modules/products.api";

const ProductReviews = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const reviewsPerPage = 10;
  const [productReviews, setProductReviews] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );

  const handleClickOpen = (index) => {
    setOpen(true);
    setSelectedProductIndex(index);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedProductIndex(null);
  };

  useEffect(() => {
    const getReviewsByCusId = async () => {
      if (user) {
        console.log(user.userId);

        try {
          const { response, err } = await prodcutsApi.getReviewsByCusId(
            user.userId,
            page - 1 ,
            reviewsPerPage
          );

          if (response) {
            setProductReviews([...response.data.Review.content]);
            setTotalPages(response.data.Review.totalPages)
          }
          if (err) {
            console.error(err);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    getReviewsByCusId();
  }, [user, page]);

  const handleRemove = () => {
    const updatedProducts = [...productReviews];
    updatedProducts.splice(selectedProductIndex, 1);
    setProductReviews(updatedProducts);
    handleClose();
    toast.success("Item removed from wishlist");
  };

  // Tính toán các review cần hiển thị dựa trên trang hiện tại
  const indexOfLastReview = page * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = productReviews.slice(
    indexOfFirstReview,
    indexOfLastReview
  );

  const handleChange = (event, value) => {
    setPage(value);
  };


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
  };
  return (
    <UserSidebar>
      <Box
        sx={{
          width: { xs: "100%", md: "80%" },
          height: "100%",
          bgcolor: "white",
          borderRadius: "8px",
          padding: "1rem",
        }}
      >
        <Typography
          sx={{
            ...textConfigs.style.headerText,
            fontWeight: "700",
            fontSize: "20px",
            mb: "1rem",
          }}
        >
          Product Reviews
        </Typography>

        {productReviews.map((review, index) => (
          <Box
            sx={{
              borderRadius: "10px",
              bgcolor: "#E1FCF3",
              p: "10px",
              mb: "18px",
            }}
          >
            <Stack
              direction={{ xs: "column", md: "row" }}
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack direction="row" spacing={2} alignItems="center" pb="12px">
                <ImageComponent
                  src={review.img}
                  width="30px"
                  height="30px"
                  alt="product"
                />
                <Typography
                  sx={{
                    ...textConfigs.style.basicFont,
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  {review.name}
                </Typography>
                <Typography
                  sx={{ ...textConfigs.style.basicFont, fontSize: "14px" }}
                >
                  {formatDate(review.updatedAt)}
                </Typography>
                <Rating
                  size="small"
                  name="read-only"
                  value={Number(review.score)}
                  readOnly
                />
              </Stack>

            </Stack>
            <Stack direction="row" spacing={3}>
              <RiDoubleQuotesL size="20px" style={{ flexShrink: 0 }} />
              <Typography
                sx={{ ...textConfigs.style.basicFont, fontSize: "14px" }}
              >
                {review.content}
              </Typography>
            </Stack>
          </Box>
        ))}

        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChange}
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
            />
          )}
        />
      </Box>
    </UserSidebar>
  );
};

export default ProductReviews;
