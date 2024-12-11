import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  Select,
  MenuItem,
  Autocomplete,
  Chip,
} from "@mui/material";
import * as XLSX from "xlsx";
import CloseIcon from "@mui/icons-material/Close";
import AImageUploader from "../components/common/AImageUploader";
import { FaPlus } from "react-icons/fa";
import backgroundConfigs from "../config/background.config";
import colorsApi from "../api/modules/color.api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const initialColorFamilies = [
  {
    id: "1",
    name: "Red",
    image:
      "https://firebasestorage.googleapis.com/v0/b/colux-alpha-storage.appspot.com/o/color-family%2Fred.jpg?alt=media&token=573265f6-f46e-407d-8c23-ad47b0ddf3db",
    title: "Red Paint Colors",
    description: "Red paint colors can add ruddy farmhouse charm...",
    hex: "#c3585c",
  },
  {
    id: "2",
    name: "Blue",
    image:
      "https://firebasestorage.googleapis.com/v0/b/colux-alpha-storage.appspot.com/o/color-family%2Fred.jpg?alt=media&token=573265f6-f46e-407d-8c23-ad47b0ddf3db",
    title: "Red Paint Colors",
    description: "Red paint colors can add ruddy farmhouse charm...",
    hex: "#c3585c",
  },
];

const initialColors = [
  {
    id: "1",
    name: "Calypso Berry",
    image:
      "https://firebasestorage.googleapis.com/v0/b/colux-alpha-storage.appspot.com/o/colors%2Fcalypso-berry.jpg?alt=media&token=443825e2-a992-421e-bdd3-97fe9ea3ede0",
    code: "PPG1185-7",
    LRV: "15",
    interior: true,
    exterior: true,
    hex: "#c43a4a",
    description: "Calypso Berry is a dark, pure, candy apple red...",
  },
  {
    id: "2",
    name: "Cranberry Splash",
    image:
      "https://firebasestorage.googleapis.com/v0/b/colux-alpha-storage.appspot.com/o/colors%2Fcranberry-splash.jpg?alt=media&token=d5af50d9-09d2-4386-b598-1eb101726e03",
    code: "PPG1185-6",
    LRV: "22",
    interior: true,
    exterior: false,
    hex: "#da5266",
    description: "Cranberry Splash is a deep, pure, candy apple pink...",
  },
];

