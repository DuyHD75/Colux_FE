import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Container,
  Box,
  TextField,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { useDispatch } from "react-redux";
import ProductModal from "../components/commons/ProductModel";
import { FaCheck, FaEdit, FaTrash } from "react-icons/fa";
import Navigate from "../components/commons/Navigate";
import { setGlobalLoading } from "../redux/reducer/globalLoadingSlice";
import productsApi from "../api/modules/products.api";
import { toast } from "react-toastify";
import { BsFillHexagonFill } from "react-icons/bs";
import textConfigs from "../config/text.config";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import cartApi from "../api/modules/cart.api";

const CalculatePrice = () => {
  const { t, i18n } = useTranslation();

  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );
  const [cart, setCart] = useState(null);

  const location = useLocation();
  const { product, selectedProduct, selectedVariant } = location.state || {};

  useEffect(() => {
    if ( product || selectedProduct || selectedVariant ) {
      if ( product.category.name === "Paint" ) {
        setSelectedPaints((prev) => [...prev, product]);
        setSelectedVariants((prev) => ({
          ...prev,
          0: {
            ...prev[0],
            selectedVariant: selectedProduct,
            selectedVariantValue: selectedVariant,
          },
        }));
      } else if ( product.category.name === "Wallpaper" ) {
        setSelectedWallpaper(product);
        setSelectedWallpaperVariant(selectedVariant)
      } else if ( product.category.name === "Floor" ) {
        setSelectedFloor(product);
        setSelectedFloorVariant(selectedProduct);
        setSelectedFloorValue(selectedVariant);
      }
    } 
  }, []);

  const [paints, setPaints] = useState([]);
  const [wallpapers, setWallpapers] = useState([]);
  const [floors, setFloors] = useState([]);
  const productsPerPage = 10;

  const [paintsTotalPages, setPaintsTotalPages] = useState(0);
  const [wallpapersTotalPages, setWallpapersTotalPages] = useState(0);
  const [floorsTotalPages, setFloorsTotalPages] = useState(0);
  const [currentPaintPage, setCurrentPaintPage] = useState(1);
  const [currentWallpaperPage, setCurrentWallpaperPage] = useState(1);
  const [currentFloorPage, setCurrentFloorPage] = useState(1);
  const [totalPaints, setTotalPaints] = useState(0);
  const [totalWallpaper, settotalWallpaper] = useState(0);
  const [totalFloor, setTotalFloor] = useState(0);

  const [selectedVariants, setSelectedVariants] = useState({});
  const [selectedWallpaperVariant, setSelectedWallpaperVariant] =
    useState(null);
  const [selectedFloorVariant, setSelectedFloorVariant] = useState(null);
  const [selectedFloorValue, setSelectedFloorValue] = useState(null);

  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [walls, setWalls] = useState([
    { length: "", width: "", errors: { length: false, width: false } },
  ]);
  const [selectedPaints, setSelectedPaints] = useState([]);
  const [selectedWallpaper, setSelectedWallpaper] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [openPaintModal, setOpenPaintModal] = useState(false);
  const [openWallpaperModal, setOpenWallpaperModal] = useState(false);
  const [openFloorModal, setOpenFloorModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editableAreas, setEditableAreas] = useState({});

  const [userInputValue, setUserInputValue] = useState({});
  const [userIsEditing, setUserIsEditing] = useState(false);

  const [showAddToCartBtn, setShowAddToCartBtn] = useState(true);

  const [isSticky, setIsSticky] = useState(false);
  const boxRef = useRef(null);
  const [isNegativeL, setIsNegativeL] = useState(false);
  const [isNegativeW, setIsNegativeW] = useState(false);

  const handleChangeL = (e) => {
    const value = e.target.value;
    if (value === "" || Number(value) >= 0) {
      setLength(value);
      setIsNegativeL(false); // Không hiển thị cảnh báo
    } else {
      setIsNegativeL(true); // Hiển thị cảnh báo
    }
  };

  const handleChangeW = (e) => {
    const value = e.target.value;
    if (value === "" || Number(value) >= 0) {
      setWidth(value);
      setIsNegativeW(false); // Không hiển thị cảnh báo
    } else {
      setIsNegativeW(true); // Hiển thị cảnh báo
    }
  };

  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const dispatch = useDispatch();
  useEffect(() => {
    const getAllCategory = async () => {
      dispatch(setGlobalLoading(true));
      try {
        const { response, err } = await productsApi.getAllCategory();

        if (response) {
          const categories = response.data.categories;
          const fetchProducts = async (
            categoryId,
            categoryName,
            page,
            size
          ) => {
            try {
              const { response: productResponse, err: productError } =
                await productsApi.getProductByCategory(categoryId, page, size);

              if (productResponse) {
                const products = productResponse.data.products.content;
                if (categoryName === "Paint") {
                  setPaints(products);
                  setPaintsTotalPages(productResponse.data.products.totalPages);
                  setTotalPaints(productResponse.data.products.totalElements);
                } else if (categoryName === "Wallpaper") {
                  setWallpapers(products);
                  setWallpapersTotalPages(
                    productResponse.data.products.totalPages
                  );
                  settotalWallpaper(
                    productResponse.data.products.totalElements
                  );
                } else if (categoryName === "Floor") {
                  setFloors(products);
                  setFloorsTotalPages(productResponse.data.products.totalPages);
                  setTotalFloor(productResponse.data.products.totalElements);
                }
              } else if (productError) {
                toast.error(productError.message);
              }
            } catch (error) {
              console.error(
                `An error occurred while retrieving products for the ${categoryName}`,
                error
              );
            }
          };
          categories.forEach((category) => {
            fetchProducts(
              category.categoryId,
              category.name,
              category.name === "Paint"
                ? currentPaintPage - 1
                : category.name === "Wallpaper"
                ? currentWallpaperPage - 1
                : currentFloorPage - 1,
              productsPerPage
            );
          });
        } else if (err) {
          toast.error(err);
        }
      } catch (error) {
        console.log("Error", error);
        toast.error("An error occurred while retrieving the category.");
      } finally {
        dispatch(setGlobalLoading(false));
      }
    };

    getAllCategory();
  }, [dispatch, currentPaintPage, currentWallpaperPage, currentFloorPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (boxRef.current) {
      observer.observe(boxRef.current);
    }

    return () => {
      if (boxRef.current) {
        observer.unobserve(boxRef.current);
      }
    };
  }, []);

  const handlePageChange = (type, newPage) => {
    if (type === "paint") {
      setCurrentPaintPage(newPage);
    } else if (type === "wallpaper") {
      setCurrentWallpaperPage(newPage);
    } else if (type === "floor") {
      setCurrentFloorPage(newPage);
    }
  };

  const handleWallChange = (index, field, value) => {
    const newWalls = [...walls];
    newWalls[index][field] = value;

    // Kiểm tra lỗi cho trường cụ thể
    if (field === "length" || field === "width") {
      newWalls[index].errors[field] = Number(value) < 0;
      newWalls[index][field] = Number(value) >= 0 ? value : "";
    }

    setWalls(newWalls);
  };

  const addWall = () => {
    setWalls([
      ...walls,
      { length: "", width: "", errors: { length: false, width: false } },
    ]);
  };

  const deleteWall = (index) => {
    const newWalls = walls.filter((_, wallIndex) => wallIndex !== index);
    setWalls(newWalls);
  };

  const wallArea = walls.reduce(
    (total, wall) =>
      total + (Number(wall.length) || 0) * (Number(wall.width) || 0),
    0
  );

  const [errorState, setErrorState] = useState({});

  const handleEditableAreaChange = (uniqueKey, value) => {
    if (value === "" || Number(value) >= 0) {
      setErrorState((prev) => ({
        ...prev,
        [uniqueKey]: false, // Không lỗi
      }));
      setUserInputValue((prev) => ({
        ...prev,
        [uniqueKey]: value,
      }));
    } else {
      setErrorState((prev) => ({
        ...prev,
        [uniqueKey]: true, // Có lỗi
      }));
    }
  };

  const handleInputBlur = (uniqueKey) => {
    setEditableAreas((prevAreas) => ({
      ...prevAreas,
      [uniqueKey]: userInputValue[uniqueKey] || wallArea,
    }));
    setUserIsEditing(false);
  };

  useEffect(() => {
    // Chỉ thiết lập editableAreas nếu userIsEditing là false
    if (!userIsEditing) {
      const initialAreas = {};
      let shouldSetAreas = false;

      selectedPaints.forEach((paint, index) => {
        const uniqueKey = `${paint.productId}-${index}`;

        if (!(uniqueKey in editableAreas)) {
          initialAreas[uniqueKey] = wallArea;
          shouldSetAreas = true;
        }
      });

      if (shouldSetAreas) {
        setEditableAreas((prevAreas) => ({
          ...prevAreas,
          ...initialAreas,
        }));
      }
    }
  }, [selectedPaints, wallArea, editableAreas, userIsEditing]);

  const floorArea = length && width ? length * width : 0;

  const handleProductSelect = (product, type) => {
    if (editingIndex !== null && type === "paint") {
      const newPaints = [...selectedPaints];
      newPaints[editingIndex] = product;
      setSelectedPaints(newPaints);
      setEditingIndex(null);
    } else {
      switch (type) {
        case "paint":
          setSelectedPaints((prev) => [...prev, product]);
          break;
        case "wallpaper":
          setSelectedWallpaper(product);
          break;
        case "floor":
          setSelectedFloor(product);
          break;
        default:
          break;
      }
    }
  };

  const handleVariantSelect = (index, variant) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        selectedVariant: variant,
        selectedVariantValue: null,
      },
    }));
  };

  const handleVariantValueSelect = (index, variantValue) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        selectedVariantValue: variantValue,
      },
    }));
  };

  const handleEditProduct = (type, index) => {
    setEditingIndex(index);
    switch (type) {
      case "paint":
        setOpenPaintModal(true);
        break;
      case "wallpaper":
        setOpenWallpaperModal(true);
        break;
      case "floor":
        setOpenFloorModal(true);
        break;
      default:
        break;
    }
  };

  const handleRemoveProduct = (type, index) => {
    switch (type) {
      case "paint":
        setSelectedPaints((prev) => prev.filter((_, i) => i !== index));
        break;
      case "wallpaper":
        setSelectedWallpaper(null);
        break;
      case "floor":
        setSelectedFloor(null);
        break;
      default:
        break;
    }
  };

  const calculatePrice = (
    product,
    sizeName,
    price,
    type,
    uniqueKey,
    numberOfPiecesPerBox
  ) => {
    if (!product) return 0;

    let estimatedPrice = 0;
    switch (type) {
      case "floor": {
        const numbers = sizeName.split(" x ").map(Number);
        estimatedPrice =
          Math.ceil(
            floorArea / (numbers[0] * numbers[1]) / numberOfPiecesPerBox
          ) * price;
        break;
      }
      case "wallpaper": {
        const numbers = sizeName.split(" x ").map(Number);
        estimatedPrice =
          Math.ceil(wallArea / (numbers[0] * numbers[1])) * price;
        break;
      }
      case "paint": {
        const areaToUse = editableAreas[uniqueKey] || wallArea;
        const coverage = product.properties.find(
          (prop) => prop.property.name === "Coverage"
        )?.value;
        const layers = product.properties.find(
          (prop) => prop.property.name === "Layer"
        )?.value;

        let coverageAvailable = 0;
        let layersAvailable = 0;

        if (coverage) {
          coverageAvailable = Number(coverage);
        } else {
          coverageAvailable = 6;
        }

        if (layers) {
          layersAvailable = Number(layers);
        } else {
          layersAvailable = 2;
        }

        estimatedPrice =
          Math.ceil(
            ((Number(areaToUse) / coverageAvailable) * layersAvailable) /
              Number(sizeName)
          ) * price;

        break;
      }
      default:
        break;
    }

    return estimatedPrice;
  };

  const require = (
    product,
    sizeName,
    price,
    type,
    uniqueKey,
    numberOfPiecesPerBox
  ) => {
    if (!product) return 0;

    let require = 0;

    switch (type) {
      case "floor": {
        const numbers = sizeName.split(" x ").map(Number);
        require = Math.ceil(
          floorArea / (numbers[0] * numbers[1]) / numberOfPiecesPerBox
        ); // bao nhiêu hộp
        break;
      }
      case "wallpaper": {
        const numbers = sizeName.split(" x ").map(Number);
        require = Math.ceil(wallArea / (numbers[0] * numbers[1])); // bao nhiêu cuộn
        break;
      }
      case "paint": {
        const areaToUse = editableAreas[uniqueKey] || wallArea;
        const coverage = product.properties.find(
          (prop) => prop.property.name === "Coverage"
        )?.value;
        const layers = product.properties.find(
          (prop) => prop.property.name === "Layer"
        )?.value;

        let coverageAvailable = 0;
        let layersAvailable = 0;

        if (coverage) {
          coverageAvailable = Number(coverage);
        } else {
          coverageAvailable = 6;
        }

        if (layers) {
          layersAvailable = Number(layers);
        } else {
          layersAvailable = 2;
        }

        require = Math.ceil(
          (Number(areaToUse) / coverageAvailable) * layersAvailable
        ); // bao nhiêu lít sơn

        break;
      }
      default:
        break;
    }

    return require;
  };

  const totalEstimatedPrice = () => {
    const paintPrice =
      selectedVariants && Object.keys(selectedVariants).length > 0
        ? Object.values(selectedVariants).reduce((total, variant, index) => {
            const selectedVariant = variant.selectedVariantValue;
            if (selectedVariant) {
              const sizeName = selectedVariant.sizeName;
              const price = selectedVariant.price;
              const paint = selectedPaints[index];
              const uniqueKey = `${paint.productId}-${index}`;
              return (
                total +
                calculatePrice(paint, sizeName, price, "paint", uniqueKey)
              );
            }
            return total;
          }, 0)
        : 0;

    const wallpaperPrice = selectedWallpaperVariant
      ? calculatePrice(
          selectedWallpaper,
          selectedWallpaperVariant.sizeName,
          selectedWallpaperVariant.price,
          "wallpaper"
        )
      : 0;
    const floorPrice = selectedFloorValue
      ? calculatePrice(
          selectedFloor,
          selectedFloorValue.sizeName,
          selectedFloorValue.price,
          "floor",
          "",
          selectedFloorVariant.numberOfPiecesPerBox
        )
      : 0;

    return paintPrice + wallpaperPrice + floorPrice;
  };

  const handleCloseModal = (type) => {
    if (type === "paint") setOpenPaintModal(false);
    if (type === "wallpaper") setOpenWallpaperModal(false);
    if (type === "floor") setOpenFloorModal(false);
  };

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
      console.log(selectedWallpaper);
      console.log(selectedFloor);
      console.log(selectedPaints);
      const cartItems = [
        selectedWallpaper
          ? {
              productId: selectedWallpaper.productId,
              quantity: 1,
              variantId:
                selectedWallpaperVariant && selectedWallpaperVariant.variantId,
              wallpaperId:
                selectedWallpaper && selectedWallpaper.wallpapers[0].id,
            }
          : null,
        selectedFloor
          ? {
              productId: selectedFloor.productId,
              quantity: 1,
              variantId: selectedFloorValue && selectedFloorValue.variantId,
              floorId: selectedFloorVariant && selectedFloorVariant.id,
            }
          : null,
        ...(selectedPaints?.map((paint, i) => ({
          productId: paint.productId,
          quantity: 1,
          variantId:
            selectedVariants &&
            selectedVariants[i].selectedVariantValue.variantId,
          paintId: selectedVariants && selectedVariants[i].selectedVariant.id,
        })) || []),

        // {
        //   ...(selectedVariant.categoryName === 'Paint' && { variantId: selectedVariant.variantId }),
        //   ...(selectedVariant.categoryName === 'Wallpaper' && { variantId: selectedVariant.variantId }),
        //   ...(selectedVariant.categoryName === 'Floor' && { variantId: selectedVariant.variantId }),
        //   productId: product.productId,
        //   quantity: quantity,
        //   ...(selectedVariant.categoryName === 'Paint' && { paintId: selectedProduct.id }),
        //   ...(selectedVariant.categoryName === 'Wallpaper' && { wallpaperId: selectedProduct.id }),
        //   ...(selectedVariant.categoryName === 'Floor' && { floorId: selectedProduct.id }),
        // }
      ].filter(Boolean);
      console.log(cartItems);

      updateCart(cartId, customerId, status, updateQuantityType, cartItems);
      setShowAddToCartBtn(false);
    } else {
      toast.error("Please login to add to cart");
    }
  };

  const updateCart = useCallback(
    async (cartId, customerId, status, updateQuantityType, cartItems) => {
      const { response, err } = await cartApi.saveCart(
        cartId,
        customerId,
        status,
        updateQuantityType,
        cartItems
      );
      if (!response) {
        toast.error(err);
      } else {
        toast.success("Added to cart successfully");
      }
    },
    []
  );

  return (
    <Fragment>
      <Box sx={{ marginTop: { xs: "56px", md: "152px" } }}></Box>
      <Navigate></Navigate>
      <Container maxWidth="lg" className="py-2">
        <Box my={4}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ ...textConfigs.style.basicFont }}
          >
            {t("project.estimation")}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={9}>
              {/* Floor Dimensions */}
              <Box mb={2}>
                <Typography
                  variant="h6"
                  sx={{ ...textConfigs.style.basicFont }}
                >
                  {t("floor.dimensions")}
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      label="Length (m)"
                      variant="outlined"
                      type="number"
                      value={length}
                      onChange={handleChangeL}
                      fullWidth
                      margin="normal"
                      size="small"
                      sx={{
                        "& .MuiInputLabel-root": {
                          fontSize: "14px",
                        },
                      }}
                    />
                    {isNegativeL && (
                      <span
                        style={{
                          color: "red",
                          fontSize: "12px",
                          ...textConfigs.style.basicFont,
                        }}
                      >
                        {t("value.cannot.be.negative")}
                      </span>
                    )}
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      label={`${t("width")} (m)`}
                      variant="outlined"
                      type="number"
                      value={width}
                      onChange={handleChangeW}
                      fullWidth
                      margin="normal"
                      size="small"
                      sx={{
                        "& .MuiInputLabel-root": {
                          ...textConfigs.style.basicFont,
                        },
                      }}
                    />
                    {isNegativeW && (
                      <span
                        style={{
                          color: "red",
                          fontSize: "12px",
                          ...textConfigs.style.basicFont,
                        }}
                      >
                        {t("value.cannot.be.negative")}
                      </span>
                    )}
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography
                      variant="body2"
                      sx={{ ...textConfigs.style.basicFont }}
                    >
                      {t("floor.area")} (m²)
                    </Typography>
                    <TextField
                      variant="outlined"
                      value={floorArea}
                      fullWidth
                      margin="normal"
                      size="small"
                      disabled
                      sx={{
                        "& .Mui-disabled": {
                          color: "inherit",
                          WebkitTextFillColor: "unset",
                          cursor: "default",
                        },
                        "& .MuiInputLabel-root": {
                          ...textConfigs.style.basicFont,
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>

              {/* Wall Dimensions */}
              <Box mb={2}>
                <Typography
                  variant="h6"
                  sx={{ mb: 3, ...textConfigs.style.basicFont }}
                >
                  {t("wall.dimensions")}
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sx={{ paddingTop: "0px !important" }}>
                    <Box mb={2}>
                      <Grid container spacing={1} alignItems="start">
                        {walls.map((wall, index) => (
                          <Fragment key={index}>
                            <Grid item xs={6} sm={5}>
                              <TextField
                                label={`${t("length.of.wall")} ${
                                  index + 1
                                } (m)`}
                                variant="outlined"
                                type="number"
                                value={wall.length}
                                onChange={(e) =>
                                  handleWallChange(
                                    index,
                                    "length",
                                    e.target.value
                                  )
                                }
                                fullWidth
                                size="small"
                                sx={{
                                  "& .MuiInputLabel-root": {
                                    ...textConfigs.style.basicFont,
                                  },
                                }}
                              />
                              {wall.errors.length && (
                                <span
                                  style={{
                                    color: "red",
                                    fontSize: "12px",
                                    ...textConfigs.style.basicFont,
                                  }}
                                >
                                  {t("value.cannot.be.negative")}
                                </span>
                              )}
                            </Grid>
                            <Grid item xs={6} sm={5}>
                              <TextField
                                label={`${t("width.of.wall")} ${index + 1} (m)`}
                                variant="outlined"
                                type="number"
                                value={wall.width}
                                onChange={(e) =>
                                  handleWallChange(
                                    index,
                                    "width",
                                    e.target.value
                                  )
                                }
                                fullWidth
                                size="small"
                                sx={{
                                  "& .MuiInputLabel-root": {
                                    ...textConfigs.style.basicFont,
                                  },
                                }}
                              />
                              {wall.errors.width && (
                                <span
                                  style={{
                                    color: "red",
                                    fontSize: "12px",
                                    ...textConfigs.style.basicFont,
                                  }}
                                >
                                  {t("value.cannot.be.negative")}
                                </span>
                              )}
                            </Grid>
                            <Grid item xs={12} sm={2}>
                              <Button
                                variant="outlined"
                                color="error"
                                onClick={() => deleteWall(index)}
                                fullWidth
                                size="small"
                                sx={{
                                  marginTop: "8px",
                                  ...textConfigs.style.basicFont,
                                }}
                              >
                                {t("delete.wall")}
                              </Button>
                            </Grid>
                          </Fragment>
                        ))}
                      </Grid>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sm={5}
                    sx={{ paddingTop: "0px !important" }}
                  >
                    <Typography variant="body2" sx={{}}>
                      {t("wall.area")} (m²)
                    </Typography>
                    <TextField
                      variant="outlined"
                      value={wallArea}
                      fullWidth
                      margin="normal"
                      size="small"
                      disabled
                      sx={{
                        "& .Mui-disabled": {
                          color: "inherit",
                          WebkitTextFillColor: "unset",
                          cursor: "default",
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={6} sm={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={addWall}
                      fullWidth
                      size="small"
                      sx={{ marginTop: "8px", ...textConfigs.style.basicFont }}
                    >
                      {t("add.wall")}
                    </Button>
                  </Grid>
                </Grid>
              </Box>

              <Box
                mb={4}
                sx={{
                  boxShadow: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    backgroundColor: "#f8f9fb",
                    p: 1,
                    border: "1px solid #ccc",
                    ...textConfigs.style.basicFont,
                  }}
                >
                  {t("material.selection")}
                </Typography>

                {/* Paint Selection */}
                <Box
                  m={2}
                  display="flex"
                  flexDirection={{ xs: "column", md: "row" }}
                  alignItems="center"
                >
                  <Box sx={{ flex: 2, marginBottom: 1 }}>
                    <Typography
                      variant="body1"
                      sx={{ ...textConfigs.style.basicFont }}
                    >
                      {t("paints")}
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 10 }}>
                    {selectedPaints.length > 0 ? (
                      selectedPaints.map((paint, index) => {
                        const uniqueKey = `${paint.productId}-${index}`;
                        return (
                          <Card
                            key={index}
                            sx={{
                              display: "flex",
                              flexDirection: { md: "row" },
                              alignItems: "center",
                              width: "100%",
                              mb: 1,
                              px: 2,
                            }}
                          >
                            <Link
                              to={`/products/${paint.category.name}/${paint.category.categoryId}/${paint.productName}/${paint.productId}`}
                              state={{ productCal: paint, selectedProductCal: selectedVariants[index]?.selectedVariant || null, selectedVariantCal: selectedVariants[index]?.selectedVariantValue || null }}
                            >
                              <CardMedia
                                component="img"
                                sx={{
                                  height: { xs: 80, md: 100 },
                                  width: { xs: 80, md: 100 },
                                  objectFit: "cover",
                                }}
                                image={
                                  paint.images.length > 0 && paint.images[0].url
                                }
                                alt={paint.productName}
                              />
                            </Link>
                            <CardContent
                              sx={{
                                flex: 1,
                                paddingLeft: 2,
                                paddingTop: 1,
                                ":last-child": { paddingBottom: 0 },
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: { xs: "column", sm: "row" },
                                  alignItems: {
                                    xs: "flex-start",
                                    sm: "center",
                                  },
                                  justifyContent: "space-between",
                                  gap: { xs: 1.5, sm: 3 },
                                  marginY: 1,
                                }}
                              >
                                <Box>
                                  <Box>
                                    <Typography
                                      variant="h6"
                                      gutterBottom
                                      fontWeight="bold"
                                      sx={{
                                        fontSize: "14px",
                                        ...textConfigs.style.basicFont,
                                        textTransform: "capitalize",
                                      }}
                                    >
                                      {capitalizeWords(paint.productName)}
                                    </Typography>
                                  </Box>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      gap: 2,
                                      flexWrap: "wrap",
                                      marginY: 1,
                                    }}
                                  >
                                    {paint.paints.map(
                                      (variant, variantIndex) => (
                                        <Tooltip
                                          title={`${variant.color.name} (${variant.color.code})`}
                                          placement="top"
                                          arrow
                                          sx={{
                                            ...textConfigs.style.basicFont,
                                          }}
                                        >
                                          <Box
                                            key={variantIndex}
                                            sx={{
                                              position: "relative",
                                              display: "inline-block",
                                              cursor: "pointer",
                                            }}
                                            onClick={() =>
                                              handleVariantSelect(
                                                index,
                                                variant
                                              )
                                            }
                                            onMouseEnter={(e) =>
                                              (e.currentTarget.style.transform =
                                                "scale(1.1)")
                                            }
                                            onMouseLeave={(e) =>
                                              (e.currentTarget.style.transform =
                                                "scale(1)")
                                            }
                                          >
                                            <BsFillHexagonFill
                                              size={
                                                window.innerWidth < 600
                                                  ? 40
                                                  : 40
                                              }
                                              style={{
                                                color: variant.color.hex,
                                                filter:
                                                  "drop-shadow(0px 0px 4px #ccc)",
                                                transition:
                                                  "transform 0.2s ease-in-out",
                                              }}
                                            />
                                            {selectedVariants[index]
                                              ?.selectedVariant?.id ===
                                              variant.id && (
                                              <FaCheck
                                                style={{
                                                  position: "absolute",
                                                  top: "50%",
                                                  left: "50%",
                                                  transform:
                                                    "translate(-50%, -50%)",
                                                  color: "#fff",
                                                  fontSize:
                                                    window.innerWidth < 600
                                                      ? 20
                                                      : 20,
                                                }}
                                              />
                                            )}
                                          </Box>
                                        </Tooltip>
                                      )
                                    )}
                                  </Box>
                                  {selectedVariants[index]?.selectedVariant && (
                                    <>
                                      <Typography
                                        variant="body2"
                                        color="#000"
                                        sx={{
                                          marginTop: 2,
                                          ...textConfigs.style.basicFont,
                                        }}
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
                                        {selectedVariants[
                                          index
                                        ].selectedVariant.variants.map(
                                          (variantValue, variantValueIndex) => (
                                            <Box
                                              key={variantValueIndex}
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
                                                  selectedVariants[index]
                                                    ?.selectedVariantValue
                                                    ?.variantId ===
                                                  variantValue.variantId
                                                    ? "#f0f0f0"
                                                    : "#fff",
                                                width: "60px",
                                              }}
                                              onClick={() =>
                                                handleVariantValueSelect(
                                                  index,
                                                  variantValue
                                                )
                                              }
                                            >
                                              <Typography
                                                variant="body2"
                                                sx={{
                                                  ...textConfigs.style
                                                    .basicFont,
                                                }}
                                              >
                                                {variantValue.sizeName} L
                                              </Typography>
                                            </Box>
                                          )
                                        )}
                                      </Box>
                                    </>
                                  )}
                                </Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                  }}
                                >
                                  <IconButton
                                    onClick={() =>
                                      handleEditProduct("paint", index)
                                    }
                                  >
                                    <FaEdit
                                      style={{
                                        fontSize: "18px",
                                      }}
                                    />
                                  </IconButton>
                                  <IconButton
                                    onClick={() =>
                                      handleRemoveProduct("paint", index)
                                    }
                                  >
                                    <FaTrash
                                      style={{
                                        fontSize: "18px",
                                      }}
                                    />
                                  </IconButton>
                                </Box>
                              </Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: { xs: "column", sm: "row" },
                                  alignItems: {
                                    xs: "flex-start",
                                    sm: "center",
                                  },
                                  gap: { xs: 1.5, sm: 3 },
                                  marginY: 1,
                                }}
                              >
                                <TextField
                                  key={uniqueKey}
                                  label={`${t("wall.area")} (m²)`}
                                  variant="outlined"
                                  type="number"
                                  value={userInputValue[uniqueKey] || ""}
                                  placeholder={String(
                                    editableAreas[uniqueKey] || wallArea
                                  )}
                                  onChange={(e) =>
                                    handleEditableAreaChange(
                                      uniqueKey,
                                      e.target.value
                                    )
                                  }
                                  onBlur={() => handleInputBlur(uniqueKey)}
                                  size="small"
                                  sx={{
                                    width: { xs: "100%", sm: "50%" },
                                    "& .MuiInputLabel-root": {
                                      ...textConfigs.style.basicFont,
                                    },
                                  }}
                                  InputLabelProps={{ shrink: true }}
                                />
                                {errorState[uniqueKey] && (
                                  <span
                                    style={{ color: "red", fontSize: "12px" }}
                                  >
                                    {t("value.cannot.be.negative")}
                                  </span>
                                )}
                              </Box>
                              {selectedVariants[index]
                                ?.selectedVariantValue && (
                                <Stack
                                  direction="row"
                                  justifyContent="space-between"
                                  alignItems="flex-start"
                                  sx={{ width: "100%", mb: 1 }}
                                >
                                  <Typography
                                    sx={{
                                      fontSize: { xs: "14px", sm: "14px" },
                                      ...textConfigs.style.basicFont,
                                      fontWeight: "bold",
                                      color: "primary.main",
                                    }}
                                  >
                                    {t("your.need")}{" "}
                                    {require(paint, selectedVariants[index]
                                      .selectedVariantValue
                                      .sizeName, selectedVariants[index]
                                      .selectedVariantValue
                                      .price, "paint", uniqueKey)}{" "}
                                    L {t("of.paint.for")}{" "}
                                    {String(
                                      editableAreas[uniqueKey] || wallArea
                                    )}
                                    (m²)
                                  </Typography>

                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "column",
                                      gap: 0.5,
                                      textAlign: "right",
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        fontSize: { xs: "14px", sm: "14px" },
                                        ...textConfigs.style.basicFont,
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {t("price")}: $
                                      {selectedVariants[
                                        index
                                      ].selectedVariantValue.price.toFixed(2)}
                                    </Typography>
                                    <Typography
                                      sx={{
                                        fontSize: { xs: "14px", sm: "14px" },
                                        ...textConfigs.style.basicFont,
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {t("total")}: $
                                      {calculatePrice(
                                        paint,
                                        selectedVariants[index]
                                          .selectedVariantValue.sizeName,
                                        selectedVariants[index]
                                          .selectedVariantValue.price,
                                        "paint",
                                        uniqueKey
                                      ).toFixed(2)}
                                    </Typography>
                                  </Box>
                                </Stack>
                              )}
                            </CardContent>
                          </Card>
                        );
                      })
                    ) : (
                      <Button
                        variant="contained"
                        onClick={() => setOpenPaintModal(true)}
                        sx={{
                          width: "200px !important",
                          ...textConfigs.style.basicFont,
                        }}
                      >
                        {t("select.paint")}
                      </Button>
                    )}

                    {selectedPaints.length > 0 && (
                      <Button
                        variant="outlined"
                        onClick={() => setOpenPaintModal(true)}
                        sx={{ mt: 1, ...textConfigs.style.basicFont }}
                      >
                        {t("add.another.paint")}
                      </Button>
                    )}
                  </Box>
                </Box>

                {/* Wallpaper Selection */}
                <Box
                  mb={2}
                  mx={2}
                  display="flex"
                  flexDirection={{ xs: "column", md: "row" }}
                  alignItems="center"
                >
                  <Box sx={{ flex: 2, marginBottom: 1 }}>
                    <Typography
                      variant="body1"
                      sx={{ ...textConfigs.style.basicFont }}
                    >
                      {t("wallpaper")}
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 10 }}>
                    {selectedWallpaper ? (
                      <Card
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          width: "100%",
                          px: 2,
                        }}
                      >
                        <Link
                              to={`/products/${selectedWallpaper.category.name}/${selectedWallpaper.category.categoryId}/${selectedWallpaper.productName}/${selectedWallpaper.productId}`}
                              state={{ productCal: selectedWallpaper, selectedProductCal: selectedWallpaper.wallpapers[0] || null, selectedVariantCal: selectedWallpaperVariant || null }}
                            >
                        <CardMedia
                          component="img"
                          sx={{
                            height: { xs: 80, md: 100 },
                            width: { xs: 80, md: 100 },
                          }}
                          image={
                            selectedWallpaper.images.length > 0 &&
                            selectedWallpaper.images[0].url
                          }
                          alt={selectedWallpaper.productName}
                        />
                        </Link>
                        <CardContent
                          sx={{
                            flex: 1,
                            paddingLeft: 2,
                            paddingTop: 1,
                            ":last-child": { paddingBottom: 0 },
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: { xs: "column", sm: "row" },
                              alignItems: { xs: "flex-start", sm: "center" },
                              justifyContent: "space-between",
                              gap: { xs: 1.5, sm: 3 },
                              marginY: 1,
                            }}
                          >
                            <Box>
                              <Typography
                                variant="h6"
                                gutterBottom
                                fontWeight="bold"
                                sx={{
                                  fontSize: "14px",
                                  ...textConfigs.style.basicFont,
                                }}
                              >
                                {capitalizeWords(selectedWallpaper.productName)}
                              </Typography>

                              <Typography
                                sx={{
                                  fontSize: "14px",
                                  ...textConfigs.style.basicFont,
                                }}
                              >
                                {t("wall.area")}: {wallArea} m²
                              </Typography>

                              <Box sx={{ display: "flex", gap: 2 }}>
                                {selectedWallpaper.wallpapers[0].variants.map(
                                  (variant, variantIndex) => (
                                    <Box
                                      key={variantIndex}
                                      sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        padding: 1,
                                        border: "1px solid #ddd",
                                        borderRadius: "4px",
                                        marginY: 1,
                                        cursor: "pointer",
                                        backgroundColor:
                                          selectedWallpaperVariant?.variantId ===
                                          variant.variantId
                                            ? "#f0f0f0"
                                            : "#fff",
                                        width: "120px",
                                      }}
                                      onClick={() =>
                                        setSelectedWallpaperVariant(variant)
                                      }
                                    >
                                      <Typography
                                        variant="body2"
                                        sx={{ ...textConfigs.style.basicFont }}
                                      >
                                        {variant.sizeName} m
                                      </Typography>
                                    </Box>
                                  )
                                )}
                              </Box>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <IconButton
                                onClick={() => handleEditProduct("wallpaper")}
                              >
                                <FaEdit style={{ fontSize: "18px" }} />
                              </IconButton>
                              <IconButton
                                onClick={() => handleRemoveProduct("wallpaper")}
                              >
                                <FaTrash style={{ fontSize: "18px" }} />
                              </IconButton>
                            </Box>
                          </Box>
                          {selectedWallpaperVariant?.price && (
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              alignItems="flex-start"
                              sx={{ width: "100%", mb: 1 }}
                            >
                              <Typography
                                sx={{
                                  fontSize: { xs: "14px", sm: "14px" },
                                  ...textConfigs.style.basicFont,
                                  fontWeight: "bold",
                                  color: "primary.main",
                                }}
                              >
                                {t("your.need")}{" "}
                                {require(selectedWallpaperVariant, selectedWallpaperVariant.sizeName, selectedWallpaperVariant.price, "wallpaper")}{" "}
                                {t("roll")} {t("of.wallpaper.for")}{" "}
                                {String(wallArea)}
                                (m²)
                              </Typography>
                              <Box sx={{ textAlign: "right" }}>
                                <Typography
                                  sx={{
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    ...textConfigs.style.basicFont,
                                  }}
                                >
                                  {t("price")}: $
                                  {selectedWallpaperVariant.price.toFixed(2)}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    ...textConfigs.style.basicFont,
                                  }}
                                >
                                  {t("total")}: $
                                  {calculatePrice(
                                    selectedWallpaperVariant,
                                    selectedWallpaperVariant.sizeName,
                                    selectedWallpaperVariant.price,
                                    "wallpaper"
                                  ).toFixed(2)}
                                </Typography>
                              </Box>
                            </Stack>
                          )}
                        </CardContent>
                      </Card>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={() => setOpenWallpaperModal(true)}
                        sx={{
                          width: "200px !important",
                          ...textConfigs.style.basicFont,
                        }}
                      >
                        {t("select.wallpaper")}
                      </Button>
                    )}
                  </Box>
                </Box>

                {/* Floor Selection */}
                <Box
                  pb={2}
                  mx={2}
                  display="flex"
                  flexDirection={{ xs: "column", md: "row" }}
                  alignItems="center"
                >
                  <Box sx={{ flex: 2, marginBottom: 1 }}>
                    <Typography
                      variant="body1"
                      sx={{ ...textConfigs.style.basicFont }}
                    >
                      {t("floor")}
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 10 }}>
                    {selectedFloor ? (
                      <Card
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          width: "100%",
                          px: 2,
                        }}
                      >
                        <Link
                              to={`/products/${selectedFloor.category.name}/${selectedFloor.category.categoryId}/${selectedFloor.productName}/${selectedFloor.productId}`}
                              state={{ productCal: selectedFloor, selectedProductCal: selectedFloorVariant || null, selectedVariantCal: selectedFloorValue || null }}
                            >
                        <CardMedia
                          component="img"
                          sx={{
                            height: { xs: 80, md: 100 },
                            width: { xs: 80, md: 100 },
                          }}
                          image={
                            selectedFloor.images.length > 0 &&
                            selectedFloor.images[0].url
                          }
                          alt={selectedFloor.productName}
                        />
                        </Link>
                        <CardContent
                          sx={{
                            flex: 1,
                            paddingLeft: 2,
                            paddingTop: 1,
                            ":last-child": { paddingBottom: 0 },
                          }}
                        >
                          <Typography
                            variant="h6"
                            gutterBottom
                            fontWeight="bold"
                            style={{
                              fontSize: "14px",
                              ...textConfigs.style.basicFont,
                            }}
                          >
                            {capitalizeWords(selectedFloor.productName)}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: { xs: "column", sm: "row" },
                              alignItems: { xs: "flex-start", sm: "center" },
                              justifyContent: "space-between",
                              gap: { xs: 1.5, sm: 3 },
                              marginY: 1,
                            }}
                          >
                            <Box>
                              <Typography
                                style={{
                                  fontSize: "14px",
                                  ...textConfigs.style.basicFont,
                                }}
                              >
                                {t("floor.area")}: {floorArea} m²
                              </Typography>

                              <Box
                                sx={{
                                  display: "flex",
                                  gap: 1,
                                  flexWrap: "wrap",
                                }}
                              >
                                {selectedFloor.floors.map(
                                  (variant, variantIndex) => (
                                    <Box
                                      key={variantIndex}
                                      sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        padding: 1,
                                        border: "1px solid #ddd",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                        backgroundColor:
                                          selectedFloorVariant?.id ===
                                          variant.id
                                            ? "#f0f0f0"
                                            : "#fff",
                                        width: "100px",
                                      }}
                                      onClick={() => {
                                        setSelectedFloorVariant(variant);
                                        setSelectedFloorValue(variant[0]);
                                      }}
                                    >
                                      <Typography
                                        variant="body2"
                                        sx={{ ...textConfigs.style.basicFont }}
                                      >
                                        {variant.numberOfPiecesPerBox}{" "}
                                        {t("pieces")}
                                      </Typography>
                                    </Box>
                                  )
                                )}
                              </Box>
                              {selectedFloorVariant && (
                                <>
                                  <Typography
                                    mt={1}
                                    style={{
                                      fontSize: "14px",
                                      ...textConfigs.style.basicFont,
                                    }}
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
                                    {selectedFloorVariant.variants.map(
                                      (variant, index) => (
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
                                            cursor: "pointer",
                                            backgroundColor:
                                              selectedFloorValue?.variantId ===
                                              variant.variantId
                                                ? "#f0f0f0"
                                                : "#fff",
                                            width: "120px",
                                          }}
                                          onClick={() =>
                                            setSelectedFloorValue(variant)
                                          }
                                        >
                                          <Typography
                                            variant="body2"
                                            sx={{
                                              ...textConfigs.style.basicFont,
                                            }}
                                          >
                                            {variant.sizeName} m
                                          </Typography>
                                        </Box>
                                      )
                                    )}
                                  </Box>
                                </>
                              )}
                            </Box>
                            <Box>
                              <IconButton
                                onClick={() => handleEditProduct("floor")}
                              >
                                <FaEdit style={{ fontSize: "18px" }} />
                              </IconButton>
                              <IconButton
                                onClick={() => handleRemoveProduct("floor")}
                              >
                                <FaTrash style={{ fontSize: "18px" }} />
                              </IconButton>
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 3,
                              marginY: 1,
                            }}
                          >
                            {selectedFloorValue && (
                              <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="flex-start"
                                sx={{ width: "100%", mb: 1 }}
                              >
                                <Typography
                                  sx={{
                                    fontSize: { xs: "14px", sm: "14px" },
                                    ...textConfigs.style.basicFont,
                                    fontWeight: "bold",
                                    color: "primary.main",
                                  }}
                                >
                                  {t("your.need")}{" "}
                                  {require(selectedFloorValue, selectedFloorValue.sizeName, selectedFloorValue.price, "floor", "", selectedFloorVariant.numberOfPiecesPerBox)}{" "}
                                  {t("box")} {"("}
                                  {
                                    selectedFloorVariant.numberOfPiecesPerBox
                                  }{" "}
                                  {t("pieces")}
                                  {")"} {t("of.wallpaper.for")}{" "}
                                  {String(floorArea)}
                                  (m²)
                                </Typography>
                                <Box>
                                  <Typography
                                    style={{
                                      fontSize: "14px",
                                      fontWeight: "bold",
                                      ...textConfigs.style.basicFont,
                                    }}
                                  >
                                    {t("price")}: ${selectedFloorValue.price}
                                  </Typography>
                                  <Typography
                                    style={{
                                      fontSize: "14px",
                                      fontWeight: "bold",
                                      ...textConfigs.style.basicFont,
                                    }}
                                  >
                                    {t("total")}: ${" "}
                                    {calculatePrice(
                                      selectedFloorValue,
                                      selectedFloorValue.sizeName,
                                      selectedFloorValue.price,
                                      "floor",
                                      "",
                                      selectedFloorVariant.numberOfPiecesPerBox
                                    ).toFixed(2)}
                                  </Typography>
                                </Box>
                              </Stack>
                            )}
                          </Box>
                        </CardContent>
                      </Card>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={() => setOpenFloorModal(true)}
                        sx={{
                          width: "200px !important",
                          ...textConfigs.style.basicFont,
                        }}
                      >
                        {t("select.floor")}
                      </Button>
                    )}
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box ref={boxRef}></Box>
              <Box
                sx={{
                  position: {
                    xs: "relative",
                    md: isSticky ? "fixed" : "relative",
                  },
                  top: { xs: "0px", md: isSticky ? "50px" : "0px" },
                  width: { xs: "auto", md: isSticky ? "276px" : "auto" },
                  padding: 3,
                  borderRadius: 2,
                  border: "1px solid #ccc",
                  boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
                  backgroundColor: "#fff",
                  zIndex: 1000,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    ...textConfigs.style.basicFont,
                    fontWeight: "bold",
                    mb: 2,
                  }}
                >
                  {t("estimated.price")}
                </Typography>

                {selectedPaints.length > 0 ||
                selectedWallpaper ||
                selectedFloor ? (
                  <>
                    <Box
                      sx={{
                        backgroundColor: "#f5f5f5",
                        padding: 1,
                        borderRadius: 1,
                        mb: 2,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          ...textConfigs.style.basicFont,
                          fontWeight: "bold",
                        }}
                      >
                        {t("product.detail.note.price")}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{ ...textConfigs.style.basicFont }}
                      >
                        {i18n.language === "en"
                          ? `${t("paints")} ${t("price")}`
                          : `${t("price")} ${t("floor")}`}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ ...textConfigs.style.basicFont }}
                      >
                        $
                        {selectedVariants &&
                        Object.keys(selectedVariants).length > 0
                          ? Object.values(selectedVariants)
                              .reduce((total, variant, index) => {
                                const selectedVariant =
                                  variant.selectedVariantValue;
                                if (selectedVariant) {
                                  const sizeName = selectedVariant.sizeName;
                                  const price = selectedVariant.price;
                                  const paint = selectedPaints[index];
                                  const uniqueKey = `${paint.productId}-${index}`;
                                  return (
                                    total +
                                    calculatePrice(
                                      paint,
                                      sizeName,
                                      price,
                                      "paint",
                                      uniqueKey
                                    )
                                  );
                                }
                                return total;
                              }, 0)
                              .toFixed(2)
                          : (0).toFixed(2)}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{ ...textConfigs.style.basicFont }}
                      >
                        {i18n.language === "en"
                          ? `${t("wallpaper")} ${t("price")}`
                          : `${t("price")} ${t("wallpaper")}`}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ ...textConfigs.style.basicFont }}
                      >
                        $
                        {selectedWallpaperVariant
                          ? calculatePrice(
                              selectedWallpaper,
                              selectedWallpaperVariant.sizeName,
                              selectedWallpaperVariant.price,
                              "wallpaper"
                            ).toFixed(2)
                          : (0).toFixed(2)}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{ ...textConfigs.style.basicFont }}
                      >
                        {i18n.language === "en"
                          ? `${t("floor")} ${t("price")}`
                          : `${t("price")} ${t("floor")}`}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ ...textConfigs.style.basicFont }}
                      >
                        $
                        {selectedFloorValue
                          ? calculatePrice(
                              selectedFloor,
                              selectedFloorValue.sizeName,
                              selectedFloorValue.price,
                              "floor",
                              "",
                              selectedFloorVariant.numberOfPiecesPerBox
                            ).toFixed(2)
                          : (0).toFixed(2)}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 2,
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          ...textConfigs.style.basicFont,
                          fontWeight: "bold",
                        }}
                      >
                        {t("total")} {t("estimated.price")}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          ...textConfigs.style.basicFont,
                          fontWeight: "bold",
                        }}
                      >
                        ${totalEstimatedPrice().toFixed(2)}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: 2,
                      }}
                    >
                      {showAddToCartBtn === true ? (
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "#c11700",
                            padding: "8px",
                            width: "70%",
                            ":hover": { backgroundColor: "#1c2759" },
                            ...textConfigs.style.basicFont,
                            borderRadius: "50px",
                          }}
                          onClick={() => {
                            handleAddToCart();
                          }}
                        >
                          {t("add.to.cart")}
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "#c11700",
                            padding: "8px",
                            width: "70%",
                            ":hover": { backgroundColor: "#1c2759" },
                            ...textConfigs.style.basicFont,
                            borderRadius: "50px",
                          }}
                          component={Link}
                          to="/cart"
                        >
                          {t("go.to.checkout")}
                        </Button>
                      )}
                    </Box>
                  </>
                ) : (
                  <Typography variant="body1">{t("caculate.noti")}</Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <ProductModal
        open={openPaintModal}
        handleClose={() => handleCloseModal("paint")}
        products={paints}
        handleProductSelect={handleProductSelect}
        title={t("select.paint")}
        productType="paint"
        totalElements={totalPaints}
        totalPages={paintsTotalPages}
        size={productsPerPage}
        page={currentPaintPage}
        onPageChange={(newPage) => handlePageChange("paint", newPage)}
      />

      <ProductModal
        open={openWallpaperModal}
        handleClose={() => handleCloseModal("wallpaper")}
        products={wallpapers}
        handleProductSelect={handleProductSelect}
        title={t("select.wallpaper")}
        productType="wallpaper"
        totalElements={totalWallpaper}
        totalPages={wallpapersTotalPages}
        size={productsPerPage}
        page={currentWallpaperPage}
        onPageChange={(newPage) => handlePageChange("wallpaper", newPage)}
      />

      <ProductModal
        open={openFloorModal}
        handleClose={() => handleCloseModal("floor")}
        products={floors}
        handleProductSelect={handleProductSelect}
        title={t("select.floor")}
        productType="floor"
        totalElements={totalFloor}
        totalPages={floorsTotalPages}
        size={productsPerPage}
        page={currentFloorPage}
        onPageChange={(newPage) => handlePageChange("floor", newPage)}
      />
    </Fragment>
  );
};

export default CalculatePrice;
