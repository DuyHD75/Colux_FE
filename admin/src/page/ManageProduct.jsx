import {
  Box,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import textConfig from "../config/text.config";
import backgroundConfig from "../config/background.config";
import { FaPlus } from "react-icons/fa6";
import { DataGrid } from "@mui/x-data-grid";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import customScrollbarStyle from "../config/scrollbar.config";
import { Delete as DeleteIcon } from "@mui/icons-material";
import ImageComponent from "../components/common/ImageComponent";
import ImageUploader from "../components/common/ImageUploader";
import productsApi from "../api/modules/product.api";
import colorsApi from "../api/modules/color.api";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import textConfigs from "../config/text.config";

// const variantAvailable = [
//   {
//     variantId: "f114789b-ace9-4b9a-991d-1e08bc7ebc93",
//     sizeName: "15",
//     categoryName: "Paint",
//     packageType: "Barrel",
//   },
//   {
//     variantId: "ef2066d0-4d11-4d49-8d6a-e4b10bf51c87",
//     sizeName: "8",
//     categoryName: "Paint",
//     packageType: "Barrel",
//   },
//   {
//     variantId: "a074a079-6b9a-4399-be4c-6abf78f357e1",
//     sizeName: "5",
//     categoryName: "Paint",
//     packageType: "Barrel",
//   },
//   {
//     variantId: "ecb02819-3717-4fa5-ab78-52adb2528f08",
//     sizeName: "12",
//     categoryName: "Paint",
//     packageType: "Barrel",
//   },
// ];

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [variantAvailable, setVariants] = useState([]);

  const [availableFeatures, setAvailableFeatures] = useState([]);
  const [availableProperties, setAvailableProperties] = useState([]);

  const [avatarUrl, setAvatarUrl] = useState([]);
  const [editRow, setEditRow] = useState(null);
  const [openFeature, setOpenFeature] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [openProperties, setOpenProperties] = useState(false);
  const [selectedProperties, setSelectedProperties] = useState([]);

  const [openAddColorDialog, setOpenAddColorDialog] = useState(false);
  const [selectedColors, setSelectedColors] = useState([]);

  const [currentColorsPage, setCurrentColorsPage] = useState(1);
  const colorsPerPage = 20;
  const [colorsTotalPages, setColorsTotalPages] = useState(0);
  const [totalColors, setTotalColors] = useState(0);

  const [selectedVariantId, setSelectedVariantId] = useState("");
  const [newVariant, setNewVariant] = useState({ quantity: 1, price: 0 });
  const [newFloor, setNewFloor] = useState({
    foamThickness: 0,
    numberOfPiecesPerBox: 0,
    status: 0,
    variants: [],
    id: null,
  });
  const [showAddVariantRow, setShowAddVariantRow] = useState(null);
  const [showAddFloorRow, setShowAddFloorRow] = useState(false);
  const [filteredVariants, setFilteredVariants] = useState([]);

  const handleAddColorDialogOpen = () => {
    setOpenAddColorDialog(true);
  };

  const handleAddColorDialogClose = () => {
    setOpenAddColorDialog(false);
  };

  const handleAddVariantRowToggle = (id) => {
    if (id !== null) {
      setShowAddVariantRow((prev) => (prev === id ? null : id));
    }
  };

  const handleSaveVariantPaint = (id, paintId) => {

    if (!selectedVariantId) {
      alert("Please select a variant.");
      return;
    }
    if (!newVariant.quantity) {
      alert("Please enter quantity.");
      return;
    }
    if (!newVariant.price) {
      alert("Please enter price.");
      return;
    }

    const updatedPaints = editRow.paints.map((paint) => {
      if (
        (id === null && paint.paintId === paintId) ||
        (id !== null && paint.id === id)
      ) {
        const existingVariantIndex = paint.variants.findIndex(
          (variant) => variant.variantId === selectedVariantId
        );

        if (existingVariantIndex !== -1) {
          // Update quantity and price if variant already exists
          paint.variants[existingVariantIndex].quantity =
            Number(paint.variants[existingVariantIndex].quantity) +
            Number(newVariant.quantity);
          paint.variants[existingVariantIndex].price = Number(newVariant.price);
        } else {
          // Add new variant if it doesn’t exist
          const selectedVariant = variantAvailable.find(
            (variant) => variant.variantId === selectedVariantId
          );
          paint.variants.push({
            ...selectedVariant,
            quantity: Number(newVariant.quantity),
            price: Number(newVariant.price),
          });
        }
      }
      return paint;
    });

    setEditRow({ ...editRow, paints: updatedPaints });
    setShowAddVariantRow(null);
    setNewVariant({ quantity: 1, price: 0 });
    setSelectedVariantId("");
  };

  const handleSaveVariantFloor = (floorId) => {
    if (!selectedVariantId) {
      alert("Please select a variant.");
      return;
    }
    if (!newVariant.quantity) {
      alert("Please enter quantity.");
      return;
    }
    if (!newVariant.price) {
      alert("Please enter price.");
      return;
    }

    const updateFloors = editRow.floors.map((floor) => {
      if (floor.id === floorId) {
        const existingVariantIndex = floor.variants.findIndex(
          (variant) => variant.variantId === selectedVariantId
        );

        if (existingVariantIndex !== -1) {
          // Update quantity and price if variant already exists
          floor.variants[existingVariantIndex].quantity =
            Number(floor.variants[existingVariantIndex].quantity) +
            Number(newVariant.quantity);
          floor.variants[existingVariantIndex].price = Number(newVariant.price);
        } else {
          // Add new variant if it doesn’t exist
          const selectedVariant = variantAvailable.find(
            (variant) => variant.variantId === selectedVariantId
          );
          floor.variants.push({
            ...selectedVariant,
            quantity: Number(newVariant.quantity),
            price: Number(newVariant.price),
          });
        }
      }
      return floor;
    });

    setEditRow({ ...editRow, floors: updateFloors });
    setShowAddVariantRow(null);
    setNewVariant({ quantity: 1, price: 0 });
    setSelectedVariantId("");
  };

  const handleSaveVariantWallpaper = (wallpaperId) => {
    if (!selectedVariantId) {
      alert("Please select a variant.");
      return;
    }
    if (!newVariant.quantity) {
      alert("Please enter quantity.");
      return;
    }
    if (!newVariant.price) {
      alert("Please enter price.");
      return;
    }

    if (wallpaperId) {
      const updateWallpapers = editRow.wallpapers.map((wallpaper) => {
        if (wallpaper.id === wallpaperId) {
          const existingVariantIndex = wallpaper.variants.findIndex(
            (variant) => variant.variantId === selectedVariantId
          );

          if (existingVariantIndex !== -1) {
            // Update quantity and price if variant already exists
            wallpaper.variants[existingVariantIndex].quantity =
              Number(wallpaper.variants[existingVariantIndex].quantity) +
              Number(newVariant.quantity);
            wallpaper.variants[existingVariantIndex].price = Number(
              newVariant.price
            );
          } else {
            // Add new variant if it doesn’t exist
            const selectedVariant = variantAvailable.find(
              (variant) => variant.variantId === selectedVariantId
            );
            wallpaper.variants.push({
              ...selectedVariant,
              quantity: Number(newVariant.quantity),
              price: Number(newVariant.price),
            });
          }
        }
        return wallpaper;
      });

      setEditRow({ ...editRow, wallpapers: updateWallpapers });
      setShowAddVariantRow(null);
      setNewVariant({ quantity: 1, price: 0 });
      setSelectedVariantId("");
    } else {
      const wallpaperToAdd = [
        {
          status: 0,
          variants: [],
          id: null,
        },
      ];
      const selectedVariant = variantAvailable.find(
        (variant) => variant.variantId === selectedVariantId
      );
      wallpaperToAdd[0].variants.push({
        ...selectedVariant,
        quantity: Number(newVariant.quantity),
        price: Number(newVariant.price),
      });

      setEditRow((prevEditRow) => ({
        ...prevEditRow,
        wallpapers: wallpaperToAdd,
      }));
      setShowAddVariantRow(null);
      setNewVariant({ quantity: 1, price: 0 });
      setSelectedVariantId("");
    }
  };

  const handleDeleteVariant = (id, variantId, paintId) => {
    const updatedPaints = editRow.paints.map((paint) => {
      if (
        (id === null && paint.paintId === paintId) ||
        (id !== null && paint.id === id)
      ) {
        return {
          ...paint,
          variants: paint.variants.filter(
            (variant) => variant.variantId !== variantId
          ),
        };
      }
      return paint;
    });

    setEditRow({ ...editRow, paints: updatedPaints });
  };

  const handleColorSelection = (colorId) => {
    setSelectedColors(
      (prevSelected) =>
        prevSelected.includes(colorId)
          ? prevSelected.filter((id) => id !== colorId) // Remove if already selected
          : [...prevSelected, colorId] // Add if not selected
    );
  };

  const handleAddColorsToProduct = () => {
    if (editRow.paints) {
      const paintsToAdd = selectedColors
        .map((colorId) => {
          const color = colors.find((c) => c.id === colorId);
          if (!editRow.paints.some((p) => p.color.id === colorId)) {
            return {
              color: {
                name: color.name,
                code: color.code,
                hex: color.hex,
                interior: color.interior,
                exterior: color.exterior,
                colorTypeId: 0,
                id: color.id,
              },
              status: 0,
              variants: [],
              id: null,
              paintId: `${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
            };
          } else {
            alert(`Color ${color.name} is already added.`);
            return null;
          }
        })
        .filter(Boolean);

      setEditRow((prevEditRow) => ({
        ...prevEditRow,
        paints: [...prevEditRow.paints, ...paintsToAdd],
      }));
      setOpenAddColorDialog(false);
      setSelectedColors([]);
    } else {
      const paintsToAdd = selectedColors.map((colorId) => {
        const color = colors.find((c) => c.id === colorId);
        return {
          color: {
            name: color.name,
            code: color.code,
            hex: color.hex,
            interior: color.interior,
            exterior: color.exterior,
            colorTypeId: 0,
            id: color.id,
          },
          status: 0,
          variants: [],
          id: null,
          paintId: `${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
        };
      });

      setEditRow((prevEditRow) => ({
        ...prevEditRow,
        paints: paintsToAdd,
      }));
      setOpenAddColorDialog(false);
      setSelectedColors([]);
    }
  };

  const handleDeletePaint = (paintId) => {
    setEditRow((prevEditRow) => ({
      ...prevEditRow,
      paints: prevEditRow.paints.filter((paint) => paint.color.id !== paintId),
    }));
  };

  const handleAddFloorRowToggle = () => {
    setShowAddFloorRow(!showAddFloorRow);
  };

  const handleAddFloor = (newFloor) => {
    if (editRow.floors) {
      const updatedFloor = {
        foamThickness: Number(newFloor.foamThickness),
        numberOfPiecesPerBox: Number(newFloor.numberOfPiecesPerBox),
        status: newFloor.status,
        variants: [],
        id: newFloor.id,
      };

      setEditRow((prevEditRow) => ({
        ...prevEditRow,
        floors: [...prevEditRow.floors, updatedFloor],
      }));

      setShowAddFloorRow(false);
      setNewFloor({
        foamThickness: 0,
        numberOfPiecesPerBox: 0,
        status: 0,
        variants: [],
        id: null,
      });
    } else {
      const floorsToAdd = [
        {
          foamThickness: Number(newFloor.foamThickness),
          numberOfPiecesPerBox: Number(newFloor.numberOfPiecesPerBox),
          status: newFloor.status,
          variants: [],
          id: null,
          floorId: `${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
        },
      ];

      setEditRow((prevEditRow) => ({
        ...prevEditRow,
        floors: floorsToAdd,
      }));
      setShowAddFloorRow(false);
      setNewFloor({
        foamThickness: 0,
        numberOfPiecesPerBox: 0,
        status: 0,
        variants: [],
        id: null,
      });
    }
  };

  // Hàm để xóa một tầng
  const handleDeleteFloor = (floorId) => {
    setEditRow((prevEditRow) => ({
      ...prevEditRow,
      floors: prevEditRow.floors.filter(
        (floor) => floor.id !== floorId && floor.floorId !== floorId
      ),
    }));
  };

  const getAllProduct = async () => {
    try {
      const { response, err } = await productsApi.getAllProduct();
      if (response) {
        setProducts([...response.data.products]);
      } else if (err) {
        toast.error(err);
      }
    } catch (error) {
      console.log("Error", error);
      toast.error("An error occurred while fetching products.");
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    getAllProduct();
  }, [dispatch]);

  useEffect(() => {
    const getAllcategory = async () => {
      try {
        const { response, err } = await productsApi.getAllCategory();
        if (response) {
          setCategories([...response.data.categories]);
        } else if (err) {
          toast.error(err);
        }
      } catch (error) {
        console.log("Error", error);
        toast.error("An error occurred while fetching categories.");
      }
    };
    getAllcategory();
  }, [dispatch]);

  useEffect(() => {
    const getAllColors = async () => {
      try {
        const { response, err } = await colorsApi.getAllColors(
          currentColorsPage - 1,
          colorsPerPage
        );
        if (response) {
          setColors(response.data.colors.content);
          setColorsTotalPages(response.data.colors.totalPages);
          setTotalColors(response.data.colors.totalElements);
        } else if (err) {
          toast.error(err);
        }
      } catch (error) {
        console.log("Error", error);
        toast.error("An error occurred while fetching categories.");
      }
    };
    getAllColors();
  }, [dispatch, currentColorsPage]);

  useEffect(() => {
    const getAllBrands = async () => {
      try {
        const { response, err } = await productsApi.getAllBrands();
        if (response) {
          setBrands([...response.data.brands]);
        } else if (err) {
          toast.error(err);
        }
      } catch (error) {
        console.log("Error", error);
        toast.error("An error occurred while fetching brands.");
      }
    };
    getAllBrands();
  }, [dispatch]);

  useEffect(() => {
    const getAllVariants = async () => {
      try {
        const { response, err } = await productsApi.getAllVariants();
        if (response) {
          setVariants([...response.data.variants]);
        } else if (err) {
          toast.error(err);
        }
      } catch (error) {
        console.log("Error", error);
        toast.error("An error occurred while fetching brands.");
      }
    };
    getAllVariants();
  }, [dispatch]);

  useEffect(() => {
    const getAllFeatures = async () => {
      try {
        const { response, err } = await productsApi.getAllFeatures();
        if (response) {
          setAvailableFeatures([...response.data.features]);
        } else if (err) {
          toast.error(err);
        }
      } catch (error) {
        console.log("Error", error);
        toast.error("An error occurred while fetching feature.");
      }
    };
    getAllFeatures();
  }, [dispatch]);

  useEffect(() => {
    const getAllProperties = async () => {
      try {
        const { response, err } = await productsApi.getAllProperties();
        if (response) {
          setAvailableProperties([...response.data.properties]);
        } else if (err) {
          toast.error(err);
        }
      } catch (error) {
        console.log("Error", error);
        toast.error("An error occurred while fetching property.");
      }
    };
    getAllProperties();
  }, [dispatch]);

  const [rows, setRows] = useState(products);

  useEffect(() => {
    setRows(products);
  }, [products]);

  useEffect(() => {
    if (editRow) {
      setEditRow((prev) => {
        const updatedImages = [];

        if (avatarUrl && avatarUrl.length > 0) {
          const newImages = avatarUrl.map((url) => ({
            imageId: null,
            url: url,
          }));

          updatedImages.push(...newImages);
        }

        return { ...prev, images: updatedImages };
      });
    } 
  }, [avatarUrl]);

  useEffect(() => {
    if (!editRow) {
      setFilteredVariants(variantAvailable);
      return;
    }

    const filtered = variantAvailable.filter((variant) => {
      if (editRow?.category?.name === variant.categoryName) {
        return true;
      }
      return false;
    });

    setFilteredVariants(filtered);
  }, [editRow, variantAvailable]);

  const handleAddClickFeature = () => {
    setOpenFeature(true);
  };

  const handleCloseFeature = () => {
    setOpenFeature(false);
    setSelectedFeatures([]);
  };

  const handleAddClickProperties = () => {
    setOpenProperties(true);
  };

  const handleCloseProperties = () => {
    setOpenProperties(false);
    setSelectedProperties([]);
  };

  const handleFeatureChange = (featureId, value, featureValueId) => {
    const featureIndex = selectedFeatures.findIndex(
      (f) => f.featureId === featureId
    );
    if (featureIndex > -1) {
      // Update existing feature value
      const updatedFeatures = [...selectedFeatures];
      updatedFeatures[featureIndex].value = value;
      updatedFeatures[featureIndex].id = featureValueId;
      setSelectedFeatures(updatedFeatures);
    } else {
      // Add new feature with selected value
      setSelectedFeatures([
        ...selectedFeatures,
        { featureId, value, featureValueId },
      ]);
    }
  };

  const handleAddFeatures = () => {
    const newFeatures = selectedFeatures.map((feature) => ({
      feature: availableFeatures.find((f) => f.featureId === feature.featureId),
      value: feature.value,
      featureValueId: feature.featureValueId,
    }));

    setEditRow((prev) => {
      const updatedFeatures = [...prev.features];

      // Kiểm tra và cập nhật hoặc thêm các feature mới
      newFeatures.forEach((newFeature) => {
        const existingIndex = updatedFeatures.findIndex(
          (f) => f.feature.featureId === newFeature.feature.featureId
        );

        if (existingIndex !== -1) {
          // Nếu feature đã tồn tại, chỉ cập nhật giá trị
          updatedFeatures[existingIndex].value = newFeature.value;
          updatedFeatures[existingIndex].id = newFeature.featureValueId;
        } else {
          // Nếu feature chưa tồn tại, thêm vào danh sách
          updatedFeatures.push(newFeature);
        }
      });

      return { ...prev, features: updatedFeatures };
    });

    handleCloseFeature();
  };

  const handlePropertiesChange = (propertyId, value, propertyValueId) => {
    const propertyIndex = selectedProperties.findIndex(
      (p) => p.propertyId === propertyId
    );
    if (propertyIndex > -1) {
      // Update existing feature value
      const updatedProperties = [...selectedProperties];
      updatedProperties[propertyIndex].value = value;
      updatedProperties[propertyIndex].id = propertyValueId;
      setSelectedProperties(updatedProperties);
    } else {
      // Add new feature with selected value
      setSelectedProperties([
        ...selectedProperties,
        { propertyId, value, propertyValueId },
      ]);
    }
  };

  const handleAddProperties = () => {

    const newProperties = selectedProperties.map((property) => ({
      property: availableProperties.find(
        (p) => p.propertyId === property.propertyId
      ),
      value: property.value,
      propertyValueId: property.propertyValueId,
    }));

    setEditRow((prev) => {
      const updatedProperties = [...prev.properties];

      // Kiểm tra và cập nhật hoặc thêm các property mới
      newProperties.forEach((newProperty) => {
        const existingIndex = updatedProperties.findIndex((p) => {
          return p.property.propertyId === newProperty.property.propertyId;
        });

        if (existingIndex !== -1) {
          // Nếu property đã tồn tại, chỉ cập nhật giá trị
          updatedProperties[existingIndex].value = newProperty.value;
          updatedProperties[existingIndex].id = newProperty.propertyValueId;
        } else {
          // Nếu property chưa tồn tại, thêm vào danh sách
          updatedProperties.push(newProperty);
        }
      });

      return { ...prev, properties: updatedProperties };
    });

    handleCloseProperties();
  };


  const ban = (productId) => {
    setRows(
      rows.map((row) =>
        row.productId === productId
          ? { ...row, status: row.status === "Banned" ? "Active" : "Banned" }
          : row
      )
    );
  };

  const handleEditClick = (row) => {
    setEditRow(row);
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;

    if (name === "category") {
      const selectedCategory = categories.find(
        (category) => category.categoryId === value
      );
      setEditRow({
        ...editRow,
        category: selectedCategory || null,
      });
    } else if (name === "brand") {
      const selectedBrand = brands.find((brand) => brand.brandId === value);
      setEditRow({
        ...editRow,
        brand: selectedBrand || null,
      });
    } else {
      setEditRow({
        ...editRow,
        [name]: value,
      });
    }
  };

  const handleDeleteImage = (index) => {
    setEditRow((prevState) => {
      const newImages = [...prevState.images];
      newImages.splice(index, 1);
      return { ...prevState, images: newImages };
    });
  };

  const handleEditSave = async () => {
    const { response, err } = await productsApi.updateProduct(editRow);
    if (response) {
      getAllProduct();
      toast.success(response.message);
    } else {
      console.log(err);
      toast.error("Error while update product" + err);
    }
  };

  const handleEditCancel = () => {
    setEditRow(null);
  };

  const handleChangePage = (event, newPage) => {
    setCurrentColorsPage(newPage + 1);
  };

  const columns = [
    { field: "productId", headerName: "ID", width: 350 },
    { field: "code", headerName: "Product Code", width: 140 },
    {
      field: "productName",
      headerName: "Name",
      width: 350,
      renderCell: (params) => (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="start"
          width="100%"
          height="100%"
          py="5px"
        >
          <ImageComponent
            src={params.row.images.length > 0 ? params.row.images[0].url : ""}
            width={40}
            height={40}
            style={{ objectFit: "cover", borderRadius: "4px" }}
          />

          <Typography
            sx={{
              ...textConfig.style.basicFont,
              fontSize: "14px",
              ml: "5px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              maxWidth: "200px",
            }}
          >
            {params.value}
          </Typography>
        </Box>
      ),
    },

    {
      field: "category",
      headerName: "Category",
      width: 90,
      renderCell: (params) => {
        let category = params.row.category.name;

        return (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="start"
            width="100%"
            height="100%"
          >
            <Typography
              sx={{
                ...textConfig.style.basicFont,
                fontSize: "14px",
              }}
            >
              {category}
            </Typography>
          </Box>
        );
      },
    },
    { field: "placeOfOrigin", headerName: "Place Of Origin", width: 150 },
    { field: "warranty", headerName: "Warranty", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          height="100%"
        >
          <Button
            variant="contained"
            sx={{ ...backgroundConfig.style.backgroundPrimary }}
            onClick={() => handleEditClick(params.row)}
          >
            <CiEdit />
          </Button>
          {/* <Button
            variant="contained"
            onClick={() => ban(params.productId)}
            sx={{ ...backgroundConfig.style.backgroundPrimary }}
          >
            <FaBan />
          </Button> */}
        </Box>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <Stack
      direction="row"
      spacing={1}
      my={1}
      marginLeft={"280px"}
      marginRight={"40px"}
    >
      {/* <SlideBar></SlideBar> */}
      <Box
        sx={{
          width: { xs: "100%", md: "100%" },
          justifyContent: "end",
          border: "1px solid #ccc",
          borderRadius: "12px",
          padding: "2rem",
        }}
      >
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <Typography
            sx={{
              ...textConfig.style.headerText,
              fontSize: "1.5rem",
            }}
          >
            Manage Product
          </Typography>
          <Button
            sx={{
              color: "white",
              ...backgroundConfig.style.backgroundPrimary,
              "&:hover": {
                ...backgroundConfig.style.backgroundSecondary,
              },
            }}
            startIcon={<FaPlus />}
            component={Link}
            to="/add-product"
          >
            New Product
          </Button>
        </Stack>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          sx={{
            width: "40%",
            mb: "1rem",
          }}
        />
        <Paper
          sx={{
            height: 600,
            width: "100%",
            overflowX: "auto",
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[2]}
            checkboxSelection
            getRowId={(row) => row.productId}
            sx={{
              ...textConfig.style.basicFont,
              "& .MuiDataGrid-root": {
                fontSize: "14px",
              },
            }}
          />
        </Paper>
        <Dialog
          maxWidth="lg"
          fullWidth
          open={!!editRow}
          onClose={handleEditCancel}
        >
          <DialogTitle>Edit Product</DialogTitle>
          <DialogContent
            sx={{
              ...customScrollbarStyle,
              width: "1200px",
            }}
          >
            <Stack direction="column" spacing={2} width="100%" my={2}>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="space-between"
                width="100%"
              >
                <TextField
                  margin="dense"
                  label="Code"
                  name="code"
                  value={editRow?.code || ""}
                  onChange={handleEditChange}
                  fullWidth
                  size="small"
                  sx={{
                    flex: 1,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#ccc",
                      },
                      "&:hover fieldset": {
                        borderColor: "#999",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#3f51b5",
                      },
                    },
                  }}
                />
                <TextField
                  margin="dense"
                  label="Name"
                  name="productName"
                  value={editRow?.productName || ""}
                  onChange={handleEditChange}
                  fullWidth
                  size="small"
                  sx={{
                    flex: 4,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#ccc",
                      },
                      "&:hover fieldset": {
                        borderColor: "#999",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#3f51b5",
                      },
                    },
                  }}
                />
              </Stack>

              <label style={{ fontSize: "16px", fontWeight: "bold" }}>
                Description
              </label>
              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  padding: "4px",
                  "&:hover": {
                    borderColor: "#999",
                  },
                  "&.Mui-focused": {
                    borderColor: "#3f51b5",
                  },
                }}
              >
                <TextareaAutosize
                  aria-label="Description"
                  name="description"
                  value={editRow?.description || ""}
                  onChange={handleEditChange}
                  minRows={3}
                  maxRows={6}
                  style={{
                    width: "100%",
                    padding: "8px",
                    fontSize: "16px",
                    border: "none",
                    outline: "none",
                  }}
                  placeholder="Enter description"
                  onFocus={(e) =>
                    (e.target.parentNode.style.borderColor = "#3f51b5")
                  }
                  onBlur={(e) =>
                    (e.target.parentNode.style.borderColor = "#ccc")
                  }
                />
              </Box>

              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="space-between"
                width="100%"
              >
                <TextField
                  margin="dense"
                  label="Place Of Origin"
                  name="placeOfOrigin"
                  value={editRow?.placeOfOrigin || ""}
                  onChange={handleEditChange}
                  fullWidth
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#ccc",
                      },
                      "&:hover fieldset": {
                        borderColor: "#999",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#3f51b5",
                      },
                    },
                  }}
                />
                <TextField
                  margin="dense"
                  label="Warranty"
                  name="warranty"
                  value={editRow?.warranty || ""}
                  onChange={handleEditChange}
                  fullWidth
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#ccc",
                      },
                      "&:hover fieldset": {
                        borderColor: "#999",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#3f51b5",
                      },
                    },
                  }}
                />
                <TextField
                  margin="dense"
                  label="Surface"
                  name="applicableSurface"
                  value={editRow?.applicableSurface || ""}
                  onChange={handleEditChange}
                  fullWidth
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#ccc",
                      },
                      "&:hover fieldset": {
                        borderColor: "#999",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#3f51b5",
                      },
                    },
                  }}
                />
                <FormControl fullWidth margin="dense">
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    labelId="category-label"
                    name="category"
                    value={editRow?.category?.categoryId || ""}
                    onChange={handleEditChange}
                    label="Category"
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#ccc",
                        },
                        "&:hover fieldset": {
                          borderColor: "#999",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#3f51b5",
                        },
                      },
                    }}
                  >
                    {categories.map((category) => (
                      <MenuItem
                        key={category.categoryId}
                        value={category.categoryId}
                      >
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="dense">
                  <InputLabel id="brands-label">Brand</InputLabel>
                  <Select
                    labelId="brands-label"
                    name="brand"
                    value={editRow?.brand?.brandId || ""}
                    onChange={handleEditChange}
                    label="Brand"
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#ccc",
                        },
                        "&:hover fieldset": {
                          borderColor: "#999",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#3f51b5",
                        },
                      },
                    }}
                  >
                    {brands.map((brand) => (
                      <MenuItem key={brand.brandId} value={brand.brandId}>
                        {brand.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} width="100%" mb={2}>
              <Stack
                width="50%"
                spacing={1}
                justifyContent="space-between"
                display="flex"
              >
                <div>
                  <Typography variant="h6" component="div" gutterBottom>
                    Properties
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={1}
                    flexWrap="wrap"
                    width="100%"
                  >
                    {editRow?.properties?.map((property, index) => (
                      <Chip
                        key={index}
                        label={`${property.property.name}: ${
                          property.value || "N/A"
                        }`}
                        onDelete={() => {
                          const updatedProperties = editRow.properties.filter(
                            (_, i) => i !== index
                          );
                          setEditRow((prev) => ({
                            ...prev,
                            properties: updatedProperties,
                          }));
                        }}
                        sx={{ margin: "4px !important" }}
                      />
                    ))}
                  </Stack>
                </div>

                <Button variant="contained" onClick={handleAddClickProperties}>
                  Add Properties
                </Button>
              </Stack>

              <Stack
                width="50%"
                spacing={1}
                justifyContent="space-between"
                display="flex"
              >
                <div>
                  <Typography variant="h6" component="div" gutterBottom>
                    Features
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={1}
                    flexWrap="wrap"
                    width="100%"
                  >
                    {editRow?.features?.map((feature, index) => (
                      <Chip
                        key={index}
                        label={`${feature.feature.name}: ${
                          feature.value || "N/A"
                        }`}
                        onDelete={() => {
                          const updatedFeatures = editRow.features.filter(
                            (_, i) => i !== index
                          );
                          setEditRow((prev) => ({
                            ...prev,
                            features: updatedFeatures,
                          }));
                        }}
                        sx={{ margin: "4px !important" }}
                      />
                    ))}
                  </Stack>
                </div>

                <Button variant="contained" onClick={handleAddClickFeature}>
                  Add Features
                </Button>
              </Stack>
            </Stack>

            {editRow?.category?.name === "Paint" && (
              <>
                <Stack
                  direction="row"
                  width="100%"
                  alignItems="center"
                  justifyContent="space-between"
                  mb={2}
                >
                  <Typography variant="h6" component="div" gutterBottom>
                    Variant
                  </Typography>
                  <Button variant="outlined" onClick={handleAddColorDialogOpen}>
                    Add Paint
                  </Button>
                </Stack>
                <TableContainer
                  sx={{
                    maxHeight: "60vh",
                    width: "100%",
                    overflow: "hidden",
                    mb: 2,
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
                    <Table size="small" stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Color</TableCell>
                          <TableCell align="center">Code</TableCell>
                          <TableCell align="center">Size</TableCell>
                          <TableCell align="center">Package</TableCell>
                          <TableCell align="center">Quantity</TableCell>
                          <TableCell align="center">Price</TableCell>
                          <TableCell align="center">Actions</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {editRow.paints ? (
                          editRow.paints.map((paint, paintIndex) => (
                            <React.Fragment key={paint.id}>
                              <TableRow
                                sx={{
                                  backgroundColor:
                                    paintIndex % 2 === 0
                                      ? "#f5f5f5"
                                      : "#ffffff",
                                }}
                              >
                                <TableCell
                                  rowSpan={
                                    paint.variants.length > 0
                                      ? paint.variants.length
                                      : 1
                                  }
                                  align="center"
                                  sx={{ p: 1 }}
                                >
                                  <div
                                    style={{
                                      width: "80px",
                                      height: "80px",
                                      backgroundColor: paint.color.hex,
                                      borderRadius: "4px",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      color: "#fff",
                                    }}
                                  ></div>
                                </TableCell>
                                <TableCell
                                  rowSpan={
                                    paint.variants.length > 0
                                      ? paint.variants.length
                                      : 1
                                  }
                                  align="center"
                                  sx={{ fontWeight: "bold", p: 1 }}
                                >
                                  {paint.color.name} ({paint.color.code}) <br />
                                  Hex: {paint.color.hex}
                                </TableCell>

                                {paint.variants.length > 0 ? (
                                  <>
                                    <TableCell align="center">
                                      {paint.variants[0].sizeName} L
                                    </TableCell>
                                    <TableCell align="center">
                                      {paint.variants[0].packageType}
                                    </TableCell>
                                    <TableCell align="center">
                                      {paint.variants[0].quantity}
                                    </TableCell>
                                    <TableCell align="center">
                                      ${paint.variants[0].price.toFixed(2)}
                                    </TableCell>
                                    <TableCell align="center">
                                      <Button
                                        variant="outlined"
                                        onClick={() =>
                                          handleDeleteVariant(
                                            paint.id,
                                            paint.variants[0].variantId,
                                            paint.paintId
                                          )
                                        }
                                      >
                                        <DeleteIcon fontSize="small" />
                                      </Button>
                                    </TableCell>
                                  </>
                                ) : (
                                  <TableCell colSpan={5} align="center">
                                    There are no variations.
                                  </TableCell>
                                )}
                              </TableRow>

                              {paint.variants
                                .slice(1)
                                .map((variant, variantIndex) => (
                                  <TableRow
                                    key={variant.variantId}
                                    sx={{
                                      backgroundColor:
                                        paintIndex % 2 === 0
                                          ? "#f5f5f5"
                                          : "#ffffff", // Thay đổi màu nền cho hàng màu
                                    }}
                                  >
                                    <TableCell align="center">
                                      {variant.sizeName} L
                                    </TableCell>
                                    <TableCell align="center">
                                      {variant.packageType}
                                    </TableCell>
                                    <TableCell align="center">
                                      {variant.quantity}
                                    </TableCell>
                                    <TableCell align="center">
                                      ${variant.price.toFixed(2)}
                                    </TableCell>
                                    <TableCell align="center">
                                      <Button
                                        variant="outlined"
                                        onClick={() =>
                                          handleDeleteVariant(
                                            paint.id,
                                            variant.variantId,
                                            paint.paintId
                                          )
                                        }
                                      >
                                        <DeleteIcon fontSize="small" />
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                ))}

                              {showAddVariantRow ===
                                (paint.id || paint.paintId) && (
                                <TableRow
                                  sx={{
                                    backgroundColor:
                                      paintIndex % 2 === 0
                                        ? "#f5f5f5"
                                        : "#ffffff", // Thay đổi màu nền cho hàng màu
                                  }}
                                >
                                  <TableCell
                                    colSpan={7}
                                    align="center"
                                    sx={{ p: 1 }}
                                  >
                                    <TextField
                                      select
                                      label="Select Variant"
                                      value={selectedVariantId}
                                      onChange={(e) =>
                                        setSelectedVariantId(e.target.value)
                                      }
                                      variant="outlined"
                                      size="small"
                                      sx={{ width: 200, mr: 1 }}
                                    >
                                      {filteredVariants.map((variant) => (
                                        <MenuItem
                                          key={variant.variantId}
                                          value={variant.variantId}
                                        >
                                          {variant.sizeName}{" "}
                                          {variant.categoryName === "Paint"
                                            ? "L"
                                            : "m"}{" "}
                                          - {variant.packageType} -{" "}
                                          {variant.categoryName}
                                        </MenuItem>
                                      ))}
                                    </TextField>

                                    <TextField
                                      label="Quantity"
                                      type="number"
                                      value={newVariant.quantity}
                                      onChange={(e) =>
                                        setNewVariant({
                                          ...newVariant,
                                          quantity: e.target.value,
                                        })
                                      }
                                      variant="outlined"
                                      size="small"
                                      sx={{ width: 100, mr: 1 }}
                                    />

                                    <TextField
                                      label="Price"
                                      type="number"
                                      value={newVariant.price}
                                      onChange={(e) =>
                                        setNewVariant({
                                          ...newVariant,
                                          price: e.target.value,
                                        })
                                      }
                                      variant="outlined"
                                      size="small"
                                      sx={{ width: 120, mr: 1 }}
                                    />

                                    <Button
                                      variant="outlined"
                                      size="small"
                                      onClick={() =>
                                        handleSaveVariantPaint(
                                          paint.id,
                                          paint.paintId
                                        )
                                      }
                                      sx={{ minWidth: 60, height: "36px" }}
                                    >
                                      Save
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              )}

                              <TableRow
                                sx={{
                                  backgroundColor:
                                    paintIndex % 2 === 0
                                      ? "#f5f5f5"
                                      : "#ffffff", // Thay đổi màu nền cho hàng màu
                                }}
                              >
                                <TableCell colSpan={7} align="center">
                                  <Button
                                    variant="outlined"
                                    onClick={() =>
                                      handleAddVariantRowToggle(
                                        paint.id === null
                                          ? paint.paintId
                                          : paint.id
                                      )
                                    }
                                  >
                                    {showAddVariantRow ===
                                    (paint.id || paint.paintId)
                                      ? "Cancel"
                                      : "Add variant"}
                                  </Button>
                                  <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() =>
                                      handleDeletePaint(paint.color.id)
                                    }
                                    sx={{ ml: 1 }}
                                  >
                                    Delete Paint
                                  </Button>
                                </TableCell>
                              </TableRow>
                            </React.Fragment>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={7} align="center">
                              No paints available.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                      {/* </Box> */}
                    </Table>
                  </div>
                </TableContainer>
              </>
            )}

            {editRow?.category?.name === "Wallpaper" && (
              <>
                <Stack
                  direction="row"
                  width="100%"
                  alignItems="center"
                  justifyContent="space-between"
                  mb={2}
                >
                  <Typography variant="h6" component="div" gutterBottom>
                    Variant
                  </Typography>
                </Stack>
                <TableContainer
                  sx={{
                    maxHeight: "60vh",
                    width: "100%",
                    overflow: "hidden",
                    mb: 2,
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
                    <Table size="small" stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Size</TableCell>
                          <TableCell align="center">Package</TableCell>
                          <TableCell align="center">Quantity</TableCell>
                          <TableCell align="center">Price</TableCell>
                          <TableCell align="center">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {editRow?.wallpapers ? (
                          editRow.wallpapers.map(
                            (wallpaper, wallpaperIndex) => (
                              <React.Fragment key={wallpaperIndex}>
                                {wallpaper.variants.length > 0 ? (
                                  wallpaper.variants.map(
                                    (variant, variantIndex) => (
                                      <TableRow
                                        sx={{
                                          backgroundColor:
                                            variantIndex % 2 === 0
                                              ? "#f5f5f5"
                                              : "#ffffff",
                                        }}
                                      >
                                        <TableCell align="center">
                                          {variant.sizeName} m
                                        </TableCell>
                                        <TableCell align="center">
                                          {variant.packageType}
                                        </TableCell>
                                        <TableCell align="center">
                                          {variant.quantity}
                                        </TableCell>
                                        <TableCell align="center">
                                          ${variant.price.toFixed(2)}
                                        </TableCell>
                                        <TableCell align="center">
                                          <Button
                                            variant="outlined"
                                            onClick={() =>
                                              handleDeleteVariant(
                                                wallpaper.id,
                                                variant.variantId
                                              )
                                            }
                                          >
                                            <DeleteIcon fontSize="small" />
                                          </Button>
                                        </TableCell>
                                      </TableRow>
                                    )
                                  )
                                ) : (
                                  <TableRow colSpan={5} align="center">
                                    <TableCell align="center">
                                      There are no variations.
                                    </TableCell>
                                  </TableRow>
                                )}

                                {showAddVariantRow === wallpaper.id && (
                                  <TableRow
                                    sx={{
                                      backgroundColor:
                                        wallpaperIndex % 2 === 0
                                          ? "#f5f5f5"
                                          : "#ffffff", // Thay đổi màu nền cho hàng màu
                                    }}
                                  >
                                    <TableCell
                                      colSpan={7}
                                      align="center"
                                      sx={{ p: 1 }}
                                    >
                                      <TextField
                                        select
                                        label="Select Variant"
                                        value={selectedVariantId}
                                        onChange={(e) =>
                                          setSelectedVariantId(e.target.value)
                                        }
                                        variant="outlined"
                                        size="small"
                                        sx={{ width: 200, mr: 1 }}
                                      >
                                        {filteredVariants.map((variant) => (
                                          <MenuItem
                                            key={variant.variantId}
                                            value={variant.variantId}
                                          >
                                            {variant.sizeName}{" "}
                                            {variant.categoryName === "Paint"
                                              ? "L"
                                              : "m"}{" "}
                                            - {variant.packageType} -{" "}
                                            {variant.categoryName}
                                          </MenuItem>
                                        ))}
                                      </TextField>

                                      <TextField
                                        label="Quantity"
                                        type="number"
                                        value={newVariant.quantity}
                                        onChange={(e) =>
                                          setNewVariant({
                                            ...newVariant,
                                            quantity: e.target.value,
                                          })
                                        }
                                        variant="outlined"
                                        size="small"
                                        sx={{ width: 100, mr: 1 }}
                                      />

                                      <TextField
                                        label="Price"
                                        type="number"
                                        value={newVariant.price}
                                        onChange={(e) =>
                                          setNewVariant({
                                            ...newVariant,
                                            price: e.target.value,
                                          })
                                        }
                                        variant="outlined"
                                        size="small"
                                        sx={{ width: 120, mr: 1 }}
                                      />

                                      <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() =>
                                          handleSaveVariantWallpaper(
                                            wallpaper.id
                                          )
                                        }
                                        sx={{ minWidth: 60, height: "36px" }}
                                      >
                                        Save
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                )}

                                <TableRow
                                  sx={{
                                    backgroundColor:
                                      wallpaperIndex % 2 === 0
                                        ? "#f5f5f5"
                                        : "#ffffff", // Thay đổi màu nền cho hàng màu
                                  }}
                                >
                                  <TableCell colSpan={7} align="center">
                                    <Button
                                      variant="outlined"
                                      onClick={() =>
                                        handleAddVariantRowToggle(wallpaper.id)
                                      }
                                    >
                                      {showAddVariantRow === wallpaper.id
                                        ? "Cancel"
                                        : "Add variant"}
                                    </Button>
                                    <Button
                                      variant="outlined"
                                      color="secondary"
                                      onClick={() =>
                                        handleDeleteFloor(wallpaper.id)
                                      }
                                      sx={{ ml: 1 }}
                                    >
                                      Delete Box
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              </React.Fragment>
                            )
                          )
                        ) : (
                          <>
                            <TableRow>
                              <TableCell colSpan={7} align="center">
                                No variant available.
                              </TableCell>
                            </TableRow>
                            <TableRow
                              sx={{
                                backgroundColor: "#ffffff", // Thay đổi màu nền cho hàng màu
                              }}
                            >
                              <TableCell
                                colSpan={7}
                                align="center"
                                sx={{ p: 1 }}
                              >
                                <TextField
                                  select
                                  label="Select Variant"
                                  value={selectedVariantId}
                                  onChange={(e) =>
                                    setSelectedVariantId(e.target.value)
                                  }
                                  variant="outlined"
                                  size="small"
                                  sx={{ width: 200, mr: 1 }}
                                >
                                  {filteredVariants.map((variant) => (
                                    <MenuItem
                                      key={variant.variantId}
                                      value={variant.variantId}
                                    >
                                      {variant.sizeName}{" "}
                                      {variant.categoryName === "Paint"
                                        ? "L"
                                        : "m"}{" "}
                                      - {variant.packageType} -{" "}
                                      {variant.categoryName}
                                    </MenuItem>
                                  ))}
                                </TextField>

                                <TextField
                                  label="Quantity"
                                  type="number"
                                  value={newVariant.quantity}
                                  onChange={(e) =>
                                    setNewVariant({
                                      ...newVariant,
                                      quantity: e.target.value,
                                    })
                                  }
                                  variant="outlined"
                                  size="small"
                                  sx={{ width: 100, mr: 1 }}
                                />

                                <TextField
                                  label="Price"
                                  type="number"
                                  value={newVariant.price}
                                  onChange={(e) =>
                                    setNewVariant({
                                      ...newVariant,
                                      price: e.target.value,
                                    })
                                  }
                                  variant="outlined"
                                  size="small"
                                  sx={{ width: 120, mr: 1 }}
                                />

                                <Button
                                  variant="outlined"
                                  size="small"
                                  onClick={() => handleSaveVariantWallpaper()}
                                  sx={{ minWidth: 60, height: "36px" }}
                                >
                                  Save
                                </Button>
                              </TableCell>
                            </TableRow>
                          </>
                        )}
                      </TableBody>
                      {/* </Box> */}
                    </Table>
                  </div>
                </TableContainer>
              </>
            )}
            {editRow?.category?.name === "Floor" && (
              <>
                <Stack
                  direction="row"
                  width="100%"
                  alignItems="center"
                  justifyContent="space-between"
                  mb={2}
                >
                  <Typography variant="h6" component="div" gutterBottom>
                    Variant
                  </Typography>
                  {showAddFloorRow === true && (
                    <Box colSpan={7} align="center" sx={{ p: 1 }}>
                      <TextField
                        label="Foam Thickness"
                        type="number"
                        value={newFloor.foamThickness}
                        onChange={(e) =>
                          setNewFloor({
                            ...newFloor,
                            foamThickness: e.target.value,
                          })
                        }
                        variant="outlined"
                        size="small"
                        sx={{ width: 150, mr: 1 }}
                      />

                      <TextField
                        label="Number Per Box"
                        type="number"
                        value={newFloor.numberOfPiecesPerBox}
                        onChange={(e) =>
                          setNewFloor({
                            ...newFloor,
                            numberOfPiecesPerBox: e.target.value,
                          })
                        }
                        variant="outlined"
                        size="small"
                        sx={{ width: 150, mr: 1 }}
                      />

                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleAddFloor(newFloor)}
                        sx={{ minWidth: 60, height: "36px" }}
                      >
                        Save
                      </Button>
                    </Box>
                  )}
                  <Button variant="outlined" onClick={handleAddFloorRowToggle}>
                    {showAddFloorRow === true ? "Cancel" : "Add Floor"}
                  </Button>
                </Stack>
                <TableContainer
                  sx={{
                    maxHeight: "60vh",
                    width: "100%",
                    overflow: "hidden",
                    mb: 2,
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
                    <Table size="small" stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Foam Thickness</TableCell>
                          <TableCell align="center">Number Per Box</TableCell>
                          <TableCell align="center">Size</TableCell>
                          <TableCell align="center">Package</TableCell>
                          <TableCell align="center">Quantity</TableCell>
                          <TableCell align="center">Price</TableCell>
                          <TableCell align="center">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {editRow.floors ? (
                          editRow.floors.map((floor, floorIndex) => (
                            <React.Fragment key={floorIndex}>
                              <TableRow
                                sx={{
                                  backgroundColor:
                                    floorIndex % 2 === 0
                                      ? "#f5f5f5"
                                      : "#ffffff",
                                }}
                              >
                                <TableCell
                                  rowSpan={
                                    floor.variants.length > 0
                                      ? floor.variants.length
                                      : 1
                                  }
                                  align="center"
                                  sx={{ p: 1 }}
                                >
                                  {floor.foamThickness} Inch
                                </TableCell>
                                <TableCell
                                  rowSpan={
                                    floor.variants.length > 0
                                      ? floor.variants.length
                                      : 1
                                  }
                                  align="center"
                                  sx={{ p: 1 }}
                                >
                                  {floor.numberOfPiecesPerBox} Pieces
                                </TableCell>

                                {floor.variants.length > 0 ? (
                                  <>
                                    <TableCell align="center">
                                      {floor.variants[0].sizeName}
                                    </TableCell>
                                    <TableCell align="center">
                                      {floor.variants[0].packageType}
                                    </TableCell>
                                    <TableCell align="center">
                                      {floor.variants[0].quantity}
                                    </TableCell>
                                    <TableCell align="center">
                                      ${floor.variants[0].price.toFixed(2)}
                                    </TableCell>
                                    <TableCell align="center">
                                      <Button
                                        variant="outlined"
                                        onClick={() =>
                                          handleDeleteVariant(
                                            floor.id,
                                            floor.variants[0].variantId
                                          )
                                        }
                                      >
                                        <DeleteIcon fontSize="small" />
                                      </Button>
                                    </TableCell>
                                  </>
                                ) : (
                                  <TableCell colSpan={5} align="center">
                                    There are no variations.
                                  </TableCell>
                                )}
                              </TableRow>

                              {floor.variants
                                .slice(1)
                                .map((variant, variantIndex) => (
                                  <TableRow
                                    key={variantIndex}
                                    sx={{
                                      backgroundColor:
                                        floorIndex % 2 === 0
                                          ? "#f5f5f5"
                                          : "#ffffff", // Thay đổi màu nền cho hàng màu
                                    }}
                                  >
                                    <TableCell align="center">
                                      {variant.sizeName}
                                    </TableCell>
                                    <TableCell align="center">
                                      {variant.packageType}
                                    </TableCell>
                                    <TableCell align="center">
                                      {variant.quantity}
                                    </TableCell>
                                    <TableCell align="center">
                                      ${variant.price.toFixed(2)}
                                    </TableCell>
                                    <TableCell align="center">
                                      <Button
                                        variant="outlined"
                                        onClick={() =>
                                          handleDeleteVariant(
                                            floor.id,
                                            variant.variantId
                                          )
                                        }
                                      >
                                        <DeleteIcon fontSize="small" />
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                ))}

                              {showAddVariantRow ===
                                (floor.id || floor.floorId) && (
                                <TableRow
                                  sx={{
                                    backgroundColor:
                                      floorIndex % 2 === 0
                                        ? "#f5f5f5"
                                        : "#ffffff", // Thay đổi màu nền cho hàng màu
                                  }}
                                >
                                  <TableCell
                                    colSpan={7}
                                    align="center"
                                    sx={{ p: 1 }}
                                  >
                                    <TextField
                                      select
                                      label="Select Variant"
                                      value={selectedVariantId}
                                      onChange={(e) =>
                                        setSelectedVariantId(e.target.value)
                                      }
                                      variant="outlined"
                                      size="small"
                                      sx={{ width: 200, mr: 1 }}
                                    >
                                      {filteredVariants.map((variant) => (
                                        <MenuItem
                                          key={variant.variantId}
                                          value={variant.variantId}
                                        >
                                          {variant.sizeName}{" "}
                                          {variant.categoryName === "Paint"
                                            ? "L"
                                            : "m"}{" "}
                                          - {variant.packageType} -{" "}
                                          {variant.categoryName}
                                        </MenuItem>
                                      ))}
                                    </TextField>

                                    <TextField
                                      label="Quantity"
                                      type="number"
                                      value={newVariant.quantity}
                                      onChange={(e) =>
                                        setNewVariant({
                                          ...newVariant,
                                          quantity: e.target.value,
                                        })
                                      }
                                      variant="outlined"
                                      size="small"
                                      sx={{ width: 100, mr: 1 }}
                                    />

                                    <TextField
                                      label="Price"
                                      type="number"
                                      value={newVariant.price}
                                      onChange={(e) =>
                                        setNewVariant({
                                          ...newVariant,
                                          price: e.target.value,
                                        })
                                      }
                                      variant="outlined"
                                      size="small"
                                      sx={{ width: 120, mr: 1 }}
                                    />

                                    <Button
                                      variant="outlined"
                                      size="small"
                                      onClick={() =>
                                        handleSaveVariantFloor(floor.id)
                                      }
                                      sx={{ minWidth: 60, height: "36px" }}
                                    >
                                      Save
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              )}

                              <TableRow
                                sx={{
                                  backgroundColor:
                                    floorIndex % 2 === 0
                                      ? "#f5f5f5"
                                      : "#ffffff", // Thay đổi màu nền cho hàng màu
                                }}
                              >
                                <TableCell colSpan={7} align="center">
                                  <Button
                                    variant="outlined"
                                    onClick={() =>
                                      handleAddVariantRowToggle(
                                        floor.id === null
                                          ? floor.floorId
                                          : floor.id
                                      )
                                    }
                                  >
                                    {showAddVariantRow ===
                                    (floor.id || floor.floorId)
                                      ? "Cancel"
                                      : "Add variant"}
                                  </Button>
                                  <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() =>
                                      handleDeleteFloor(
                                        floor.id === null
                                          ? floor.floorId
                                          : floor.id
                                      )
                                    }
                                    sx={{ ml: 1 }}
                                  >
                                    Delete Box
                                  </Button>
                                </TableCell>
                              </TableRow>
                            </React.Fragment>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={7} align="center">
                              No floors available.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                      {/* </Box> */}
                    </Table>
                  </div>
                </TableContainer>
              </>
            )}

            <Typography variant="h6" component="div" gutterBottom>
              Images
            </Typography>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="flex-start"
              width="100%"
              my={2}
            >
              {editRow?.images?.length > 0 ? (
                editRow.images.map((image, index) => (
                  <Grid key={index} item xs={6} sm={4} md={3}>
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: "200px",
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
                        src={image.url}
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
                        onClick={() => handleDeleteImage(index)}
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
                ))
              ) : (
                <Typography
                  variant="body1"
                  color="textSecondary"
                  align="center"
                  my={2}
                >
                  There are no images for this product.
                </Typography>
              )}
            </Grid>

            <ImageUploader handleUpload={setAvatarUrl} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={handleEditSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
        {/* Dialog to select Properties */}
        <Dialog open={openProperties} onClose={handleCloseProperties}>
          <DialogTitle>Select Properties</DialogTitle>
          <DialogContent>
            <FormGroup>
              {availableProperties.map((property) => (
                <div key={property.propertyId}>
                  <Typography variant="subtitle1">{property.name}</Typography>
                  {property.propertyValues.map((value) => (
                    <FormControlLabel
                      key={value.id}
                      control={
                        <Checkbox
                          checked={selectedProperties.some(
                            (p) =>
                              p.propertyId === property.propertyId &&
                              p.value === value.value
                          )}
                          onChange={(e) =>
                            handlePropertiesChange(
                              property.propertyId,
                              value.value,
                              value.id
                            )
                          }
                        />
                      }
                      label={value.value}
                    />
                  ))}
                </div>
              ))}
            </FormGroup>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseProperties} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAddProperties} color="primary">
              Add Selected Properties
            </Button>
          </DialogActions>
        </Dialog>
        {/* Dialog to select features */}
        <Dialog open={openFeature} onClose={handleCloseFeature}>
          <DialogTitle>Select Features</DialogTitle>
          <DialogContent>
            <FormGroup>
              {availableFeatures.map((feature) => (
                <div key={feature.featureId}>
                  <Typography variant="subtitle1">{feature.name}</Typography>
                  {feature.featureValues.map((value) => (
                    <FormControlLabel
                      key={value.id}
                      control={
                        <Checkbox
                          checked={selectedFeatures.some(
                            (f) =>
                              f.featureId === feature.featureId &&
                              f.value === value.value
                          )}
                          onChange={(e) =>
                            handleFeatureChange(
                              feature.featureId,
                              value.value,
                              value.id
                            )
                          }
                        />
                      }
                      label={value.value}
                    />
                  ))}
                </div>
              ))}
            </FormGroup>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseFeature} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAddFeatures} color="primary">
              Add Selected Features
            </Button>
          </DialogActions>
        </Dialog>
        {/* Bảng hiển thị màu sắc */}
        <Dialog open={openAddColorDialog} onClose={handleAddColorDialogClose}>
          <DialogTitle>Select Color Add to Product</DialogTitle>
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
                      <TableCell>Select</TableCell>
                      <TableCell>Color</TableCell>
                      <TableCell>Code</TableCell>
                      <TableCell>Hex</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {colors.map((color) => (
                      <TableRow key={color.id}>
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={selectedColors.includes(color.id)}
                            onChange={() => handleColorSelection(color.id)}
                          />
                        </TableCell>
                        <TableCell>{color.name}</TableCell>
                        <TableCell>{color.code}</TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              width: 60,
                              height: 60,
                              backgroundColor: `${color.hex}`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#fff",
                            }}
                          >
                            {color.hex}
                          </Box>
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
              count={totalColors}
              rowsPerPage={colorsPerPage}
              page={currentColorsPage - 1}
              onPageChange={handleChangePage}
              labelDisplayedRows={({ from, to, count }) => (
                <span
                  style={{ ...textConfigs.style.basicFont }}
                >{`${from}-${to} of ${count}`}</span>
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddColorDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAddColorsToProduct} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Stack>
  );
};

export default ManageProduct;