const CreatePage = () => {
  const [colorFamilies, setColorFamilies] = useState([]);
  const [colors, setColors] = useState([]);
  const [newColorFamily, setNewColorFamily] = useState({
    name: "",
    title: "",
    description: "",
    image: "",
    hex: "",
  });
  const [newCollection, setNewCollection] = useState({
    name: "",
    title: "",
    description: "",
    image: "",
    hex: "",
    colors: [],
  });
  const [imageUrl, setImageUrl] = useState();

  const [colorsUpload, setColorsUpload] = useState([]); // State lưu màu sắc đọc từ file Excel
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();
  const fetchColors = async () => {
    try {
      const { response } = await colorsApi.getAllColors(0, 20000);
      if (response) {
        setColors(response.data.colors.content);
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

  useEffect(() => {
    fetchColors();
    fetchColorFamilies();
  }, [dispatch]);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;
    setFile(uploadedFile);
    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      // Lấy dữ liệu từ sheet đầu tiên
      const firstSheet = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheet];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const formattedData = jsonData.map((row) => ({
        name: row["Color Name"],
        image: row["Image"],
        code: row["Color Code"],
        LRV: String(row["LRV"]), // Chuyển LRV thành chuỗi
        interior: row["Interior"],
        exterior: row["Exterior"],
        hex: row["hexCode"],
        description: row["Description"],
      }));
      console.log(jsonData);
      console.log(formattedData); // Kiểm tra dữ liệu đọc được từ file
      setColorsUpload(formattedData); // Lưu dữ liệu màu sắc vào state
    };
    reader.readAsArrayBuffer(uploadedFile);
  };

  const handleSaveExcel = async () => {
    if (colorsUpload) {
      const { response, err } = await colorsApi.createColors(colorsUpload);
      if (response) {
        fetchColors();
        toast.success("Create colors success.");
        setFile(null);
        setColorsUpload([]);
      }
      if (err && err.code === 401) {
        toast.error("No access permission.");
      }
      if (err && err.code === 500) {
        toast.error("Server error.");
      }
    }
  };

  // Handlers for creating new items
  const handleColorFamilyChange = (key, value) => {
    setNewColorFamily({ ...newColorFamily, [key]: value });
  };
  const handleCollectionChange = (key, value) => {
    setNewCollection({ ...newCollection, [key]: value });
  };
  useEffect(() => {
    if(imageUrl) {
      setNewColorFamily({ ...newColorFamily, image: imageUrl });
      setNewCollection({ ...newCollection, image: imageUrl });
    } else {
      setNewColorFamily({ ...newColorFamily, image: "" });
      setNewCollection({ ...newCollection, image: "" });
    }
  }, [imageUrl]);

  const saveNewColorFamily = async () => {
    console.log(newColorFamily);
    const { response, err } = await colorsApi.createColorFamily(newColorFamily);
    if (response) {
      fetchColorFamilies();
      toast.success("Create color family success.");
      setNewColorFamily({
        name: "",
        title: "",
        description: "",
        image: "",
        hex: "",
      });
    }
    if (err && err.code === 401) {
      toast.error("No access permission.");
    }
    if (err && err.code === 500) {
      toast.error("Server error.");
    }
    
  };
 

  const saveNewCollection = async () => {

    console.log([newCollection]);
    const { response, err } = await colorsApi.createCollection([newCollection]);
    if (response) {
      toast.success("Create collection success.");
      setNewCollection({
        name: "",
        title: "",
        description: "",
        image: "",
        hex: "",
        colors: [],
      });
    }
    if (err && err.code === 401) {
      toast.error("No access permission.");
    }
    if (err && err.code === 500) {
      toast.error("Server error.");
    }
    
  };

  const handleRemoveUrl = () => {
    setImageUrl(null);
  };
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box display="flex" alignItems="center">
      <IconButton onClick={handleBack} color="inherit">
            <ArrowBack />
          </IconButton>
      <Typography variant="h5" gutterBottom sx={{ m: 0 }}>
        New Colors, Families, and Collections
      </Typography></Box>
      {/* Create New Color */}
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Create New Color
      </Typography>
      <Box sx={{ p: 4 }}>
        <Grid container spacing={2}>
          {/* Input Upload File */}
          <Grid item xs={12} md={6}>
            <Box
              display="flex"
              justifyContent="end"
              alignItems="center"
              gap={2}
            >
              {file && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span>{file.name}</span>
                </div>
              )}
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
                style={{ display: "none" }} // Ẩn input file đi
                id="file-input"
              />
              <label htmlFor="file-input">
                <Button
                  variant="outlined"
                  component="span"
                  sx={{
                    color: "white",
                    ...backgroundConfigs.style.backgroundPrimary,
                    "&:hover": {
                      ...backgroundConfigs.style.backgroundSecondary,
                    },
                  }}
                  startIcon={<FaPlus />}
                >
                  Upload File
                </Button>
              </label>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveExcel}
              disabled={!file}
            >
              Save colors
            </Button>
          </Grid>
          {/* Hiển thị dữ liệu màu sắc đọc được */}
          {colorsUpload.length > 0 && (
            <Grid item xs={12} sx={{ mt: 4 }}>
              <Typography variant="h5">Colors from Excel</Typography>
              <Grid container spacing={2} sx={{ marginTop: 2 }}>
                {colorsUpload.map((color, index) => (
                  <Grid item xs={4} md={1} key={index}>
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        paddingBottom: "100%", // Make the box square
                        backgroundColor: color.hex,
                        borderRadius: 1,
                        boxShadow: 2,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        "&:hover": {
                          "&::before": {
                            content: `"${color.name} (${color.hex})"`,
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            color: "white",
                            fontSize: 14,
                            fontWeight: "bold",
                            textAlign: "center",
                            backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: Add a dark background behind the text
                            padding: "5px",
                            borderRadius: "5px",
                          },
                        },
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}
        </Grid>
      </Box>
      {/* Create New Color Family */}
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
              There are no images please upload new image.
            </Typography>
          </Grid>
        )}
      </Grid>
      <Grid item xs={12}>
        <AImageUploader handleUpload={setImageUrl} />
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            Create New Color Family
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Name"
                value={newColorFamily.name}
                onChange={(e) =>
                  handleColorFamilyChange("name", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Title"
                value={newColorFamily.title}
                onChange={(e) =>
                  handleColorFamilyChange("title", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Hex Code"
                value={newColorFamily.hex}
                onChange={(e) => handleColorFamilyChange("hex", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                value={newColorFamily.description}
                onChange={(e) =>
                  handleColorFamilyChange("description", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={saveNewColorFamily}
              >
                Save Color Family
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            Create New Collection
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Collection Name"
                value={newCollection.name}
                onChange={(e) => handleCollectionChange("name", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Collection Title"
                value={newCollection.title}
                onChange={(e) =>
                  handleCollectionChange("title", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Hex Code"
                value={newCollection.hex}
                onChange={(e) => handleCollectionChange("hex", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                value={newCollection.description}
                onChange={(e) =>
                  handleCollectionChange("description", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Select Colors
              </Typography>
              <Autocomplete
                multiple
                id="color-select"
                options={colors}
                getOptionLabel={(color) => color.name}
                value={colors.filter((color) =>
                  newCollection.colors.includes(color.id)
                )}
                onChange={(event, selectedColors) => {
                  const newColors = selectedColors.map((color) => color.id);
                  handleCollectionChange("colors", newColors);
                }}
                disableCloseOnSelect // Prevent the dropdown from closing after selecting an item
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Select Colors"
                    placeholder="Choose colors"
                  />
                )}
                renderOption={(props, option) => (
                  <li
                    {...props}
                    key={option.id}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        backgroundColor: option.hex, // Set the background color of the option
                        marginRight: 10,
                        borderRadius: "50%", // Optional: makes the color preview circular
                      }}
                    />
                    {option.name}
                  </li>
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      {...getTagProps({ index })}
                      key={option.id}
                      label={option.name}
                      onDelete={() => {
                        const updatedColors = value.filter(
                          (color) => color.id !== option.id
                        );
                        handleCollectionChange(
                          "colors",
                          updatedColors.map((color) => color.id)
                        );
                      }}
                      style={{
                        backgroundColor: option.hex, // Set the background color for the chip
                        color: "white", // Set text color to white to contrast with the color
                        margin: 2, // Optional: adds spacing between chips
                      }}
                    />
                  ))
                }
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Select Color Family
              </Typography>
              <Select
                fullWidth
                value={newCollection.colorFamilyId || ""} // Giá trị mặc định nếu không chọn
                onChange={(e) =>
                  handleCollectionChange("colorFamilyId", e.target.value)
                }
                displayEmpty
              >
                <MenuItem value="">
                  <em>No Color Family</em>
                </MenuItem>
                {colorFamilies.map((family) => (
                  <MenuItem key={family.id} value={family.id}>
                    {family.title} {`(${family.name})`}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={saveNewCollection}
              >
                Save Collection
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreatePage;
