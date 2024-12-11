import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Typography,
  Grid,
  IconButton,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  lighten,
  TextField,
  Stack,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import MuiAlert from "@mui/material/Alert";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import colorsApi from "../api/modules/color.api";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import textConfigs from "../config/text.config";
import backgroundConfigs from "../config/background.config";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ColorManagementPage = () => {
  const [colorFamilies, setColorFamilies] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [currentCollection, setCurrentCollection] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [independentCollections, setIndependentCollections] = useState([]);
  const [hoveredColorId, setHoveredColorId] = useState(null);

  const handleAccordionChange = (familyId) => (event, isExpanded) => {
    setExpanded(isExpanded ? familyId : false);
  };

  const dispatch = useDispatch();
  const fetchColors = async () => {
    try {
      const { response } = await colorsApi.getAllColors(0, 20000);
      if (response) {
        setAvailableColors(response.data.colors.content);
      }
    } catch (error) {
      toast.error("An error occurred while fetching colors.");
    }
  };

  const fetchColorFamilies = async () => {
    try {
      const { response } = await colorsApi.getColorFamily();
      if (response) {
        setColorFamilies(response.data.colorFalimies);
      }
    } catch (error) {
      toast.error("An error occurred while fetching color families.");
    }
  };
  const fetchIndependentCollections = async () => {
    try {
      const { response } = await colorsApi.getIndependentCollections();
      if (response) {
        setIndependentCollections(response.data.collections);
      }
    } catch (error) {
      toast.error("An error occurred while fetching independent collections.");
    }
  };
  useEffect(() => {
    fetchColors();
    fetchColorFamilies();
    fetchIndependentCollections();
  }, [dispatch]);

  const handleOpenDialog = (collectionId) => {
    setCurrentCollection(collectionId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleColorSelection = (color) => {
    setSelectedColors((prevSelectedColors) => {
      const isSelected = prevSelectedColors.some(
        (selectedColor) => selectedColor.id === color.id
      );
      if (isSelected) {
        return prevSelectedColors.filter(
          (selectedColor) => selectedColor.id !== color.id
        );
      }
      return [...prevSelectedColors, color];
    });
  };

  const handleAddColorsToCollection = () => {
    if (!currentCollection || selectedColors.length === 0) {
      setSnackbarMessage("Please select at least one color!");
      setOpenSnackbar(true);
      return;
    }

    const updatedCollections = independentCollections.map((collection) => {
      if (collection.id === currentCollection) {
        selectedColors.forEach((color) => {
          const exists = collection.colors.some((c) => c.id === color.id);
          if (!exists) collection.colors.push(color);
        });
      }
      return collection;
    });
    setIndependentCollections(updatedCollections);
    const updatedColorFamilies = colorFamilies.map((family) => {
      family.collections = family.collections.map((collection) => {
        if (collection.id === currentCollection) {
          selectedColors.forEach((color) => {
            const exists = collection.colors.some((c) => c.id === color.id);
            if (!exists) collection.colors.push(color);
          });
        }
        return collection;
      });
      return family;
    });

    setColorFamilies(updatedColorFamilies);

    setSelectedColors([]);
    setOpenDialog(false);
    setSnackbarMessage("Colors added to the collection successfully!");
    setOpenSnackbar(true);
  };

  const handleRemoveIndependentColor = (collectionId, colorId) => {
    const updatedCollections = independentCollections.map((collection) => {
      if (collection.id === collectionId) {
        collection.colors = collection.colors.filter(
          (color) => color.id !== colorId
        );
      }
      return collection;
    });
    setIndependentCollections(updatedCollections);
  };

  const filteredColors = availableColors.filter(
    (color) =>
      color.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      color.hex.toLowerCase().includes(searchTerm.toLowerCase()) ||
      color.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRemoveColor = (colorFamilyId, collectionId, colorId) => {
    const updatedColorFamilies = colorFamilies.map((family) => {
      if (family.id === colorFamilyId) {
        family.collections = family.collections.map((collection) => {
          if (collection.id === collectionId) {
            collection.colors = collection.colors.filter(
              (color) => color.id !== colorId
            );
          }
          return collection;
        });
      }
      return family;
    });
    setColorFamilies(updatedColorFamilies);
  };

  const handleUpdateIndependentCollections = async () => {
    
    try {
      const transformedDataIndependentCollections = independentCollections
        .map((collection) => ({
          collectionId: collection.id || null,
          colors: collection.colors.map((color) => color.id),
        }))
        .flat();

      const { response, err } = await colorsApi.updateColorToCollection(
        transformedDataIndependentCollections
      );

      if (response) {
        fetchIndependentCollections();
        toast.success("Update success.");
      }
      if (err && err.code === 401) {
        toast.error("No access permission.");
      }
      if (err && (err.code === 400 || err.code === 404)) {
        toast.error("Not found collection");
      }
      if (err && err.code === 500) {
        toast.error("Server error.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error while update.");
    }
  };

  const handleUpdateCollectionsToColorFamily = async () => {
    try {
      const transformedDataColorFamilies = colorFamilies
        .map((colorFamily) =>
          colorFamily.collections.map((collection) => ({
            collectionId: collection.id || null,
            colors: collection.colors.map((color) => color.id),
          }))
        )
        .flat();
        console.log(transformedDataColorFamilies);
        
      const { response, err } = await colorsApi.updateColorToCollection(transformedDataColorFamilies);

      if (response) {
        fetchColorFamilies();
        toast.success("Update success.");
      }
      if (err && err.code === 401) {
        toast.error("No access permission.");
      }
      if (err && (err.code === 400 || err.code === 404)) {
        toast.error("Not found collection");
      }
      if (err && err.code === 500) {
        toast.error("Server error.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error while update.");
    }
  };

  return (
    <Box>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            ...textConfigs.style.basicFont,
          }}
        >
          Color Management
        </Typography>
        <Button
          sx={{
            color: "white",
            ...backgroundConfigs.style.backgroundPrimary,
            "&:hover": {
              ...backgroundConfigs.style.backgroundSecondary,
            },
          }}
          startIcon={<FaPlus />}
          component={Link}
          to="/create-color"
        >
          Create Color
        </Button>
      </Stack>

      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h5" gutterBottom mt={5} mb={2}>
          Color Family
        </Typography>
        <Button
          onClick={() => {
            console.log("Button clicked - IndependentCollections");
            handleUpdateCollectionsToColorFamily();
          }}
          variant="contained"
          sx={{ mt: 1, textTransform: "none" }}
        >
          Update Color to Color Family
        </Button>
      </Box>
      {colorFamilies.map((family) => (
        <Accordion
          key={family.id}
          expanded={expanded === family.id}
          onChange={handleAccordionChange(family.id)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: family.hex, // Áp dụng màu nền
              "&:hover": {
                backgroundColor: lighten(family.hex, 0.1), // Thay đổi màu nền khi hover nếu cần
              },
            }}
          >
            <Typography variant="h6">{family.title}</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography variant="body2" gutterBottom>
              {family.description}
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {family.collections.map((collection) => (
                <Box key={collection.id} sx={{ flex: "1 1 calc(50% - 16px)" }}>
                  <Typography variant="h6">{collection.name}</Typography>

                  <Grid container spacing={2} mb={1}>
                    {collection.colors.map((color) => (
                      <Grid item xs={12} md={2.4} key={color.id}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column", // Chuyển hướng hiển thị sang dọc
                            alignItems: "center", // Căn các phần tử bắt đầu từ trái
                            gap: 1,
                            padding: 1,
                            borderRadius: "8px",
                            backgroundColor: color.hex,
                            color: "#fff",
                          }}
                        >
                          <Typography variant="body2">{color.name}</Typography>
                          <Typography variant="body2">{color.hex}</Typography>
                          <Typography variant="body2">{color.code}</Typography>
                          <IconButton
                            onClick={() =>
                              handleRemoveColor(
                                family.id,
                                collection.id,
                                color.id
                              )
                            }
                            size="small"
                            sx={{ color: "#fff" }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                  <Button
                    onClick={() => handleOpenDialog(collection.id)}
                    sx={{ textTransform: "none" }}
                  >
                    Add Color to Collection
                  </Button>
                </Box>
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}

      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h5" gutterBottom mt={5} mb={2}>
          Independent Collections
        </Typography>
        <Button
          onClick={() => {
            console.log("Button clicked - IndependentCollections");
            handleUpdateIndependentCollections();
          }}
          variant="contained"
          sx={{ mt: 1, textTransform: "none" }}
        >
          Update Color to Independent Collections
        </Button>
      </Box>

      <Grid container spacing={2}>
        {independentCollections.map((collection) => (
          <Grid item xs={12} md={4} key={collection.id}>
            <Box
              sx={{
                padding: 2,
                border: "1px solid #ccc",
                borderRadius: 2,
                boxShadow: 2,
              }}
            >
              <Typography variant="h6">{collection.name}</Typography>
              <Grid
                container
                spacing={1}
                sx={{
                  maxHeight: 410,
                  overflowY: "auto",
                  "::-webkit-scrollbar": {
                    display: "none",
                  },
                  scrollbarWidth: "none",
                }}
              >
                {collection.colors.map((color) => (
                  <Grid item xs={6} key={color.id}>
                    <Box
                      sx={{
                        padding: 1,
                        backgroundColor: color.hex,
                        borderRadius: 1,
                        color: "#fff",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {color.name}
                      <IconButton
                        onClick={() =>
                          handleRemoveIndependentColor(collection.id, color.id)
                        }
                        size="small"
                        sx={{ color: "#fff" }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <Button
                onClick={() => handleOpenDialog(collection.id)}
                fullWidth
                variant="contained"
                sx={{ mt: 1, textTransform: "none" }}
              >
                Manage Colors
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Popup for Available Colors */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="lg"
        sx={{
          "& .MuiDialogContent-root": {
            "::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
          },
        }}
      >
        {/* Dialog Title */}
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6">Select Colors</Typography>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search by name, hex, or code"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: "40%" }}
            />
          </Box>
        </DialogTitle>

        <DialogContent>
          {/* Hiển thị thông tin màu đã chọn */}
          <Box
            sx={{
              mb: 2,
              padding: 1,
              borderRadius: 2,
              backgroundColor: "#f0f0f0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body1">
              Selected Colors: {selectedColors.length}
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexWrap: "wrap",
              }}
            >
              {selectedColors.map((color, i) => (
                <Box
                  key={i}
                  sx={{
                    position: "relative",
                    width: "20px",
                    height: "20px",
                    backgroundColor: color.hex,
                    borderRadius: "50%",
                    border: "1px solid #000",
                  }}
                  onMouseEnter={() => setHoveredColorId(color.id)} // Lưu id của màu đang hover
                  onMouseLeave={() => setHoveredColorId(null)} // Reset state khi rời chuột
                >
                  {hoveredColorId === color.id && ( // Chỉ hiển thị thông tin khi trùng id
                    <Box
                      sx={{
                        position: "absolute",
                        width: "150px",
                        top: "100%",
                        left: "50%",
                        transform: "translate(-50%, 4px)",
                        padding: "4px",
                        backgroundColor: "#fff",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                        borderRadius: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        zIndex: 10,
                        fontSize: "12px",
                        color: "#333",
                      }}
                    >
                      <Typography variant="body2">{color.name}</Typography>
                      <Typography variant="body2">{color.code}</Typography>
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          </Box>

          {/* Hiển thị danh sách màu */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              justifyContent: "center",
            }}
          >
            {filteredColors.map((color) => (
              <Box
                key={color.id}
                sx={{
                  width: "10%",
                  display: "flex",
                  marginRight: "20px",
                  marginBottom: "20px",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                  padding: 1,
                  borderRadius: "8px",
                  backgroundColor: color.hex,
                  color: "#fff",

                  boxShadow: selectedColors.some(
                    (selectedColor) => selectedColor.id === color.id
                  )
                    ? "0 0 10px 4px #adb0b4"
                    : "none",
                  transform: selectedColors.some(
                    (selectedColor) => selectedColor.id === color.id
                  )
                    ? "scale(1.1)"
                    : "scale(1)",
                }}
                onClick={() => handleColorSelection(color)}
              >
                <Typography variant="body2">{color.name}</Typography>
                <Typography variant="body2">{color.hex}</Typography>
                <Typography variant="body2">{color.code}</Typography>
              </Box>
            ))}
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ textTransform: "none" }}>
            Cancel
          </Button>
          <Button
            onClick={handleAddColorsToCollection}
            sx={{ textTransform: "none" }}
          >
            Add Selected Colors
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <MuiAlert severity="success">{snackbarMessage}</MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default ColorManagementPage;
