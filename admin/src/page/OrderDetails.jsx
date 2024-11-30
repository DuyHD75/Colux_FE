import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Grid,
  Select,
  MenuItem,
} from "@mui/material";
import React, { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { routesGen } from "../router/router";
import { IoIosArrowBack } from "react-icons/io";
import textConfigs from "../config/text.config";
import backgroundConfigs from "../config/background.config";
import { Delete } from "@mui/icons-material";
import { RiDeleteBin6Line } from "react-icons/ri";
import CloseIcon from "@mui/icons-material/Close";
import AImageUploader from "../components/common/AImageUploader";
import { useFormik } from "formik";
import * as Yup from "yup";
import ghnApi from "../api/modules/ghn.api";
import { useEffect } from "react";
import { useState } from "react";
import ordersApi from "../api/modules/order.api";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const location = useLocation();
  const { data } = location.state || {};
  const [ order, setOrder ] = useState(data); 
  const navigate = useNavigate();
  console.log(order);
  console.log(data);
  
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedDistrictID, setSelectedDistrictID] = useState(null);
  const [shippingFee, setShippingFee] = useState(0);
  const [provinceId, setProvinceId] = useState(null);
  const [districtId, setDistrictId] = useState(null);
  const [wardId, setWardId] = useState(null);
  const [imageUrl, setImageUrl] = useState(order && order.shippingImageURL);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await ghnApi.getProvince();
        if (response.err) {
          throw new Error("Network response was not ok");
        }
        setProvinces(response.response.data.provinces.data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };
    fetchProvinces();
    console.log("chạy lại");
    
  }, [order]);

  useEffect(() => {
    const convertProvince = () => {
      const province = provinces.find(
        (province) => province.ProvinceName === order.toProvinceName
      );
      console.log("provinceId", province && province.ProvinceID);
      const newProvinceId = province && province.ProvinceID;
      setProvinceId(newProvinceId);
      fetchDistricts(newProvinceId);
      billingForm.setFieldValue("toProvinceName", newProvinceId);
    };
    convertProvince();
  }, [provinces]);

  useEffect(() => {
    const convertDistrict = () => {
      const district = districts.find(
        (district) => district.DistrictName === order.toDistrictName
      );
      console.log("ddissssss", district && district.DistrictID);
      const newDistrictId = district && district.DistrictID;
      fetchWards(newDistrictId);
      billingForm.setFieldValue("toDistrictName", newDistrictId);
    };
    convertDistrict();
  }, [districts]);

  useEffect(() => {
    const convertDistrict = () => {
      console.log(wards);
      console.log(order.toWardName);

      const ward = wards.find((ward) => ward.WardName === order.toWardName);
      console.log("warddddd", ward);
      const newWardId = ward && ward.WardCode;
      console.log(newWardId);

      billingForm.setFieldValue("toWardName", newWardId);
    };
    convertDistrict();
  }, [wards]);

  const fetchDistricts = async (provinceID) => {
    try {
      const province_id = provinceID;
      const response = await ghnApi.getDistrict(province_id);
      setDistricts(response.response.data.fee.data);
      if (response.err) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };

  const fetchWards = async (DistrictID) => {
    try {
      const district_id = DistrictID;
      const response = await ghnApi.getWard(district_id);
      if (response.err) {
        throw new Error("Network response was not ok");
      }
      setWards(response.response.data.fee.data);
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };

  const calculateFee = async (wardCode, DistrictID) => {
    try {
      const from_district_id = 1529;
      const from_ward_code = "40401";
      const service_id = 53321;
      const to_district_id = DistrictID;
      const to_ward_code = wardCode;
      const width = 30;
      const height = 30;
      const weight = 1000;
      const length = 30;

      const response = await ghnApi.calculateShippingFee(
        from_district_id,
        from_ward_code,
        service_id,
        to_district_id,
        to_ward_code,
        width,
        height,
        weight,
        length
      );
      setShippingFee(response.response.data.fee.data.total);

      if (response.code === 400) {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error("Error fetching fee:", error);
    }
  };

  const selectedProvince = provinces && provinces.find(
    (province) => province.ProvinceName === order.toProvinceName
  );
  console.log(selectedProvince);

  const billingForm = useFormik({
    initialValues: {
      toName: order.toName || "",
      employeeName: order.employeeName || "",
      shipperName: order.shipperName || "",
      code: order.code || "",
      status: order.status || "",
      toPhone: order.toPhone || "",
      toEmail: order.email || "",
      toProvinceName: provinceId, //selectedProvince.ProvinceID||
      toDistrictName: districtId,
      toWardName: wardId,
      toAddress: order.toAddress || "",
      orderCancellationReasonId: "",
      note: order.note || "",
      paymentMethod: order.paymentMethod || "",
      paymentStatus: order.paymentStatus || "",
    },
    validationSchema: Yup.object({
      toName: Yup.string()
        .min(2, "First name at least 8 characters !")
        .required("Name is required !"),
      employeeName: Yup.string(),
      shipperName: Yup.string(),
      code: Yup.string().required("Order code is required !"),
      status: Yup.string().required("Order status is required !"),
      toPhone: Yup.string()
        .required("Phone is required !")
        .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, "Phone must be a number !"),
        toEmail: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      toProvinceName: Yup.string().required("State is required !"),
      toDistrictName: Yup.string().required("District is required !"),
      toWardName: Yup.string().required("Ward is required !"),
      toAddress: Yup.string().required("Address is required !"),
      orderCancellationReasonId: Yup.string(),
      note: Yup.string(),
      paymentMethod: Yup.string().required("Payment method is required !"),
      paymentStatus: Yup.string().required("Payment status is required !"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      values.toProvinceName = provinces.find(
        (province) => province.ProvinceID === values.toProvinceName
      ).ProvinceName;
      values.toDistrictName = districts.find(
        (district) => district.DistrictID === values.toDistrictName
      ).DistrictName;
      values.toWardName = wards.find(
        (ward) => ward.WardCode === values.toWardName
      ).WardName;
      const updatedValues = {
        ...values,
        reference: "REF12345",
        advancePayment: order.advancePayment,
        customerId: null,
        shippingCost: 4,
        shippingImageURL: imageUrl,
      };

      if (values.orderCancellationReasonId === "") {
        values.orderCancellationReasonId = null;
      }

      try {
        const { response, err } = await ordersApi.updateOrder(updatedValues);
        if(response) {
          setOrder((prevOrder) => ({
            ...prevOrder,
            ...response.data,
          }));
          toast.success("Update Order success!");
        } else {
          toast.error(err.message);
        }
      } catch (error) {
        console.log(error);
      }

      // alert(JSON.stringify(updatedValues, null, 2));
    },
  });

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

  const handleRemoveUrl = () => {
    setImageUrl(null);
  };

  return (
    <Fragment>
      <Box>
        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton
            style={{ backgroundColor: "aliceblue" }}
            onClick={() => navigate(routesGen.manageOrder)}
          >
            <IoIosArrowBack />
          </IconButton>
          <Typography
            sx={{
              fontSize: 24,
              fontWeight: 600,
              ...textConfigs.style.headerText,
            }}
          >
            Update Order
          </Typography>
        </Stack>

        <Stack direction="row" spacing={2} alignItems="start" mt={2}>
          <Stack direction="column" spacing={1} flex={3}>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              mt={2}
              p={1}
              bgcolor="white"
              sx={{
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Thêm boxShadow
                borderRadius: "8px", // Thêm borderRadius nếu cần
              }}
            >
              <Stack direction="column" spacing={1} alignItems="center">
                <Typography
                  sx={{
                    fontWeight: "bold",
                    ...textConfigs.style.basicFont,
                  }}
                >
                  Order ID
                </Typography>
                <Typography
                  sx={{
                    bgcolor: "#E7F5FF",
                    padding: "0.3rem",
                    borderRadius: "20px",
                    fontSize: "14px",
                    ...textConfigs.style.basicFont,
                  }}
                >
                  {order.id}
                </Typography>
              </Stack>
              <Stack direction="column" spacing={1} alignItems="start">
                <Typography
                  sx={{
                    fontWeight: "bold",
                    ...textConfigs.style.basicFont,
                  }}
                >
                  Create At
                </Typography>
                <Typography
                  sx={{
                    bgcolor: "#E7F5FF",
                    padding: "0.3rem",
                    borderRadius: "20px",
                    fontSize: "14px",
                    ...textConfigs.style.basicFont,
                  }}
                >
                  {formatDate(order.createdAt)}
                </Typography>
              </Stack>
              <Stack direction="column" spacing={1} alignItems="start">
                <Typography
                  sx={{
                    fontWeight: "bold",
                    ...textConfigs.style.basicFont,
                  }}
                >
                  Update At
                </Typography>
                <Typography
                  sx={{
                    bgcolor: "#E7F5FF",
                    borderRadius: "20px",
                    padding: "0.3rem",
                    fontSize: "14px",
                    ...textConfigs.style.basicFont,
                  }}
                >
                  {formatDate(order.updatedAt)}
                </Typography>
              </Stack>
              <Stack direction="column" spacing={1} alignItems="start">
                <Typography
                  sx={{
                    fontWeight: "bold",
                    ...textConfigs.style.basicFont,
                  }}
                >
                  Address
                </Typography>
                <Typography
                  sx={{
                    bgcolor: "#E7F5FF",
                    borderRadius: "20px",
                    padding: "0.3rem",
                    fontSize: "14px",
                    ...textConfigs.style.basicFont,
                  }}
                >
                  {`${order.toAddress}, ${order.toWardName}, ${order.toDistrictName}, ${order.toProvinceName}`}
                </Typography>
              </Stack>
            </Stack>
            <Stack
              direction="column"
              spacing={1}
              flex={3}
              bgcolor="white"
              p={2}
              sx={{
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Thêm boxShadow
                borderRadius: "8px", // Thêm borderRadius nếu cần
              }}
            >
              <Typography
                sx={{
                  mb: "5px",
                  fontWeight: "bold",
                  ...textConfigs.style.basicFont,
                }}
              >
                Products
              </Typography>
              <TableContainer sx={{ height: "auto" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        align="center"
                        width="10%"
                        sx={{
                          ...textConfigs.style.basicFont,
                          backgroundColor: "#F9FAFB",
                          fontWeight: 600,
                          borderBottom: "1px solid #E5E7EB",
                        }}
                      >
                        Number
                      </TableCell>
                      <TableCell
                        width="45%"
                        sx={{
                          ...textConfigs.style.basicFont,
                          backgroundColor: "#F9FAFB",
                          fontWeight: 600,
                          borderBottom: "1px solid #E5E7EB",
                        }}
                      >
                        Product Name
                      </TableCell>
                      <TableCell
                        align="center"
                        width="15%"
                        sx={{
                          ...textConfigs.style.basicFont,
                          backgroundColor: "#F9FAFB",
                          fontWeight: 600,
                          borderBottom: "1px solid #E5E7EB",
                        }}
                      >
                        Size
                      </TableCell>
                      <TableCell
                        align="center"
                        width="15%"
                        sx={{
                          ...textConfigs.style.basicFont,
                          backgroundColor: "#F9FAFB",
                          fontWeight: 600,
                          borderBottom: "1px solid #E5E7EB",
                        }}
                      >
                        Price
                      </TableCell>
                      <TableCell
                        align="center"
                        width="10%"
                        sx={{
                          ...textConfigs.style.basicFont,
                          backgroundColor: "#F9FAFB",
                          fontWeight: 600,
                          borderBottom: "1px solid #E5E7EB",
                        }}
                      >
                        Quantity
                      </TableCell>
                      <TableCell
                        align="center"
                        width="15%"
                        sx={{
                          ...textConfigs.style.basicFont,
                          backgroundColor: "#F9FAFB",
                          fontWeight: 600,
                          borderBottom: "1px solid #E5E7EB",
                        }}
                      >
                        Total
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order.products.map((product, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td": { borderBottom: 0 },
                          backgroundColor:
                            (index + 1) % 2 === 0 ? "#F9FAFB" : "white",
                        }}
                      >
                        <TableCell
                          sx={{
                            ...textConfigs.style.basicFont,
                            color: "#1A56DB",
                          }}
                          align="center"
                        >
                          {index + 1}
                        </TableCell>
                        <TableCell>
                          <Stack
                            direction="column"
                            spacing={2}
                            alignItems="start"
                          >
                            <Typography
                              sx={{
                                ...textConfigs.style.basicFont,
                                fontWeight: "bold",
                              }}
                            >
                              {product.productDetails.productName}
                            </Typography>
                            <Stack
                              direction="row"
                              spacing={2}
                              display="flex"
                              alignItems="center"
                            >
                              <Typography
                                sx={{
                                  color: "#9F9BA9",
                                  fontSize: "14px",
                                  ...textConfigs.style.basicFont,
                                }}
                              >
                                Code: {product.productDetails.code}
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "14px",
                                  ...textConfigs.style.basicFont,
                                  color: "#4D94DD",
                                }}
                              >
                                {product.categoryName}
                              </Typography>
                              {product.categoryName === "Paint" && (
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  {/* Bên Trái: Box Màu */}
                                  <Box
                                    sx={{
                                      width: "40px",
                                      height: "40px",
                                      border: "1px solid #000",
                                      backgroundColor:
                                        product.productDetails.paintDetails.hex,
                                      borderRadius: "4px",
                                    }}
                                  ></Box>

                                  {/* Bên Phải: Tên và Mã Màu */}
                                  <Box sx={{ marginLeft: "10px" }}>
                                    <Typography
                                      sx={{
                                        color: "#4D94DD",
                                        fontSize: "14px",
                                      }}
                                    >
                                      {product.productDetails.paintDetails.hex}
                                    </Typography>
                                  </Box>
                                </Box>
                              )}
                            </Stack>
                          </Stack>
                        </TableCell>
                        <TableCell
                          sx={{ ...textConfigs.style.basicFont }}
                          align="center"
                        >
                          {product.variantDescription}{" "}
                          {product.categoryName === "Paint" && "L"}
                        </TableCell>
                        <TableCell
                          sx={{ ...textConfigs.style.basicFont }}
                          align="center"
                        >
                          ${product.priceSell}
                        </TableCell>
                        <TableCell
                          sx={{ ...textConfigs.style.basicFont }}
                          align="center"
                        >
                          {product.itemQuantity}
                        </TableCell>
                        <TableCell
                          sx={{ ...textConfigs.style.basicFont }}
                          align="center"
                        >
                          ${product.priceSell * product.itemQuantity}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Divider />
              <Stack direction="column" alignItems="end" mt={2}>
                <Stack
                  width="35%"
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    sx={{ fontWeight: "700", ...textConfigs.style.basicFont }}
                  >
                    Total Price:
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "700",
                      ...textConfigs.style.basicFont,
                      color: "#4D94DD",
                    }}
                  >
                    ${order.totalAmount}
                  </Typography>
                </Stack>
                <Stack
                  width="35%"
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    sx={{ fontWeight: "700", ...textConfigs.style.basicFont }}
                  >
                    Tax:
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "700",
                      ...textConfigs.style.basicFont,
                      color: "#4D94DD",
                    }}
                  >
                    ${order.tax}
                  </Typography>
                </Stack>
                <Stack
                  width="35%"
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    sx={{ fontWeight: "700", ...textConfigs.style.basicFont }}
                  >
                    Shipping Fee:
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "700",
                      ...textConfigs.style.basicFont,
                      textDecoration: "line-through",
                      color: "#4D94DD",
                    }}
                  >
                    ${order.shippingCost}
                  </Typography>
                </Stack>
                <Stack
                  width="35%"
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    sx={{ fontWeight: "700", ...textConfigs.style.basicFont }}
                  >
                    Advance Payment:
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "700",
                      ...textConfigs.style.basicFont,
                      color: "#4D94DD",
                    }}
                  >
                    ${order.advancePayment}
                  </Typography>
                </Stack>
                <Stack
                  width="35%"
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    sx={{ fontWeight: "700", ...textConfigs.style.basicFont }}
                  >
                    Total Payment:
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "700",
                      ...textConfigs.style.basicFont,
                      color: "#4D94DD",
                    }}
                  >
                    ${order.totalPay}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            <Box
              bgcolor="white"
              p={2}
              sx={{
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Thêm boxShadow
                borderRadius: "8px", // Thêm borderRadius nếu cần
              }}
            >
              <Typography
                sx={{
                  mb: "5px",
                  fontWeight: "bold",
                  ...textConfigs.style.headerText,
                }}
              >
                Upload Image Shipping
              </Typography>
              <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
                width="100%"
                my={2}
              >
                {imageUrl ? (
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    display="flex"
                    justifyContent="center"
                  >
                    <Box
                      sx={{
                        position: "relative",
                        width: "40%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        m: 1,
                      }}
                    >
                      <img
                        style={{
                          borderRadius: "5px",
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          boxShadow: "2px 2px 5px rgba(255,255,255, 0.6)",
                          overflow: "hidden",
                        }}
                        src={imageUrl}
                        alt="PhotoItem"
                      />
                      <IconButton
                        sx={{
                          cursor: "pointer",
                          color: "#fff",
                          borderRadius: "50%",
                          padding: "5px",
                          position: "absolute",
                          top: "8px",
                          right: "8px",
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                          "&:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.7)",
                          },
                        }}
                        onClick={handleRemoveUrl}
                      >
                        <CloseIcon
                          sx={{
                            fontSize: "1rem",
                            color: "#fff",
                          }}
                        />
                      </IconButton>
                    </Box>
                  </Grid>
                ) : (
                  <Grid item xs={12} md={12}>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      align="center"
                      my={2}
                    >
                      There are no images for this order.
                    </Typography>
                  </Grid>
                )}
              </Grid>
              <AImageUploader handleUpload={setImageUrl} />
            </Box>
          </Stack>
          <Stack
            direction="column"
            spacing={1}
            flex={1.5}
            bgcolor="white"
            p={2}
            sx={{
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Thêm boxShadow
              borderRadius: "8px", // Thêm borderRadius nếu cần
            }}
          >
            <form onSubmit={billingForm.handleSubmit}>
              <Typography
                sx={{
                  fontSize: "16px",
                  mb: "2px",
                  fontWeight: "bold",
                  ...textConfigs.style.basicFont,
                }}
              >
                Customer Name
                <span style={{ color: "red", marginLeft: "2px" }}>*</span>
              </Typography>
              <TextField
                type="text"
                className="border border-gray-300 w-full h-[30px] pl-2 mb-4 rounded-lg"
                sx={{ mb: "28px" }}
                value={billingForm.values.toName}
                onChange={billingForm.handleChange}
                onBlur={billingForm.handleBlur}
                name="toName"
                error={
                  billingForm.touched.toName &&
                  Boolean(billingForm.errors.toName)
                }
                helperText={
                  billingForm.touched.toName && billingForm.errors.toName
                }
                size="small"
              />
              <Typography
                sx={{
                  fontSize: "16px",
                  mb: "2px",
                  fontWeight: "bold",
                  ...textConfigs.style.basicFont,
                }}
              >
                Employee Name
              </Typography>
              <TextField
                type="text"
                className="border border-gray-300 w-full h-[30px] pl-2 mb-4 rounded-lg"
                sx={{ mb: "28px" }}
                value={billingForm.values.employeeName}
                onChange={billingForm.handleChange}
                onBlur={billingForm.handleBlur}
                name="employeeName"
                error={
                  billingForm.touched.employeeName &&
                  Boolean(billingForm.errors.employeeName)
                }
                helperText={
                  billingForm.touched.employeeName &&
                  billingForm.errors.employeeName
                }
                size="small"
              />
              <Typography
                sx={{
                  fontSize: "16px",
                  mb: "2px",
                  fontWeight: "bold",
                  ...textConfigs.style.basicFont,
                }}
              >
                Shipper Name
              </Typography>
              <TextField
                type="text"
                className="border border-gray-300 w-full h-[30px] pl-2 mb-4 rounded-lg"
                sx={{ mb: "28px" }}
                value={billingForm.values.shipperName}
                onChange={billingForm.handleChange}
                onBlur={billingForm.handleBlur}
                name="shipperName"
                error={
                  billingForm.touched.shipperName &&
                  Boolean(billingForm.errors.shipperName)
                }
                helperText={
                  billingForm.touched.shipperName &&
                  billingForm.errors.shipperName
                }
                size="small"
              />
              <Typography
                sx={{
                  fontSize: "16px",
                  mb: "2px",
                  fontWeight: "bold",
                  ...textConfigs.style.basicFont,
                }}
              >
                Order Code
                <span style={{ color: "red", marginLeft: "2px" }}>*</span>
              </Typography>
              <TextField
                type="text"
                className="border border-gray-300 w-full h-[30px] pl-2 mb-4 rounded-lg"
                sx={{ mb: "28px" }}
                value={billingForm.values.code}
                onChange={billingForm.handleChange}
                onBlur={billingForm.handleBlur}
                disabled
                name="code"
                error={
                  billingForm.touched.code && Boolean(billingForm.errors.code)
                }
                helperText={billingForm.touched.code && billingForm.errors.code}
                size="small"
              />
              <Typography
                sx={{
                  fontSize: "16px",
                  mb: "2px",
                  fontWeight: "bold",
                  ...textConfigs.style.basicFont,
                }}
              >
                Order Status
                <span style={{ color: "red", marginLeft: "2px" }}>*</span>
              </Typography>
              <Select
                style={{ width: "100%", marginBottom: "12px" }}
                name="status"
                value={billingForm.values.status}
                onChange={billingForm.handleChange}
                // Fetch fee when status changes
                disabled
                error={
                  billingForm.touched.status &&
                  billingForm.errors.status !== undefined
                }
                onBlur={billingForm.handleBlur}
                variant="outlined"
                size="small"
                sx={{ width: "fit-content" }}
              >
                <MenuItem value="1">CREATED</MenuItem>
                <MenuItem value="2">PENDING</MenuItem>
                <MenuItem value="3">APPROVED</MenuItem>
                <MenuItem value="4">COMPLETED</MenuItem>
                <MenuItem value="5" disabled>
                  CANCELLED
                </MenuItem>
              </Select>
              <Typography
                sx={{
                  fontSize: "16px",
                  mb: "2px",
                  fontWeight: "bold",
                  ...textConfigs.style.basicFont,
                }}
              >
                Customer Phone
                <span style={{ color: "red", marginLeft: "2px" }}>*</span>
              </Typography>
              <TextField
                type="text"
                className="border border-gray-300 w-full h-[30px] pl-2 mb-4 rounded-lg"
                sx={{ mb: "28px" }}
                value={billingForm.values.toPhone}
                onChange={billingForm.handleChange}
                onBlur={billingForm.handleBlur}
                name="toPhone"
                error={
                  billingForm.touched.toPhone &&
                  Boolean(billingForm.errors.toPhone)
                }
                helperText={
                  billingForm.touched.toPhone && billingForm.errors.toPhone
                }
                size="small"
              />
              <Typography
                sx={{
                  fontSize: "16px",
                  mb: "2px",
                  fontWeight: "bold",
                  ...textConfigs.style.basicFont,
                }}
              >
                Customer Email
                <span style={{ color: "red", marginLeft: "2px" }}>*</span>
              </Typography>
              <TextField
                size="small"
                type="text"
                sx={{ mb: "28px" }}
                className="border border-gray-300 w-full h-[30px] pl-2 mb-4 rounded-lg"
                value={billingForm.values.toEmail}
                onChange={billingForm.handleChange}
                onBlur={billingForm.handleBlur}
                name="toEmail"
                error={
                  billingForm.touched.toEmail &&
                  billingForm.errors.toEmail !== undefined
                }
                helperText={
                  billingForm.touched.toEmail && billingForm.errors.toEmail
                }
              />
              <Typography
                sx={{
                  fontSize: "16px",
                  mb: "2px",
                  fontWeight: "bold",
                  ...textConfigs.style.basicFont,
                }}
              >
                Customer Province
                <span style={{ color: "red", marginLeft: "2px" }}>*</span>
              </Typography>
              <Select
                style={{ width: "100%", marginBottom: "12px" }}
                name="toProvinceName"
                value={billingForm.values.toProvinceName}
                onChange={(e) => {
                  billingForm.handleChange(e);
                  fetchDistricts(e.target.value); // Fetch districts when province changes
                }}
                error={
                  billingForm.touched.toProvinceName &&
                  billingForm.errors.toProvinceName !== undefined
                }
                onBlur={billingForm.handleBlur}
                variant="outlined"
                size="small"
                sx={{ width: "fit-content" }}
              >
                {provinces.map((province, index) => (
                  <MenuItem key={index} value={province.ProvinceID}>
                    {province.ProvinceName}
                  </MenuItem>
                ))}
              </Select>
              <Typography
                sx={{
                  fontSize: "16px",
                  mb: "2px",
                  fontWeight: "bold",
                  ...textConfigs.style.basicFont,
                }}
              >
                Customer District
                <span style={{ color: "red", marginLeft: "2px" }}>*</span>
              </Typography>
              <Select
                style={{ width: "100%", marginBottom: "12px" }}
                name="toDistrictName"
                value={billingForm.values.toDistrictName}
                onChange={(e) => {
                  billingForm.handleChange(e);
                  setSelectedDistrictID(e.target.value); // Store selected DistrictID
                  fetchWards(e.target.value); // Fetch wards when district changes
                }}
                error={
                  billingForm.touched.toDistrictName &&
                  billingForm.errors.toDistrictName !== undefined
                }
                onBlur={billingForm.handleBlur}
                variant="outlined"
                size="small"
                sx={{ width: "fit-content" }}
              >
                {districts &&
                  districts.map((district, index) => (
                    <MenuItem key={index} value={district.DistrictID}>
                      {district.DistrictName}
                    </MenuItem>
                  ))}
              </Select>
              <Typography
                sx={{
                  fontSize: "16px",
                  mb: "2px",
                  fontWeight: "bold",
                  ...textConfigs.style.basicFont,
                }}
              >
                Customer Ward
                <span style={{ color: "red", marginLeft: "2px" }}>*</span>
              </Typography>
              <Select
                style={{ width: "100%", marginBottom: "12px" }}
                name="toWardName"
                value={billingForm.values.toWardName}
                onChange={(e) => {
                  billingForm.handleChange(e);
                  calculateFee(e.target.value, selectedDistrictID); // Fetch fee when ward changes
                }}
                error={
                  billingForm.touched.toWardName &&
                  billingForm.errors.toWardName !== undefined
                }
                onBlur={billingForm.handleBlur}
                variant="outlined"
                size="small"
                sx={{ width: "fit-content" }}
              >
                {wards &&
                  wards.map((ward, index) => (
                    <MenuItem key={index} value={ward.WardCode}>
                      {ward.WardName}
                    </MenuItem>
                  ))}
              </Select>
              <Typography
                sx={{
                  fontSize: "16px",
                  mb: "2px",
                  fontWeight: "bold",
                  ...textConfigs.style.basicFont,
                }}
              >
                Customer Address
                <span style={{ color: "red", marginLeft: "2px" }}>*</span>
              </Typography>
              <TextField
                type="text"
                className="border border-gray-300 w-full h-[30px] pl-2 mb-4 rounded-lg"
                sx={{ mb: "28px" }}
                value={billingForm.values.toAddress}
                onChange={billingForm.handleChange}
                onBlur={billingForm.handleBlur}
                name="toAddress"
                error={
                  billingForm.touched.toAddress &&
                  Boolean(billingForm.errors.toAddress)
                }
                helperText={
                  billingForm.touched.toAddress && billingForm.errors.toAddress
                }
                size="small"
              />
              <Typography
                sx={{
                  fontSize: "16px",
                  mb: "2px",
                  fontWeight: "bold",
                  ...textConfigs.style.basicFont,
                }}
              >
                Cancellation Reason
              </Typography>
              <TextField
                type="text"
                className="border border-gray-300 w-full h-[30px] pl-2 mb-4 rounded-lg"
                sx={{ mb: "28px" }}
                value={billingForm.values.orderCancellationReasonId}
                onChange={billingForm.handleChange}
               
                name="orderCancellationReasonId"
               
                size="small"
              />
              <Typography
                sx={{
                  fontSize: "16px",
                  mb: "2px",
                  fontWeight: "bold",
                  ...textConfigs.style.basicFont,
                }}
              >
                Note
              </Typography>
              <TextField
                type="text"
                className="border border-gray-300 w-full h-[30px] pl-2 mb-4 rounded-lg"
                sx={{ mb: "28px" }}
                value={billingForm.values.note}
                onChange={billingForm.handleChange}
                onBlur={billingForm.handleBlur}
                name="note"
                error={
                  billingForm.touched.note && Boolean(billingForm.errors.note)
                }
                helperText={billingForm.touched.note && billingForm.errors.note}
                size="small"
              />
              <Typography
                sx={{
                  fontSize: "16px",
                  mb: "2px",
                  fontWeight: "bold",
                  ...textConfigs.style.basicFont,
                }}
              >
                Payment Method
                <span style={{ color: "red", marginLeft: "2px" }}>*</span>
              </Typography>
              <Select
                style={{ width: "100%", marginBottom: "12px" }}
                name="paymentMethod"
                value={billingForm.values.paymentMethod}
                onChange={billingForm.handleChange}
                // Fetch fee when paymentMethod changes

                error={
                  billingForm.touched.paymentMethod &&
                  billingForm.errors.paymentMethod !== undefined
                }
                onBlur={billingForm.handleBlur}
                disabled
                variant="outlined"
                size="small"
                sx={{ width: "fit-content" }}
              >
                <MenuItem value="CASH">Cash</MenuItem>
                <MenuItem value="COD">Cash on Delivery</MenuItem>
                <MenuItem value="PAYPAL">Paypal</MenuItem>
              </Select>
              <Typography
                sx={{
                  fontSize: "16px",
                  mb: "2px",
                  fontWeight: "bold",
                  ...textConfigs.style.basicFont,
                }}
              >
                Payment Status
                <span style={{ color: "red", marginLeft: "2px" }}>*</span>
              </Typography>
              <Select
                style={{ width: "100%", marginBottom: "12px" }}
                name="paymentStatus"
                value={billingForm.values.paymentStatus}
                onChange={billingForm.handleChange}
                // Fetch fee when paymentStatus changes

                error={
                  billingForm.touched.paymentStatus &&
                  billingForm.errors.paymentStatus !== undefined
                }
                onBlur={billingForm.handleBlur}
                disabled
                variant="outlined"
                size="small"
                sx={{ width: "fit-content" }}
              >
                <MenuItem value="1">Unpaid</MenuItem>
                <MenuItem value="2">Paid</MenuItem>
                <MenuItem value="3">Advance</MenuItem>
              </Select>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  width: "30%",
                  mt: "1rem",
                  ...backgroundConfigs.style.backgroundPrimary,
                }}
              >
                Update Order
              </Button>
            </form>
          </Stack>
        </Stack>
      </Box>
    </Fragment>
  );
};

export default OrderDetails;
