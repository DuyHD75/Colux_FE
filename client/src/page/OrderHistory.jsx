import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Rating,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import TextConfig from "../config/text.config";
import { useSelector, useDispatch } from "react-redux";
// import { orders } from '../data/Product'
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ImageComponent from "../components/commons/ImageComponent";
import { PiWarningCircle } from "react-icons/pi";
import UserSidebar from "../components/commons/UserSidebar";
import cartApi from "../api/modules/cart.api";
import { setGlobalLoading } from "../redux/reducer/globalLoadingSlice";
import { toast } from "react-toastify";
import customScrollbarStyle from "../config/scrollbar.config";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import productsApi from "../api/modules/products.api";
import { Link, useNavigate } from "react-router-dom";
import prodcutsApi from "../api/modules/products.api";
import textConfigs from "../config/text.config";

const OrderHistory = () => {
  const { appState } = useSelector((state) => state.appState);
  // const user = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [openShipping, setOpenShipping] = useState(false);
  const [steps, setSteps] = useState(null);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [reviews, setReviews] = useState({});
  const [reviewsOfCus, setReviewsOfCus] = useState([]);

  const handleOpenModal = (order) => {
    setSelectedOrder(order); // Lưu thông tin đơn hàng khi nhấn nút "Write a Review"
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setReviews({}); // Reset reviews khi đóng modal
  };

  const handleReviewChange = (productId, value) => {
    // Cập nhật đánh giá (rating hoặc text) của sản phẩm
    setReviews((prevReviews) => ({
      ...prevReviews,
      [productId]: {
        ...prevReviews[productId],
        ...value,
      },
    }));
  };

  const uniqueProducts = selectedOrder?.products.reduce((acc, product) => {
    if (
      !acc.find(
        (p) => p.productDetails.productId === product.productDetails.productId
      )
    ) {
      acc.push(product);
    }
    return acc;
  }, []);

  const handleSubmitReview = async () => {
    const customerId = user?.userId; // ID của khách hàng (có thể lấy từ context hoặc props)

    // Chuyển đổi reviews thành danh sách đối tượng
    const formattedReviews = Object.keys(reviews).map((productId) => ({
      productId,
      customerId,
      content: reviews[productId].text || "",
      score: reviews[productId].rating || 0,
      parentId: null,
    }));

    for (const review of formattedReviews) {
      try {
        const { response } = await productsApi.reviews(review);

        if (response) {
          toast.success(response.message);
        } else {
          console.error(`Lỗi gửi đánh giá cho sản phẩm ${review.productId}`);
        }
      } catch (error) {
        console.error(
          `Lỗi gửi đánh giá cho sản phẩm ${review.productId}:`,
          error
        );
      }
    }

    console.log("Danh sách đánh giá:", formattedReviews);

    // Xử lý logic thêm (gọi API hoặc lưu trữ)
    handleCloseModal();
  };

  console.log(orders);

  useEffect(() => {
    const getOrder = async () => {
      if (user) {
        dispatch(setGlobalLoading(true));
        try {
          const { response, err } = await cartApi.getOrdersbyCustomerId(
            user.userId
          );
          dispatch(setGlobalLoading(false));

          if (response) {
            setOrders(response.data.orders);
          }
          if (err) {
            toast.error(err.exception);
          }
        } catch (error) {
          console.error(error);
        } finally {
          dispatch(setGlobalLoading(false));
        }
      }
    };
    getOrder();
  }, [user]);

  const handleOpenShippingDialog = async (waybillId) => {
    console.log(waybillId);
    try {
      const { response } = await cartApi.getAWayBill(waybillId);
      if (response) {
        console.log(response.data.waybill);
        setSteps(response.data.waybill);
      }
    } catch (error) {
      console.log(error);
    }

    setOpenShipping(true);
  };

  const handleCloseShippingDialog = () => {
    setOpenShipping(false);
  };

  console.log(steps);

  useEffect(() => {
    const getReviewsByCusId = async () => {
      if (user) {
        console.log(user.userId);

        try {
          const { response, err } = await prodcutsApi.getReviewsByCusId(
            user.userId,
            0,
            1000
          );

          if (response) {
            setReviewsOfCus([...response.data.Review.content]);
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
  }, [user]);

  console.log(reviewsOfCus);

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
  console.log(orders);

  const getOrderStatusLabel = (orderStatus) => {
    switch (orderStatus) {
      case 1:
        return "Created";
      case 2:
        return "Pending";
      case 3:
        return "Approved";
      case 4:
        return "Completed";
      case 5:
        return "Cancelled";
      default:
        return "Unknown";
    }
  };

  const getOrderStatusColor = (orderStatus) => {
    switch (orderStatus) {
      case 1:
        return "#B9B9B9";
      case 2:
        return "#FFA500";
      case 3:
        return "#0EA97A";
      case 4:
        return "#0EA97A";
      case 5:
        return "#FF0000";
      default:
        return "#B9B9B9";
    }
  };

  const handleCancelOrder = async (order) => {
    try {
      const { response, err } = await cartApi.cancelOrder(
        user.userId,
        order.orderId
      );
      if (response) {
        toast.success(response.message);
        const newOrders = orders.map((item) => {
          if (item.id === order.id) {
            return {
              ...item,
              status: 5,
            };
          }
          return item;
        });
        setOrders(newOrders);
      }
      if (err) {
        toast.error(err.exception);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
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
              ...TextConfig.style.headerText,
              fontWeight: "700",
              fontSize: "20px",
              mb: "1rem",
            }}
          >
            Order History
          </Typography>
          <Stack spacing={2} direction="column">
            {orders.length > 0 ? (
              orders.reverse().map((item, index) => {
                return (
                  <Accordion
                    sx={{ borderRadius: "8px", bgcolor: "#F9F9F9" }}
                    slotProps={{ transition: { unmountOnExit: false } }}
                    key={index}
                  >
                    <AccordionSummary
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="space-between"
                        alignItems="center"
                        width="100%"
                      >
                        <Box>
                          <Typography
                            sx={{
                              ...TextConfig.style.headerText,
                              fontWeight: "700",
                              fontSize: "14px",
                            }}
                          >
                            Order ID:{" "}
                            <span style={{ fontWeight: "400" }}>
                              {item.code}
                            </span>
                          </Typography>
                          <Typography
                            sx={{
                              ...TextConfig.style.headerText,
                              fontWeight: "700",
                              fontSize: "14px",
                            }}
                          >
                            Order Date:{" "}
                            <span style={{ fontWeight: "400" }}>
                              {formatDate(item.createdAt)}
                            </span>
                          </Typography>
                        </Box>
                        <Stack
                          direction="row"
                          spacing="12px"
                          justifyContent="flex-start"
                          alignItems="center"
                        >
                          {/* <Chip size='small' label={capitalizeFirstLetter(item.status)} sx={{ ...TextConfig.style.headerText, width: '100px', fontWeight: '700', color: 'white', fontSize: '14px', bgcolor: `${item.status === 'PENDING' ? '#B9B9B9' : '#0EA97A'}` }} /> */}
                          {item.paymentStatus === 1 ? (
                            <Chip
                              size="small"
                              label="Unpaid"
                              sx={{
                                ...TextConfig.style.headerText,
                                width: "100px",
                                fontWeight: "700",
                                color: "white",
                                fontSize: "14px",
                                bgcolor: "#c70000",
                              }}
                            />
                          ) : item.paymentStatus === 2 ? (
                            <Chip
                              size="small"
                              label="Paid"
                              sx={{
                                ...TextConfig.style.headerText,
                                width: "100px",
                                fontWeight: "700",
                                color: "white",
                                fontSize: "14px",
                                bgcolor: "#0EA97A",
                              }}
                            />
                          ) : (
                            <Chip
                              size="small"
                              label="Advance"
                              sx={{
                                ...TextConfig.style.headerText,
                                width: "100px",
                                fontWeight: "700",
                                color: "white",
                                fontSize: "14px",
                                bgcolor: "#0EA97A",
                              }}
                            />
                          )}
                          <Chip
                            size="small"
                            label={getOrderStatusLabel(item.status)}
                            sx={{
                              ...TextConfig.style.headerText,
                              width: "100px",
                              fontWeight: "700",
                              color: "white",
                              fontSize: "14px",
                              bgcolor: getOrderStatusColor(item.status),
                            }}
                          />
                        </Stack>
                      </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Divider />
                      <Box
                        sx={{
                          overflow: "auto",
                          scrollbarWidth: "none",
                          maxHeight: "200px",
                        }}
                      >
                        {item.products.map((product, index) => {
                          return (
                            <Stack
                              direction="row"
                              spacing={2}
                              justifyContent="space-between"
                              alignItems="center"
                              width="100%"
                              mt="12px"
                              mb="16px"
                            >
                              <Stack
                                direction="row"
                                spacing={2}
                                justifyContent="flex-start"
                                alignItems="center"
                                width="80%"
                              >
                                <Link
                                  to={`/products/${product.categoryName}/${
                                    product.categoryId
                                      ? product.categoryId
                                      : "catrgoryid"
                                  }/${product.productDetails.productName}/${
                                    product.productDetails.productId
                                  }`}
                                >
                                  <ImageComponent
                                    src={
                                      product.productDetails &&
                                      product.productDetails.productImage
                                    }
                                    alt={
                                      product.productDetails &&
                                      product.productDetails.productImage
                                    }
                                    width="75px"
                                    height="75px"
                                  />
                                </Link>
                                <Stack
                                  direction="column"
                                  spacing="12px"
                                  width={{ xs: "210px", md: "359px" }}
                                >
                                  <Typography
                                    sx={{
                                      ...TextConfig.style.headerText,
                                      fontWeight: "700",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {product.productDetails &&
                                      product.productDetails.productName}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      ...TextConfig.style.headerText,
                                      fontWeight: "400",
                                      fontSize: "14px",
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                    }}
                                  >
                                    Description:{" "}
                                    {product.productDetails &&
                                      product.productDetails.productDescription}
                                  </Typography>
                                  {product.categoryName &&
                                    product.categoryName === "Paint" && (
                                      <Stack direction="row" spacing={2}>
                                        <Typography
                                          sx={{
                                            ...TextConfig.style.headerText,
                                            fontWeight: "400",
                                            fontSize: "14px",
                                            borderRight: "1px solid",
                                            pr: 2,
                                          }}
                                        >
                                          Color code:{" "}
                                          {product.productDetails &&
                                            product.productDetails.paintDetails
                                              .hex}
                                        </Typography>

                                        <Box
                                          sx={{
                                            width: "20px",
                                            height: "20px",
                                            borderRadius: "8px",
                                            bgcolor:
                                              product.productDetails &&
                                              product.productDetails
                                                .paintDetails.hex,
                                          }}
                                        ></Box>
                                      </Stack>
                                    )}
                                </Stack>
                              </Stack>
                              <Typography
                                sx={{
                                  ...TextConfig.style.headerText,
                                  fontWeight: "700",
                                  fontSize: "16px",
                                  width: "max-content",
                                }}
                              >
                                ${product.priceSell}{" "}
                                <span
                                  style={{
                                    color: "#669AE7",
                                    fontWeight: "400",
                                  }}
                                >
                                  x {product.itemQuantity}
                                </span>
                              </Typography>
                            </Stack>
                          );
                        })}
                      </Box>
                      <Divider />
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing="12px"
                        my="16px"
                      >
                        <Box
                          sx={{
                            width: "100%",
                            bgcolor: "#FFFFFF",
                            mt: "16px",
                            borderRadius: "8px",
                            p: "12px",
                            gap: "12px",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Typography
                            sx={{
                              ...TextConfig.style.headerText,
                              fontWeight: "700",
                              fontSize: "14px",
                            }}
                          >
                            Information
                          </Typography>
                          <Typography
                            sx={{
                              ...TextConfig.style.headerText,
                              fontWeight: "400",
                              fontSize: "12px",
                            }}
                          >
                            {item.toName}
                          </Typography>
                          <Typography
                            sx={{
                              ...TextConfig.style.headerText,
                              fontWeight: "400",
                              fontSize: "12px",
                            }}
                          >
                            {item.toPhone}
                          </Typography>
                          <Typography
                            sx={{
                              ...TextConfig.style.headerText,
                              fontWeight: "400",
                              fontSize: "12px",
                            }}
                          >
                            {item.toAddress}, {item.toWardName},{" "}
                            {item.toDistrictName}, {item.toProvinceName}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            width: "100%",
                            bgcolor: "#FFFFFF",
                            mt: "16px",
                            borderRadius: "8px",
                            p: "12px",
                          }}
                        >
                          <Typography
                            sx={{
                              ...TextConfig.style.headerText,
                              fontWeight: "700",
                              fontSize: "14px",
                              pb: "9px",
                            }}
                          >
                            Delivery method
                          </Typography>
                          <ImageComponent
                            src="https://firebasestorage.googleapis.com/v0/b/colux-alpha-storage.appspot.com/o/commons%2FGHN.png?alt=media&token=bebc7279-0aba-4000-a430-da857cd9ee57"
                            alt="delivery"
                            width="50px"
                            height="20px"
                          />
                          <Typography
                            sx={{
                              ...TextConfig.style.headerText,
                              fontWeight: "700",
                              fontSize: "14px",
                              pb: "12px",
                              pt: "7px",
                            }}
                          >
                            Payment method
                          </Typography>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing="5px"
                          >
                            <ImageComponent
                              src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg"
                              alt="delivery"
                              width="50px"
                              height="20px"
                            />
                          </Stack>
                        </Box>
                        <Box
                          sx={{
                            width: "100%",
                            bgcolor: "#FFFFFF",
                            mt: "16px",
                            borderRadius: "8px",
                            p: "12px",
                          }}
                        >
                          <Stack direction="column" spacing="12px">
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                            >
                              <Typography
                                sx={{
                                  ...TextConfig.style.headerText,
                                  fontWeight: "bold",
                                  fontSize: "14px",
                                }}
                              >
                                Total Amount
                              </Typography>
                              <Typography
                                sx={{
                                  ...TextConfig.style.headerText,
                                  fontWeight: "bold",
                                  fontSize: "14px",
                                }}
                              >
                                ${item.totalAmount}
                              </Typography>
                            </Stack>
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                            >
                              <Typography
                                sx={{
                                  ...TextConfig.style.headerText,
                                  fontSize: "14px",
                                }}
                              >
                                Tax (10%)
                              </Typography>
                              <Typography
                                sx={{
                                  ...TextConfig.style.headerText,
                                  fontWeight: "bold",
                                  fontSize: "14px",
                                }}
                              >
                                ${(item.totalAmount * 0.1).toFixed(0)}
                              </Typography>
                            </Stack>
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                            >
                              <Typography
                                sx={{
                                  ...TextConfig.style.headerText,
                                  fontSize: "14px",
                                  display: "inline-flex",
                                  alignItems: "center",
                                }}
                              >
                                Delivery
                                <span style={{ paddingLeft: "3px" }}>
                                  <PiWarningCircle
                                    style={{ height: "12px", width: "12px" }}
                                  />
                                </span>
                              </Typography>
                              <Typography
                                sx={{
                                  ...TextConfig.style.headerText,
                                  fontWeight: "bold",
                                  fontSize: "14px",
                                }}
                              >
                                $0
                              </Typography>
                            </Stack>
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                            >
                              <Typography
                                sx={{
                                  ...TextConfig.style.headerText,
                                  fontWeight: "bold",
                                  fontSize: "14px",
                                }}
                              >
                                Total Pay
                              </Typography>
                              <Typography
                                sx={{
                                  ...TextConfig.style.headerText,
                                  fontWeight: "bold",
                                  fontSize: "14px",
                                }}
                              >
                                ${item.totalPay}
                              </Typography>
                            </Stack>
                            {item.advancePayment !== item.totalPay && (
                              <Stack
                                direction="row"
                                justifyContent="space-between"
                              >
                                <Typography
                                  sx={{
                                    ...TextConfig.style.headerText,
                                    fontWeight: "bold",
                                    fontSize: "14px",
                                  }}
                                >
                                  Advance Pay
                                </Typography>
                                <Typography
                                  sx={{
                                    ...TextConfig.style.headerText,
                                    fontWeight: "bold",
                                    fontSize: "14px",
                                  }}
                                >
                                  ${item.advancePayment}
                                </Typography>
                              </Stack>
                            )}
                          </Stack>
                        </Box>
                      </Stack>
                      <Divider />
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="flex-end"
                        alignItems="center"
                        width="100%"
                        mt="16px"
                      >
                        {item.waybillId && (
                          <Button
                            sx={{
                              ...TextConfig.style.headerText,
                              mt: "1rem",
                              fontWeight: "bold",
                              fontSize: "16px",
                              bgcolor: "#1c2759",
                              color: "white",
                              borderRadius: "14px",
                              width: "150px",
                              height: "30px",
                              textTransform: "capitalize",
                              "&:hover": {
                                color: "secondary.colorText",
                                backgroundColor: "#2c3766",
                              },
                            }}
                            onClick={() =>
                              handleOpenShippingDialog(item.waybillId)
                            }
                          >
                            View Tracking
                          </Button>
                        )}
                        {(item.status === 1 || item.status === 2) && (
                          <Button
                            sx={{
                              ...TextConfig.style.headerText,
                              mt: "1rem",
                              fontWeight: "bold",
                              fontSize: "16px",
                              bgcolor: "#1c2759",
                              color: "white",
                              borderRadius: "14px",
                              width: "150px",
                              height: "30px",
                              textTransform: "capitalize",
                              "&:hover": {
                                color: "secondary.colorText",
                                backgroundColor: "#2c3766",
                              },
                            }}
                            onClick={() => handleCancelOrder(item)}
                          >
                            Cancel Order
                          </Button>
                        )}
                        {item.status === 4 && (
                          <Button
                            sx={{
                              ...TextConfig.style.headerText,
                              mt: "1rem",
                              fontWeight: "bold",
                              fontSize: "16px",
                              bgcolor: "#1c2759",
                              color: "white",
                              borderRadius: "14px",
                              width: "150px",
                              height: "30px",
                              textTransform: "capitalize",
                              "&:hover": {
                                color: "secondary.colorText",
                                backgroundColor: "#2c3766",
                              },
                            }}
                            onClick={() => handleOpenModal(item)}
                          >
                            Write a Review
                          </Button>
                        )}
                        {item.paymentStatus === 1 && item.status !== 5 && item.paypalCheckoutLink && (
                          <Button
                            sx={{
                              ...TextConfig.style.headerText,
                              mt: "1rem",
                              fontWeight: "bold",
                              fontSize: "16px",
                              bgcolor: "#1c2759",
                              color: "white",
                              borderRadius: "14px",
                              width: "200px",
                              height: "30px",
                              textTransform: "capitalize",
                              "&:hover": {
                                color: "secondary.colorText",
                                backgroundColor: "#2c3766",
                              },
                            }}
                            component={Link}
                            to={item.paypalCheckoutLink}
                          >
                            Proceed With Payment
                          </Button>
                        )}
                      </Stack>
                    </AccordionDetails>
                  </Accordion>
                );
              })
            ) : (
              <Box
                sx={{
                  display: "flex",
                  minHeight: "50vh",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/colux-alpha-storage.appspot.com/o/commons%2F404.png?alt=media&token=a8a59775-5287-4cba-9e45-bb0355e39fa0"
                  alt="No order history found"
                  style={{
                    maxWidth: "50%",
                    height: "auto",
                  }}
                />
                <Typography
                  color="textSecondary"
                  sx={{
                    ...textConfigs.style.basicFont,
                    my: "1rem",
                    fontSize: "1.2rem",
                  }}
                >
                  No order history
                </Typography>
              </Box>
            )}
          </Stack>
        </Box>

        <Dialog
          open={openModal}
          onClose={handleCloseModal}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>Write a Review for Your Order</DialogTitle>
          <DialogContent>
            <Box>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ ...TextConfig.style.basicFont }}
              >
                Order ID: {selectedOrder?.code}
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                sx={{ ...TextConfig.style.basicFont }}
              >
                Please share your experience with the products below:
              </Typography>
              <Stack spacing={2} mt={2}>
                {uniqueProducts?.map((product, index) => {
                  const hasReviewed = reviewsOfCus.some(
                    (review) =>
                      review.productId === product.productDetails.productId
                  );

                  return (
                    <Box
                      key={index}
                      sx={{
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        p: 2,
                        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <Grid container spacing={2}>
                        {/* Image Section */}
                        <Grid item xs={12} sm={3}>
                          <Box
                            component="img"
                            src={
                              product.productDetails.productImage ||
                              "placeholder-image-url"
                            }
                            alt={product.productDetails.productName}
                            sx={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              borderRadius: "8px",
                            }}
                          />
                        </Grid>

                        {/* Details Section */}
                        <Grid item xs={12} sm={9}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            sx={{ ...TextConfig.style.basicFont }}
                          >
                            {product.productDetails.productName}
                          </Typography>
                          {hasReviewed ? (
                            // Thông báo nếu đã review
                            <Typography
                              variant="body2"
                              sx={{
                                color: "red",
                                ...TextConfig.style.basicFont,
                              }}
                            >
                              You have already reviewed this product.
                            </Typography>
                          ) : (
                            <>
                              {/* Star Rating */}
                              <Typography
                                variant="body2"
                                sx={{ mb: 1, ...TextConfig.style.basicFont }}
                              >
                                Rate this product:
                              </Typography>
                              <Rating
                                name={`rating-${product.productDetails.productId}`}
                                value={
                                  reviews[product.productDetails.productId]
                                    ?.rating || 0
                                }
                                onChange={(e, newValue) =>
                                  handleReviewChange(
                                    product.productDetails.productId,
                                    {
                                      rating: newValue,
                                    }
                                  )
                                }
                              />

                              {/* Text Review */}
                              <TextField
                                label="Write your review"
                                variant="outlined"
                                multiline
                                rows={4}
                                value={
                                  reviews[product.productDetails.productId]
                                    ?.text || ""
                                }
                                onChange={(e) =>
                                  handleReviewChange(
                                    product.productDetails.productId,
                                    {
                                      text: e.target.value,
                                    }
                                  )
                                }
                                fullWidth
                                sx={{ mt: 2, ...TextConfig.style.basicFont }}
                              />
                            </>
                          )}
                        </Grid>
                      </Grid>
                    </Box>
                  );
                })}
              </Stack>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              sx={{
                ...TextConfig.style.headerText,
                mt: "1rem",
                fontWeight: "bold",
                fontSize: "16px",
                bgcolor: "red",
                color: "white",
                borderRadius: "14px",
                width: "150px",
                height: "30px",
                textTransform: "capitalize",
                "&:hover": {
                  color: "secondary.colorText",
                  backgroundColor: "#2c3766",
                },
              }}
              onClick={handleCloseModal}
            >
              Cancel
            </Button>

            <Button
              sx={{
                ...TextConfig.style.headerText,
                mt: "1rem",
                fontWeight: "bold",
                fontSize: "16px",
                bgcolor: "#1c2759",
                color: "white",
                borderRadius: "14px",
                width: "150px",
                height: "30px",
                textTransform: "capitalize",
                "&:hover": {
                  color: "secondary.colorText",
                  backgroundColor: "#2c3766",
                },
              }}
              onClick={handleSubmitReview}
            >
              Submit Review
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          sx={{
            "& .MuiDialog-paper": {
              width: "100%",
              maxWidth: "633px",
              maxHeight: "100%",
              borderRadius: "0px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            },
          }}
          open={openShipping}
          onClose={() => setOpenShipping(false)}
        >
          <DialogTitle sx={{ fontWeight: 400 }}>
            Tracking Information
          </DialogTitle>
          <DialogContent
            sx={{
              width: "100%",
              borderBottom: "1px solid #ccc",
              borderTop: "1px solid #ccc",
              overflow: "auto",
              maxHeight: "450px",
              ...customScrollbarStyle,
              backgroundColor: "#f9f9f9",
            }}
          >
            <Stepper
              orientation="vertical"
              sx={{
                paddingLeft: 2,
                paddingTop: "24px",
              }}
            >
              {steps &&
                steps.waybillLogs.reverse().map((step, index) => (
                  <Step
                    sx={{ alignItems: "start", justifyContent: "start" }}
                    key={index}
                    active={true}
                    completed={index === steps.length - 1}
                  >
                    <StepLabel
                      icon={
                        index === 0 ? (
                          <CheckCircleIcon color="success" />
                        ) : (
                          <AccessTimeIcon color="action" />
                        )
                      }
                    >
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        sx={{ width: "100%" }}
                      >
                        {/* Time and Status */}
                        <Typography
                          variant="subtitle2"
                          noWrap
                          sx={{
                            flexShrink: 0,
                            color:
                              index === 0 ? "success.main" : "text.secondary",
                            minWidth: "150px",
                          }}
                        >
                          {formatDate(step.createdAt)}
                        </Typography>

                        {/* Status and Additional Info */}
                        <Stack direction="column" spacing={0.5}>
                          <Typography variant="body2">
                            {step.currentStatus}
                          </Typography>
                          {step.additionalInfo && (
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {step.additionalInfo}
                            </Typography>
                          )}
                        </Stack>
                      </Stack>
                    </StepLabel>
                  </Step>
                ))}
            </Stepper>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenShipping(false)} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </UserSidebar>
    </>
  );
};

export default OrderHistory;
