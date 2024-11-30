import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
  TablePagination,
  TextField,
  Typography,
  MenuItem,
  Select,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { routesGen } from "../router/router";
import { IoIosArrowBack } from "react-icons/io";
import textConfigs from "../config/text.config";
import backgroundConfigs from "../config/background.config";
import { Delete } from "@mui/icons-material";
import { RiDeleteBin6Line } from "react-icons/ri";
import CloseIcon from "@mui/icons-material/Close";
import ImageUploader from "../components/common/ImageUploader";
import ghnApi from "../api/modules/ghn.api";
import { useFormik } from "formik";
import * as Yup from "yup";
import productsApi from "../api/modules/product.api";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useMemo } from "react";
import ordersApi from "../api/modules/order.api";

const CreateOrder = () => {
  const location = useLocation();
  const { order } = location.state || {};
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  console.log(order);

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedDistrictID, setSelectedDistrictID] = useState(null);
  const [shippingFee, setShippingFee] = useState(0);

  const [currentProductsPage, setCurrentProductsPage] = useState(1);
  const productsPerPage = 20;
  const [totalProducts, setTotalProducts] = useState(0);
  const [openAddProductDialog, setOpenAddProductDialog] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [openVariantDialog, setOpenVariantDialog] = useState(false);
  const [openVariantValueDialog, setOpenVariantValueDialog] = useState(false);

  const [searchColor, setSearchColor] = useState("");

  const handleAddProductDialogOpen = () => {
    setOpenAddProductDialog(true);
  };

  const handleAddproductDialogClose = () => {
    setOpenAddProductDialog(false);
  };

  const handleShowVariantDialog = (product) => () => {
    setSelectedProduct(product);
    setOpenVariantDialog(true);
  };

  // Đóng Dialog chọn variant
  const handleCloseVariantDialog = () => {
    setSelectedProduct(null);
    setOpenVariantDialog(false);
  };

  const handleShowVariantValueDialog = (variant) => {
    setSelectedVariant(variant);
    setOpenVariantValueDialog(true);
  };

  const handleCloseVariantValueDialog = () => {
    setSelectedVariant(null);
    setOpenVariantValueDialog(false);
  };

  const handleSelectVariant = (variantValue, variant, product) => {
    console.log("Selected Variant:", variant);

    setSelectedProducts((prev) => {
      // Kiểm tra sản phẩm đã tồn tại trong danh sách hay chưa
      const isProductExists = prev.some(
        (item) =>
          (item.paintId === variant.id ||
            item.wallpaperId === variant.id ||
            item.floorId === variant.id) &&
          item.variantId === variantValue.variantId
      );

      if (isProductExists) {
        // Thông báo sản phẩm đã tồn tại
        alert("This product has been added to the list.");
        return prev; // Không thêm sản phẩm mới
      }

      // Xác định loại sản phẩm
      let newProduct;
      if (product.category.name === "Paint") {
        newProduct = {
          productId: product.productId,
          productImage: product.images[0].url,
          productName: product.productName,
          productCode: product.code,
          category: product.category.name,
          paintId: variant.id,
          wallpaperId: null,
          floorId: null,
          numberOfPerBox: null,
          colorName: variant.color.name,
          colorHex: variant.color.hex,
          variantId: variantValue.variantId,
          variantSizeName: variantValue.sizeName,
          variantPackageType: variantValue.packageType,
          variantQuantity: 1,
          variantPrice: variantValue.price,
        };
      } else if (product.category.name === "Wallpaper") {
        newProduct = {
          productId: product.productId,
          productImage: product.images[0].url,
          productName: product.productName,
          productCode: product.code,
          category: product.category.name,
          paintId: null,
          wallpaperId: variant.id,
          floorId: null,
          numberOfPerBox: null,
          colorName: "",
          colorHex: "",
          variantId: variantValue.variantId,
          variantSizeName: variantValue.sizeName,
          variantPackageType: variantValue.packageType,
          variantQuantity: 1,
          variantPrice: variantValue.price,
        };
      } else if (product.category.name === "Floor") {
        newProduct = {
          productId: product.productId,
          productImage: product.images[0].url,
          productName: product.productName,
          productCode: product.code,
          category: product.category.name,
          paintId: null,
          wallpaperId: null,
          floorId: variant.id,
          numberOfPerBox: variant.numberOfPerBox,
          colorName: "",
          colorHex: "",
          variantId: variantValue.variantId,
          variantSizeName: variantValue.sizeName,
          variantPackageType: variantValue.packageType,
          variantQuantity: 1,
          variantPrice: variantValue.price,
        };
      }

      // Thêm sản phẩm mới nếu chưa tồn tại
      return [...prev, newProduct];
    });

    handleCloseVariantValueDialog();
  };

  const handleQuantityChange = (productId, variantId, action) => {
    setSelectedProducts((prevProducts) =>
      prevProducts.map((product) => {
        // Kiểm tra điều kiện tương ứng với từng loại ID
        const isMatchingProduct =
          (product.paintId === productId && product.variantId === variantId) ||
          (product.wallpaperId === productId &&
            product.variantId === variantId) ||
          (product.floorId === productId && product.variantId === variantId);

        if (isMatchingProduct) {
          const newQuantity =
            action === "increase"
              ? product.variantQuantity + 1
              : product.variantQuantity - 1;
          return { ...product, variantQuantity: Math.max(newQuantity, 1) }; // Đảm bảo số lượng không nhỏ hơn 1
        }

        return product;
      })
    );
  };

  const handleDeleteProduct = (productId, variantId) => {
    setSelectedProducts((prevProducts) =>
      prevProducts.filter((product) => {
        // Kiểm tra điều kiện tương ứng với từng loại ID
        const isMatchingProduct =
          (product.paintId === productId && product.variantId === variantId) ||
          (product.wallpaperId === productId &&
            product.variantId === variantId) ||
          (product.floorId === productId && product.variantId === variantId);

        // Giữ lại sản phẩm không khớp với điều kiện
        return !isMatchingProduct;
      })
    );
  };

  console.log(selectedProducts.length);

  console.log(selectedProducts);

  const handleSearchChange = (event) => {
    setSearchColor(event.target.value.toLowerCase());
  };

  // Lọc danh sách paints theo searchTerm
  const filteredPaints =
    selectedProduct?.paints?.filter((paint) =>
      paint.color.name.toLowerCase().includes(searchColor.toLowerCase())
    ) || [];

  const handleAddProduct = () => {};

  const handleChangePage = (event, newPage) => {
    setCurrentProductsPage(newPage + 1);
  };

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
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    const getAllColors = async () => {
      try {
        const { response, err } = await productsApi.getAllProductPageAble(
          currentProductsPage - 1,
          productsPerPage
        );
        if (response) {
          setProducts(response.data.products.content);
          setTotalProducts(response.data.products.totalElements);
        } else if (err) {
          toast.error(err);
        }
      } catch (error) {
        console.log("Error", error);
        toast.error("An error occurred while fetching product.");
      }
    };
    getAllColors();
  }, [dispatch, currentProductsPage]);

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

  console.log(products);

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

  const orderForm = useFormik({
    initialValues: {
      toName: "",
      toPhone: "",
      toEmail: "",
      toProvinceName: "",
      toDistrictName: "",
      toWardName: "",
      toAddress: "",
      note: "",
      paymentMethod: "CASH",
      paymentStatus: 1,
      advancePayment: 0,
    },
    validationSchema: Yup.object({
      toName: Yup.string()
        .min(2, "Full name at least 8 characters !")
        .required("Name is required !"),
      toPhone: Yup.string()
        .required("Phone is required !")
        .matches(
          /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
          "The phone number format is invalid!"
        ),
      toEmail: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      toProvinceName: Yup.string().required("State is required !"),
      toDistrictName: Yup.string().required("District is required !"),
      toWardName: Yup.string().required("Ward is required !"),
      toAddress: Yup.string().required("Address is required !"),
      note: Yup.string(),
      paymentStatus: Yup.string(),
      advancePayment: Yup.number()
        .required("Advance Payment is required !")
        .min(0, "Advance Payment must be greater than 0 !"),
    }),
    onSubmit: async (values) => {
      console.log("submit");

      values.toProvinceName = provinces.find(
        (province) => province.ProvinceID === values.toProvinceName
      ).ProvinceName;
      values.toDistrictName = districts.find(
        (district) => district.DistrictID === values.toDistrictName
      ).DistrictName;
      values.toWardName = wards.find(
        (ward) => ward.WardCode === values.toWardName
      ).WardName;

      if(values.advancePayment === 0) values.advancePayment = null

      const updatedValues = {
        ...values,
        code: null,
        status: 1,
        reference: "REF12345",
        orderCancellationReasonId: null,
        customerId: null,
        shippingCost: 4,
        purchaseProducts: selectedProducts.map(product => {
          let idKey;
          let idField;
          switch (product.category) {
            case "Paint":
              idKey = "paintId";
              idField = product.paintId;
              break;
            case "Wallpaper":
              idKey = "wallpaperId";
              idField = product.wallpaperId;
              break;
            case "Floor":
              idKey = "floorId";
              idField = product.floorId;
              break;
            default:
              idField = null;
              break;
          }
      
          return {
            productId: product.productId,
            variantId: product.variantId,
            quantity: product.variantQuantity,
            [idKey]: idField, 
          };
        })
      };

      try {
        const { response, err } = await ordersApi.createOrder(updatedValues);
        if(response) {
          toast.success("Create Order success!");
        } else {
          toast.err(response.message);
        }
      } catch (error) {
        console.log(error);
      }
      console.log(updatedValues);
      
    },
  });

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
            Create Order
          </Typography>
        </Stack>

        <Stack direction="row" spacing={2} alignItems="start" mt={2}>
          <Stack direction="column" spacing={1} flex={3}>
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
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: "10px" }}
              >
                <Typography
                  sx={{
                    mb: "5px",
                    fontWeight: "bold",
                    ...textConfigs.style.basicFont,
                  }}
                >
                  Add Product
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddProductDialogOpen}
                  sx={{ textTransform: "none" }}
                >
                  Add Product
                </Button>
              </Stack>

              {selectedProducts.length > 0 ? (
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
                          Image
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
                        <TableCell
                          align="center"
                          width="5%"
                          sx={{
                            ...textConfigs.style.basicFont,
                            backgroundColor: "#F9FAFB",
                            fontWeight: 600,
                            borderBottom: "1px solid #E5E7EB",
                          }}
                        >
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedProducts.length > 0 &&
                        selectedProducts.map((product, index) => (
                          <TableRow
                            key={index}
                            sx={{
                              "&:last-child td": { borderBottom: 0 },
                              backgroundColor:
                                index % 2 === 0 ? "#F9FAFB" : "white",
                            }}
                          >
                            <TableCell
                              sx={{
                                ...textConfigs.style.basicFont,
                                color: "#1A56DB",
                              }}
                              align="center"
                            >
                              <img
                                src={product.productImage}
                                alt={product.productName}
                                style={{ width: 50, height: 50 }}
                              />
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
                                  {product.productName}
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
                                    {product.productCode}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      fontSize: "14px",
                                      ...textConfigs.style.basicFont,
                                      color: "#4D94DD",
                                    }}
                                  >
                                    {product.category}
                                  </Typography>
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
                                        backgroundColor: product.colorHex,
                                        borderRadius: "4px",
                                      }}
                                    ></Box>

                                    {/* Bên Phải: Tên và Mã Màu */}
                                    <Box sx={{ marginLeft: "10px" }}>
                                      <Typography
                                        sx={{
                                          fontSize: "14px",
                                          fontWeight: "bold",
                                          color: "#9F9BA9",
                                        }}
                                      >
                                        {product.colorName}
                                      </Typography>
                                      <Typography
                                        sx={{
                                          color: "#4D94DD",
                                          fontSize: "14px",
                                        }}
                                      >
                                        {product.colorHex}
                                      </Typography>
                                    </Box>
                                  </Box>
                                </Stack>
                              </Stack>
                            </TableCell>
                            <TableCell
                              sx={{ ...textConfigs.style.basicFont }}
                              align="center"
                            >
                              {product.variantSizeName} L
                            </TableCell>
                            <TableCell
                              sx={{ ...textConfigs.style.basicFont }}
                              align="center"
                            >
                              ${product.variantPrice}
                            </TableCell>
                            <TableCell
                              sx={{ ...textConfigs.style.basicFont }}
                              align="center"
                            >
                              <Stack
                                direction="row"
                                alignItems="center"
                                width="90px"
                                height="58px"
                              >
                                <button
                                  className="w-[27px] h-[30px] border border-gray-300 border-solid bg-[#EAEAEA] rounded-sm"
                                  onClick={() =>
                                    handleQuantityChange(
                                      product.paintId ||
                                        product.wallpaperId ||
                                        product.floorId, // Kiểm tra ID nào không phải null
                                      product.variantId,
                                      "decrease"
                                    )
                                  }
                                >
                                  -
                                </button>
                                <input
                                  className="border border-gray-300 w-[36px] h-[30px] text-center no-arrows"
                                  type="text"
                                  min={1}
                                  value={product.variantQuantity}
                                  readOnly
                                />
                                <button
                                  className="w-[27px] h-[30px] border border-gray-300 border-solid bg-[#EAEAEA] rounded-sm"
                                  onClick={() =>
                                    handleQuantityChange(
                                      product.paintId ||
                                        product.wallpaperId ||
                                        product.floorId, // Kiểm tra ID nào không phải null
                                      product.variantId,
                                      "increase"
                                    )
                                  }
                                >
                                  +
                                </button>
                              </Stack>
                            </TableCell>
                            <TableCell
                              sx={{ ...textConfigs.style.basicFont }}
                              align="center"
                            >
                              ${product.variantPrice * product.variantQuantity}
                            </TableCell>

                            <TableCell
                              sx={{ ...textConfigs.style.basicFont }}
                              align="center"
                            >
                              <IconButton
                                onClick={() =>
                                  handleDeleteProduct(
                                    product.paintId ||
                                      product.wallpaperId ||
                                      product.floorId, // Kiểm tra ID nào không phải null
                                    product.variantId
                                  )
                                }
                              >
                                <RiDeleteBin6Line style={{ color: "red" }} />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    my: "2rem",
                  }}
                >
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/colux-alpha-storage.appspot.com/o/commons%2F404.png?alt=media&token=a8a59775-5287-4cba-9e45-bb0355e39fa0"
                    alt="No products found"
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
                    Please select the product.
                  </Typography>
                </Box>
              )}

              {selectedProducts.length > 0 && (
                <>
                  <Divider />
                  <Stack direction="column" alignItems="end" mt={2}>
                    <Stack
                      width="30%"
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography
                        sx={{
                          fontWeight: "700",
                          ...textConfigs.style.basicFont,
                        }}
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
                        $
                        {selectedProducts
                          .reduce(
                            (total, product) =>
                              total +
                              product.variantPrice * product.variantQuantity,
                            0
                          )
                          .toFixed(2)}
                      </Typography>
                    </Stack>
                    <Stack
                      width="30%"
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography
                        sx={{
                          fontWeight: "700",
                          ...textConfigs.style.basicFont,
                        }}
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
                        $
                        {(
                          selectedProducts.reduce(
                            (total, product) =>
                              total +
                              product.variantPrice * product.variantQuantity,
                            0
                          ) * 0.1
                        ).toFixed(2)}
                      </Typography>
                    </Stack>
                    <Stack
                      width="30%"
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography
                        sx={{
                          fontWeight: "700",
                          ...textConfigs.style.basicFont,
                        }}
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
                        $0
                      </Typography>
                    </Stack>
                    <Stack
                      width="30%"
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography
                        sx={{
                          fontWeight: "700",
                          ...textConfigs.style.basicFont,
                        }}
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
                        $
                        {(
                          selectedProducts.reduce(
                            (total, product) =>
                              total +
                              product.variantPrice * product.variantQuantity,
                            0
                          ) +
                          selectedProducts.reduce(
                            (total, product) =>
                              total +
                              product.variantPrice * product.variantQuantity,
                            0
                          ) *
                            0.1
                        ).toFixed(2)}
                      </Typography>
                    </Stack>
                  </Stack>
                </>
              )}
            </Stack>
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
            <form onSubmit={orderForm.handleSubmit}>
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
                size="small"
                type="text"
                sx={{ mb: "28px" }}
                className="border border-gray-300 w-full h-[30px] pl-2 mb-4 rounded-lg"
                value={orderForm.values.toName}
                onChange={orderForm.handleChange}
                onBlur={orderForm.handleBlur}
                name="toName"
                error={
                  orderForm.touched.toName &&
                  orderForm.errors.toName !== undefined
                }
                helperText={orderForm.touched.toName && orderForm.errors.toName}
              ></TextField>
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
                size="small"
                type="text"
                sx={{ mb: "28px" }}
                className="border border-gray-300 w-full h-[30px] pl-2 mb-4 rounded-lg"
                value={orderForm.values.toPhone}
                onChange={orderForm.handleChange}
                onBlur={orderForm.handleBlur}
                name="toPhone"
                error={
                  orderForm.touched.toPhone &&
                  orderForm.errors.toPhone !== undefined
                }
                helperText={
                  orderForm.touched.toPhone && orderForm.errors.toPhone
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
                Customer Email
                <span style={{ color: "red", marginLeft: "2px" }}>*</span>
              </Typography>
              <TextField
                size="small"
                type="text"
                sx={{ mb: "28px" }}
                className="border border-gray-300 w-full h-[30px] pl-2 mb-4 rounded-lg"
                value={orderForm.values.toEmail}
                onChange={orderForm.handleChange}
                onBlur={orderForm.handleBlur}
                name="toEmail"
                error={
                  orderForm.touched.toEmail &&
                  orderForm.errors.toEmail !== undefined
                }
                helperText={
                  orderForm.touched.toEmail && orderForm.errors.toEmail
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
                Customer Province:
              </Typography>

              <Select
                style={{ width: "100%", marginBottom: "12px" }}
                name="toProvinceName"
                value={orderForm.values.toProvinceName}
                onChange={(e) => {
                  orderForm.handleChange(e);
                  fetchDistricts(e.target.value); // Fetch districts when province changes
                }}
                error={
                  orderForm.touched.toProvinceName &&
                  orderForm.errors.toProvinceName !== undefined
                }
                onBlur={orderForm.handleBlur}
                variant="outlined"
                size="small"
                sx={{ width: "fit-content" }}
              >
                {provinces
                  .slice()
                  .sort((a, b) => {
                    const numA =
                      parseInt(a.ProvinceName.match(/\d+/)?.[0], 10) ||
                      Infinity;
                    const numB =
                      parseInt(b.ProvinceName.match(/\d+/)?.[0], 10) ||
                      Infinity;
                    if (numA !== numB) return numA - numB;
                    return a.ProvinceName.localeCompare(b.ProvinceName);
                  })
                  .map((province, index) => (
                    <MenuItem key={index} value={province.ProvinceID}>
                      {province.ProvinceName}
                    </MenuItem>
                  ))}
              </Select>

              {/* District Selection */}

              <Typography
                sx={{
                  fontSize: "16px",
                  mb: "2px",
                  fontWeight: "bold",
                  ...textConfigs.style.basicFont,
                }}
              >
                Customer District:
              </Typography>
              <Select
                style={{ width: "100%", marginBottom: "12px" }}
                name="toDistrictName"
                value={orderForm.values.toDistrictName}
                onChange={(e) => {
                  orderForm.handleChange(e);
                  setSelectedDistrictID(e.target.value); // Store selected DistrictID
                  fetchWards(e.target.value); // Fetch wards when district changes
                }}
                error={
                  orderForm.touched.toDistrictName &&
                  orderForm.errors.toDistrictName !== undefined
                }
                onBlur={orderForm.handleBlur}
                variant="outlined"
                size="small"
                sx={{ width: "fit-content" }}
              >
                {districts &&
                  districts
                    .slice()
                    .sort((a, b) => {
                      const numA =
                        parseInt(a.DistrictName.match(/\d+/)?.[0], 10) ||
                        Infinity;
                      const numB =
                        parseInt(b.DistrictName.match(/\d+/)?.[0], 10) ||
                        Infinity;
                      if (numA !== numB) return numA - numB;
                      return a.DistrictName.localeCompare(b.DistrictName);
                    })
                    .map((district, index) => (
                      <MenuItem key={index} value={district.DistrictID}>
                        {district.DistrictName}
                      </MenuItem>
                    ))}
              </Select>

              {/* Ward Selection */}
              <Typography
                sx={{
                  fontSize: "16px",
                  mb: "2px",
                  fontWeight: "bold",
                  ...textConfigs.style.basicFont,
                }}
              >
                Customer Ward:
              </Typography>
              <Select
                style={{ width: "100%", marginBottom: "12px" }}
                name="toWardName"
                value={orderForm.values.toWardName}
                onChange={(e) => {
                  orderForm.handleChange(e);
                  calculateFee(e.target.value, selectedDistrictID); // Fetch fee when ward changes
                }}
                error={
                  orderForm.touched.toWardName &&
                  orderForm.errors.toWardName !== undefined
                }
                onBlur={orderForm.handleBlur}
                variant="outlined"
                size="small"
                sx={{ width: "fit-content" }}
              >
                {wards &&
                  wards
                    .slice()
                    .sort((a, b) => {
                      const numA =
                        parseInt(a.WardName.match(/\d+/)?.[0], 10) || Infinity;
                      const numB =
                        parseInt(b.WardName.match(/\d+/)?.[0], 10) || Infinity;
                      if (numA !== numB) return numA - numB;
                      return a.WardName.localeCompare(b.WardName);
                    })
                    .map((ward, index) => (
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
                size="small"
                type="text"
                sx={{ mb: "28px" }}
                className="border border-gray-300 w-full h-[30px] pl-2 mb-4 rounded-lg"
                value={orderForm.values.toAddress}
                onChange={orderForm.handleChange}
                onBlur={orderForm.handleBlur}
                name="toAddress"
                error={
                  orderForm.touched.toAddress &&
                  orderForm.errors.toAddress !== undefined
                }
                helperText={
                  orderForm.touched.toAddress && orderForm.errors.toAddress
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
                Note
              </Typography>
              <TextField
                size="small"
                type="text"
                sx={{ mb: "28px" }}
                className="border border-gray-300 w-full h-[30px] pl-2 mb-4 rounded-lg"
                value={orderForm.values.note}
                onChange={orderForm.handleChange}
                onBlur={orderForm.handleBlur}
                name="note"
                error={
                  orderForm.touched.note && orderForm.errors.note !== undefined
                }
                helperText={orderForm.touched.note && orderForm.errors.note}
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
              <TextField
                size="small"
                type="text"
                sx={{ mb: "28px" }}
                className="border border-gray-300 w-full h-[30px] pl-2 mb-4 rounded-lg"
                value="CASH"
                disabled
              />
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
                value={orderForm.values.paymentStatus}
                onChange={orderForm.handleChange}
                // Fetch fee when paymentStatus changes

                error={
                  orderForm.touched.paymentStatus &&
                  orderForm.errors.paymentStatus !== undefined
                }
                onBlur={orderForm.handleBlur}
                variant="outlined"
                size="small"
                sx={{ width: "fit-content" }}
              >
                <MenuItem value="1">Unpaid</MenuItem>
                <MenuItem value="2">Paid</MenuItem>
                <MenuItem value="3">Advance</MenuItem>
              </Select>
              <Typography
                sx={{
                  fontSize: "16px",
                  mb: "2px",
                  fontWeight: "bold",
                  ...textConfigs.style.basicFont,
                }}
              >
                Advance Payment
                <span style={{ color: "red", marginLeft: "2px" }}>*</span>
              </Typography>
              <TextField
                size="small"
                type="text"
                sx={{ mb: "28px" }}
                className="border border-gray-300 w-full h-[30px] pl-2 mb-4 rounded-lg"
                value={orderForm.values.advancePayment}
                onChange={orderForm.handleChange}
                onBlur={orderForm.handleBlur}
                name="advancePayment"
                error={
                  orderForm.touched.advancePayment &&
                  orderForm.errors.advancePayment !== undefined
                }
                helperText={
                  orderForm.touched.advancePayment &&
                  orderForm.errors.advancePayment
                }
              />
              <Button
                variant="contained"
                type="submit"
                sx={{
                  width: "30%",
                  mt: "1rem",
                  ...backgroundConfigs.style.backgroundPrimary,
                }}
              >
                Create Order
              </Button>
            </form>
          </Stack>
        </Stack>
      </Box>

      <Dialog open={openAddProductDialog} onClose={handleAddproductDialogClose}>
        <DialogTitle>Select Product</DialogTitle>
        <DialogContent>
          <TableContainer
            sx={{
              maxHeight: "60vh",
              width: "100%",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                maxHeight: "60vh",
                overflowY: "scroll",
                paddingRight: "8px",
              }}
            >
              <style>
                {`
                ::-webkit-scrollbar {
                  display: none;
                }
                body {
                  scrollbar-width: none;
                }
              `}
              </style>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>ProductName</TableCell>
                    <TableCell>Select</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.length > 0 &&
                    products.map((product, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <img
                            src={
                              product.images.length > 0
                                ? product.images[0].url
                                : ""
                            }
                            alt={product.productName}
                            style={{ width: 50, height: 50 }}
                          />
                        </TableCell>
                        <TableCell>{product.productName}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            onClick={handleShowVariantDialog(product)}
                            sx={{ ...textConfigs.style.basicFont }}
                          >
                            Select
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={totalProducts}
            rowsPerPage={productsPerPage}
            page={currentProductsPage - 1}
            onPageChange={handleChangePage}
            labelDisplayedRows={({ from, to, count }) => (
              <span
                style={{ ...textConfigs.style.basicFont }}
              >{`${from}-${to} of ${count}`}</span>
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleAddproductDialogClose}
            color="primary"
            sx={{ textTransform: "none" }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openVariantDialog} onClose={handleCloseVariantDialog}>
        <DialogTitle>
          {selectedProduct?.paints &&
            selectedProduct.paints.length > 0 &&
            `Select Color for ${selectedProduct?.productName}`}
        </DialogTitle>
        <DialogContent>
          {/* Hiển thị ô tìm kiếm chỉ khi có dữ liệu */}
          {selectedProduct?.paints && selectedProduct.paints.length > 0 ? (
            <>
              <TextField
                label="Search Color"
                variant="outlined"
                fullWidth
                margin="dense"
                value={searchColor}
                size="small"
                onChange={handleSearchChange} // Hàm xử lý tìm kiếm
              />
              {/* Hiển thị danh sách màu */}
              {filteredPaints && filteredPaints.length > 0 ? (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Color</TableCell>
                      <TableCell>Color Name</TableCell>
                      <TableCell>Select</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredPaints.map((paint, paintIndex) => (
                      <TableRow key={paintIndex}>
                        <TableCell>
                          <Box
                            sx={{
                              width: 60,
                              height: 60,
                              backgroundColor: `${paint.color.hex}`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#fff",
                            }}
                          >
                            {paint.color.hex}
                          </Box>
                        </TableCell>
                        <TableCell>{paint.color.name}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            onClick={() => handleShowVariantValueDialog(paint)}
                          >
                            Select
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <Box sx={{ textAlign: "center", marginTop: 2 }}>
                  <p>No matching colors found.</p>
                </Box>
              )}
            </>
          ) : (
            // Khi không có màu nào trong danh sách
            <Box sx={{ textAlign: "center", marginTop: 2 }}>
              <p>No colors available for this product.</p>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseVariantDialog}
            color="primary"
            sx={{ textTransform: "none" }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openVariantValueDialog}
        onClose={handleCloseVariantValueDialog}
      >
        <DialogTitle>Select Variant</DialogTitle>
        <DialogContent>
          {selectedVariant &&
          selectedVariant.variants &&
          selectedVariant.variants.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Size Name</TableCell>
                  <TableCell>Package Type</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Select</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedVariant.variants.map((variant, paintIndex) => (
                  <TableRow key={paintIndex}>
                    <TableCell>{variant.sizeName}</TableCell>
                    <TableCell>{variant.packageType}</TableCell>
                    <TableCell>{variant.quantity}</TableCell>
                    <TableCell>{variant.price}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() =>
                          handleSelectVariant(
                            variant,
                            selectedVariant,
                            selectedProduct
                          )
                        }
                      >
                        Select
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>No variant available for this product.</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseVariantValueDialog}
            color="primary"
            sx={{ textTransform: "none" }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default CreateOrder;
