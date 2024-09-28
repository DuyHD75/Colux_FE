import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  Container,
  Box,
  TextField,
  Typography,
  Button,
  Modal,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
} from "@mui/material";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import ProductModal from "../components/commons/ProductModel";
import { FaEdit, FaTrash } from "react-icons/fa";
import Navigate from "../components/commons/Navigate";

const CalculatePrice = () => {
  const products = useSelector((state) => state.products.products);
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [walls, setWalls] = useState([
    { length: "", width: "" },
    { length: "", width: "" },
    { length: "", width: "" },
    { length: "", width: "" },
  ]);
  const [selectedPaint, setSelectedPaint] = useState(null);
  const [selectedPaints, setSelectedPaints] = useState([]);
  const [selectedWallpaper, setSelectedWallpaper] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [openPaintModal, setOpenPaintModal] = useState(false);
  const [openWallpaperModal, setOpenWallpaperModal] = useState(false);
  const [openFloorModal, setOpenFloorModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const [isSticky, setIsSticky] = useState(false);
  const boxRef = useRef(null);

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

  const handleWallChange = (index, field, value) => {
    const newWalls = [...walls];
    newWalls[index][field] = value;
    setWalls(newWalls);
  };

  const floorArea = length && width ? length * width : 0;
  const wallArea = walls.reduce(
    (total, wall) => total + Number(wall.length) * Number(wall.width),
    0
  );

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

  const calculatePrice = (product, type) => {
    if (!product) return 0;

    let estimatedPrice = 0;

    switch (type) {
      case "floor":
        estimatedPrice = Math.ceil(floorArea / product.size) * product.price;
        break;
      case "wallpaper":
        estimatedPrice = Math.ceil(wallArea / product.size) * product.price;
        break;
      case "paint":
        estimatedPrice =
          (wallArea * product.coverage * product.layers) / product.volume;
        break;
      default:
        break;
    }

    return estimatedPrice;
  };

  const totalEstimatedPrice = () => {
    console.log(selectedPaints);

    const paintPrice = selectedPaints.reduce((total, paint) => {
      return total + calculatePrice(paint, "paint");
    }, 0);
    const wallpaperPrice = calculatePrice(selectedWallpaper, "wallpaper");
    const floorPrice = calculatePrice(selectedFloor, "floor");
    return paintPrice + wallpaperPrice + floorPrice;
  };

  const handleOpenModal = (type) => {
    if (type === "paint") setOpenPaintModal(true);
    if (type === "wallpaper") setOpenWallpaperModal(true);
    if (type === "floor") setOpenFloorModal(true);
  };

  const handleCloseModal = (type) => {
    if (type === "paint") setOpenPaintModal(false);
    if (type === "wallpaper") setOpenWallpaperModal(false);
    if (type === "floor") setOpenFloorModal(false);
  };

  return (
    <Fragment>
      <Box sx={{ marginTop: { xs: "56px", md: "96px" } }}></Box>
      <Navigate></Navigate>
      <Container maxWidth="lg" className="py-2">
        <Box my={4}>
          <Typography variant="h4" gutterBottom>
            Project Estimation
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={9}>
              {/* Home Dimensions */}
              <Box mb={4}>
                <Typography variant="h6">Home Dimensions</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="Length (m)"
                      variant="outlined"
                      type="number"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      fullWidth
                      margin="normal"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="Width (m)"
                      variant="outlined"
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      fullWidth
                      margin="normal"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="Floor Area (m²)"
                      variant="outlined"
                      value={floorArea}
                      InputProps={{ readOnly: true }}
                      fullWidth
                      margin="normal"
                      size="small"
                    />
                  </Grid>
                </Grid>
              </Box>

              {/* Wall Dimensions */}
              <Box mb={4}>
                <Typography variant="h6">Wall Dimensions</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sx={{ paddingTop: "0px !important" }}>
                    <Box mb={2}>
                      <Grid container spacing={2}>
                        {walls.map((wall, index) => (
                          <Fragment key={index}>
                            <Grid item xs={6} sm={3}>
                              <TextField
                                label={`Length of Wall ${index + 1} (m)`}
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
                                margin="normal"
                                size="small"
                              />
                            </Grid>
                            <Grid item xs={6} sm={3}>
                              <TextField
                                label={`Width of Wall ${index + 1} (m)`}
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
                                margin="normal"
                                size="small"
                              />
                            </Grid>
                          </Fragment>
                        ))}
                      </Grid>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sm={3}
                    sx={{ paddingTop: "0px !important" }}
                  >
                    <TextField
                      label="Wall Area (m²)"
                      variant="outlined"
                      value={wallArea}
                      InputProps={{ readOnly: true }}
                      fullWidth
                      margin="normal"
                      size="small"
                    />
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
                  }}
                >
                  Material Selection
                </Typography>

                {/* Paint Selection */}
                <Box
                  m={2}
                  display="flex"
                  flexDirection={{ xs: "column", md: "row" }}
                  alignItems="center"
                >
                  <Box sx={{ flex: 2 }}>
                    <Typography variant="body1">Paints</Typography>
                  </Box>
                  <Box sx={{ flex: 10 }}>
                    {selectedPaints.length > 0 ? (
                      selectedPaints.map((paint, index) => (
                        <Card
                          key={index}
                          sx={{
                            display: "flex",
                            flexDirection: {md: "row" }, // Column cho mobile, row cho desktop
                            alignItems: "center",
                            width: "100%",
                            p: 1,
                            mb: 1,
                          }}
                        >
                          <CardMedia
                            component="img"
                            sx={{
                              height: { xs: 80, md: 100 }, // Kích thước ảnh nhỏ hơn trên mobile
                              width: { xs: 80, md: 100 }, // Chiếm toàn bộ chiều rộng trên mobile
                              objectFit: "cover", // Giữ tỷ lệ ảnh
                            }}
                            image={paint.image}
                            alt={paint.name}
                          />
                          <CardContent sx={{ flex: 1 }}>
                            <Typography variant="h6" gutterBottom>
                              {paint.name}
                            </Typography>
                            <Typography>Price: ${paint.price}</Typography>
                            <Typography>Area: {wallArea} m²</Typography>
                            <Typography>
                              Total: ${" "}
                              {calculatePrice(paint, "paint").toFixed(2)}
                            </Typography>
                            <Box
                            sx={{
                              display: "flex",
                              flexDirection: { xs: "row", md: "row" },
                              alignItems: "center"
                            }}
                          >
                            <IconButton
                              onClick={() => handleEditProduct("paint", index)}
                              sx={{ mb: { xs: 0, md: 1 } }} // Thêm margin cho mobile
                            >
                              <FaEdit />
                            </IconButton>
                            <IconButton
                              onClick={() =>
                                handleRemoveProduct("paint", index)
                              }
                            >
                              <FaTrash />
                            </IconButton>
                          </Box>
                          </CardContent>
                          
                        </Card>
                      ))
                    ) : (
                      <Button
                        variant="contained"
                        onClick={() => setOpenPaintModal(true)}
                        sx={{ width: "200px !important" }}
                      >
                        Select Paint
                      </Button>
                    )}

                    {selectedPaints.length > 0 && (
                      <Button
                        variant="outlined"
                        onClick={() => setOpenPaintModal(true)}
                        sx={{ mt: 2 }}
                      >
                        Add Another Paint
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
                  <Box sx={{ flex: 2 }}>
                    <Typography variant="body1">Wallpaper</Typography>
                  </Box>
                  <Box sx={{ flex: 10 }}>
                    {selectedWallpaper ? (
                      <Card
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          width: "100%",
                          p: 1,
                        }}
                      >
                        <CardMedia
                          component="img"
                          sx={{
                            height: 100,
                            width: 100,
                          }}
                          image={selectedWallpaper.image}
                          alt={selectedWallpaper.name}
                        />
                        <CardContent sx={{ flex: 1 }}>
                          <Typography variant="h6" gutterBottom>
                            {selectedWallpaper.name}
                          </Typography>
                          <Typography>
                            Price: ${selectedWallpaper.price}
                          </Typography>
                          <Typography>Area: {wallArea} m²</Typography>
                          <Typography>
                            Total: ${" "}
                            {calculatePrice(
                              selectedWallpaper,
                              "wallpaper"
                            ).toFixed(2)}
                          </Typography>
                        </CardContent>
                        <Box>
                          <IconButton
                            onClick={() => handleEditProduct("wallpaper")}
                          >
                            <FaEdit />
                          </IconButton>
                          <IconButton
                            onClick={() => handleRemoveProduct("wallpaper")}
                          >
                            <FaTrash />
                          </IconButton>
                        </Box>
                      </Card>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={() => setOpenWallpaperModal(true)}
                        sx={{ width: "200px !important" }}
                      >
                        Select Wallpaper
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
                  <Box sx={{ flex: 2 }}>
                    <Typography variant="body1">Floor</Typography>
                  </Box>
                  <Box sx={{ flex: 10 }}>
                    {selectedFloor ? (
                      <Card
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          width: "100%",
                          p: 1,
                        }}
                      >
                        <CardMedia
                          component="img"
                          sx={{
                            height: 100,
                            width: 100,
                          }}
                          image={selectedFloor.image}
                          alt={selectedFloor.name}
                        />
                        <CardContent sx={{ flex: 1 }}>
                          <Typography variant="h6" gutterBottom>
                            {selectedFloor.name} - ${selectedFloor.price}
                          </Typography>
                          <Typography>Price: ${selectedFloor.price}</Typography>
                          <Typography>Area: {floorArea} m²</Typography>
                          <Typography>
                            Total: ${" "}
                            {calculatePrice(selectedFloor, "floor").toFixed(2)}
                          </Typography>
                        </CardContent>
                        <Box>
                          <IconButton
                            onClick={() => handleEditProduct("floor")}
                          >
                            <FaEdit />
                          </IconButton>
                          <IconButton
                            onClick={() => handleRemoveProduct("floor")}
                          >
                            <FaTrash />
                          </IconButton>
                        </Box>
                      </Card>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={() => setOpenFloorModal(true)}
                        sx={{ width: "200px !important" }}
                      >
                        Select Floor
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
                  }, // Relative trên mobile, fixed trên desktop nếu isSticky
                  top: { xs: "0px", md: isSticky ? "50px" : "0px" }, // Top điều chỉnh theo trạng thái isSticky
                  width: { xs: "auto", md: isSticky ? "20%" : "auto" }, // Đảm bảo kích thước phù hợp
                  padding: 2,
                  border: "1px solid #ccc",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#fff",
                  zIndex: 1000,
                }}
              >
                <Typography variant="h6">Estimated Price</Typography>

                {selectedPaints.length > 0 ||
                selectedWallpaper ||
                selectedFloor ? (
                  <>
                    <Typography variant="body1">
                      Paint Price: $
                      {selectedPaints
                        .reduce((total, paint) => {
                          return total + calculatePrice(paint, "paint");
                        }, 0)
                        .toFixed(2)}
                    </Typography>
                    <Typography variant="body1">
                      Wallpaper Price: $
                      {calculatePrice(selectedWallpaper, "wallpaper").toFixed(
                        2
                      )}
                    </Typography>
                    <Typography variant="body1">
                      Floor Price: $
                      {calculatePrice(selectedFloor, "floor").toFixed(2)}
                    </Typography>
                    <Typography variant="body1">
                      Total Estimated Price: ${totalEstimatedPrice().toFixed(2)}
                    </Typography>
                  </>
                ) : (
                  <Typography variant="body1">
                    Please select a product to calculate price.
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <ProductModal
        open={openPaintModal}
        handleClose={() => handleCloseModal("paint")}
        products={products}
        handleProductSelect={handleProductSelect}
        title="Select Paint"
        productType="paint"
      />

      <ProductModal
        open={openWallpaperModal}
        handleClose={() => handleCloseModal("wallpaper")}
        products={products}
        handleProductSelect={handleProductSelect}
        title="Select Wallpaper"
        productType="wallpaper"
      />

      <ProductModal
        open={openFloorModal}
        handleClose={() => handleCloseModal("floor")}
        products={products}
        handleProductSelect={handleProductSelect}
        title="Select Floor"
        productType="floor"
      />
    </Fragment>
  );
};

export default CalculatePrice;
