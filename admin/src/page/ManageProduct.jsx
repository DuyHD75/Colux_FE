import {
  Avatar,
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
  Modal,
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
import React, { useEffect, useRef, useState } from "react";
import textConfig from "../config/text.config";
import backgroundConfig from "../config/background.config";
import { FaPlus, FaTimes } from "react-icons/fa";
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
import * as XLSX from "xlsx";
import { setGlobalLoading } from "../redux/reducer/globalLoadingSlice"

const ManageProduct = () => {
  const [productsFile, setProductsFile] = useState([]);
  const [file, setFile] = useState(null);

  const [products, setProducts] = useState([]);
  const [upStockHistory, setUpStockHistory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [variantAvailable, setVariants] = useState([]);

  const [availableFeatures, setAvailableFeatures] = useState([]);
  const [availableProperties, setAvailableProperties] = useState([]);

  const [avatarUrl, setAvatarUrl] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);
  const [editRow, setEditRow] = useState(null);
  const [editRowUpStock, setEditUpStockRow] = useState(null);
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
    floorId: `${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
  });
  const [showAddVariantRow, setShowAddVariantRow] = useState(null);
  const [showAddFloorRow, setShowAddFloorRow] = useState(false);
  const [filteredVariants, setFilteredVariants] = useState([]);
  const [showAddVariantRows, setShowAddVariantRows] = useState(false);

  const [selectedPaints, setSelectedPaints] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [orderCode, setOrderCode] = useState([]);

  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage("");
  };

  const handleSelectPaint = (paintId) => {
    setSelectedPaints((prevSelected) =>
      prevSelected.includes(paintId)
        ? prevSelected.filter((id) => id !== paintId)
        : [...prevSelected, paintId]
    );
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedPaints(
        editRow.paints.map((paint) => paint.id || paint.paintId)
      );
    } else {
      setSelectedPaints([]);
    }
  };

  const handleAddColorDialogOpen = () => {
    setOpenAddColorDialog(true);
  };

  const handleAddColorDialogClose = () => {
    setOpenAddColorDialog(false);
  };

  const handleAddVariantRowToggle = (id) => {
    // if (id !== null) {
    setShowAddVariantRow((prev) => (prev === id ? null : id));
    // }
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

  const handleSaveVariantForMultiplePaints = () => {
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
      if (selectedPaints.includes(paint.id || paint.paintId)) {
        const existingVariantIndex = paint.variants.findIndex(
          (variant) => variant.variantId === selectedVariantId
        );

        if (existingVariantIndex !== -1) {
          // Update quantity and price if variant already exists
          paint.variants[existingVariantIndex].quantity =
            Number(paint.variants[existingVariantIndex].quantity) +
            Number(newVariant.quantity);
          paint.variants[existingVariantIndex].price = Number(newVariant.price);
          setShowAddVariantRows(false);
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
          setShowAddVariantRows(false);
        }
      }
      return paint;
    });

    setEditRow({ ...editRow, paints: updatedPaints });
    setShowAddVariantRow(null);
    setNewVariant({ quantity: 1, price: 0 });
    setSelectedPaints([]); // Reset selected paints
    setSelectedVariantId("");
  };

  console.log(editRow);

  const handleSaveVariantFloor = (id, floorId) => {
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
      if (
        (id === null && floor.floorId === floorId) ||
        (id !== null && floor.id === id)
      ) {
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

  const handleAddVariantRowsToggle = () => {
    setShowAddVariantRows(!showAddVariantRows);
  };

  const handleSaveVariantWallpaper = (id, wallpaperId) => {
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
        if (
          (id === null && wallpaper.wallpaperId === wallpaperId) ||
          (id !== null && wallpaper.id === id)
        ) {
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
          wallpaperId: `${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
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

  const handleDeleteVariantWallpaper = (id, variantId, wallpaperId) => {
    const updatedWallpapers = editRow.wallpapers.map((wallpaper) => {
      if (
        (id === null && wallpaper.wallpaperId === wallpaperId) ||
        (id !== null && wallpaper.id === id)
      ) {
        return {
          ...wallpaper,
          variants: wallpaper.variants.filter(
            (variant) => variant.variantId !== variantId
          ),
        };
      }
      return wallpaper;
    });

    setEditRow({ ...editRow, wallpapers: updatedWallpapers });
  };

  const handleDeleteVariantFloor = (id, variantId, floorId) => {
    const updatedFloors = editRow.floors.map((floor) => {
      if (
        (id === null && floor.floorId === floorId) ||
        (id !== null && floor.id === id)
      ) {
        return {
          ...floor,
          variants: floor.variants.filter(
            (variant) => variant.variantId !== variantId
          ),
        };
      }
      return floor;
    });

    setEditRow({ ...editRow, floors: updatedFloors });
  };

  const handleColorSelection = (colorId) => {
    const color = colors.find((c) => c.id === colorId);
    if (!color) return;

    setSelectedColors((prevSelected) => {
      // Check if colorId is already selected
      const isSelected = prevSelected.some(
        (selected) => selected.color.id === colorId
      );

      if (isSelected) {
        // Remove if already selected
        return prevSelected.filter((selected) => selected.color.id !== colorId);
      } else {
        // Add if not selected, with the specified structure
        const newColorSelection = {
          color: {
            name: color.name,
            code: color.code,
            hex: color.hex,
            interior: color.interior,
            exterior: color.exterior,
            colorTypeId: 0,
            id: color.id,
          },
        };

        return [...prevSelected, newColorSelection];
      }
    });
  };

  const handleAddColorsToProduct = () => {
    if (editRow.paints) {
      const paintsToAdd = selectedColors
        .map((color) => {
          // const color = colors.find((c) => c.id === colorId);
          if (!editRow.paints.some((p) => p.color.id === color.id)) {
            return {
              color: {
                name: color.color.name,
                code: color.color.code,
                hex: color.color.hex,
                interior: color.color.interior,
                exterior: color.color.exterior,
                colorTypeId: 0,
                id: color.color.id,
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
      console.log(selectedColors);

      const paintsToAdd = selectedColors.map((color) => {
        // const color = colors.find((c) => c.id === colorId);
        return {
          color: {
            name: color.color.name,
            code: color.color.code,
            hex: color.color.hex,
            interior: color.color.interior,
            exterior: color.exterior,
            colorTypeId: 0,
            id: color.color.id,
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
        floorId: `${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
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
    const getAllProducts = async () => {
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
    getAllProducts();
    
  }, [dispatch]);

  const getUpStockHistory = async () => {
    try {
      const { response, err } = await productsApi.upStockHistory();
      if (response) {
        setUpStockHistory([...response.data.upStockHistory]);
      } else if (err) {
        toast.error(err);
      }
    } catch (error) {
      console.log("Error", error);
      toast.error("An error occurred while fetching up stock history.");
    }
    
  };

  useEffect(() => {
    getUpStockHistory();
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

  const [rowUpStockHistory, setRowsUpStockHistory] = useState(products);

  useEffect(() => {
    setRowsUpStockHistory(upStockHistory);
  }, [upStockHistory]);

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

  const handleEditUpStockClick = (row) => {
    setEditUpStockRow(row);
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

  const handleEditUpStockCancel = () => {
    setEditUpStockRow(null);
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
      filterable: true,

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
      filterOperators: [
        {
          label: "Equals",
          value: "equals",
          getApplyFilterFn: (filterItem) => {
            if (!filterItem.value) return null;

            return (row) => {
              console.log(row);
              return row.name && row.name
                ? row.name.toLowerCase() === filterItem.value.toLowerCase()
                : false;
            };
          },
          InputComponent: ({ item, applyValue }) => (
            <div>
              <InputLabel shrink>Value</InputLabel>
              <Select
                value={item.value || ""}
                onChange={(event) =>
                  applyValue({ ...item, value: event.target.value })
                }
                fullWidth
                displayEmpty
              >
                <MenuItem value="">None</MenuItem>
                {/* Tạo danh sách category có sẵn */}
                {categories.map((category, index) => (
                  <MenuItem key={index} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
          ),
        },
      ],
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

  const columnsUpStockHistory = [
    { field: "stockImportHistoryId", headerName: "ID", width: 330 },
    { field: "billCode", headerName: "Bill Code", width: 150 },
    {
      field: 'name',
      headerName: 'Name',
      width: 250,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" justifyContent="start" width="100%" height="100%">
          <Avatar alt={params.row.userInfo.firstName} src={params.row.userInfo.imageUrl} sx={{ marginRight: 1 }} />
          <Typography>{params.row.userInfo.firstName} {params.row.userInfo.lastLogin}</Typography>
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 140,
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
            onClick={() => handleEditUpStockClick(params.row)}
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

  const paginationModel = { page: 0, pageSize: 20 };
  const filteredRows = useRef([]);

  useEffect(() => {
    if (searchText === "") {
      filteredRows.current = products;
    } else {
      filteredRows.current = products.filter((product) =>
        product.productName.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    setRows(filteredRows.current); // Cập nhật rows với kết quả lọc
  }, [searchText, products]);

  const handleOrderCodeChange = (e) => {
    const { name, value } = e.target;
    setOrderCode(value);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (!file) return;
    setFile(file);
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      try {
        const workbook = XLSX.read(data, { type: "array" });

        // Lấy dữ liệu từ các sheet
        const productSheet = XLSX.utils.sheet_to_json(
          workbook.Sheets["Product"]
        );
        const colorSheet = XLSX.utils.sheet_to_json(workbook.Sheets["Color"]);
        const propertySheet = XLSX.utils.sheet_to_json(
          workbook.Sheets["Property"]
        );
        const featureSheet = XLSX.utils.sheet_to_json(
          workbook.Sheets["Feature"]
        );
        if (productSheet.length > 0 && colorSheet.length > 0 && productSheet.length > 0 && featureSheet.length > 0) {
          console.log(productSheet);

          // Map dữ liệu từ Product Sheet
          const productsF = productSheet.map((row) => {
            const {
              "Product Name": productName,
              Description: description,
              Code: code,
              PlaceOfOrigin: placeOfOrigin,
              Warranty: warranty,
              "Applicable Surface": applicableSurface,
              SupplierId: supplierId,
              BrandId: brandId,
              CategoryId: categoryId,
              Category: categoryName,
              "Number Pieces Per Box (Floors)": numberPiecesPerBox,
              Color: colorHex,
              Quantity: quantity,
              Price: price,
              "Size (Paint: L; Floor, Wallpaper: m)": sizeName,
              "Package Type": packageType,
              Images: images,
              Feature: feature,
              Property: property,
              BrandCode: brandCode,
            } = row;
            // Phân loại sản phẩm
            console.log(categoryName);
            if (productName) {
              const productType = categoryName.toLowerCase();
              let productSpecificData = {};

              if (productType === "paint") {
                const colorData = colorSheet.find(
                  (color) => color.hexCode.trim() === colorHex.trim()
                );
                console.log(colorData["Interior"]);
                console.log(colorData);

                productSpecificData = {
                  numberPiecesPerBox: null,
                  color: colorData
                    ? {
                        name: colorData["Color Name"],
                        code: colorData["Color Code"],
                        hex: colorData["hexCode"],
                        LRV: colorData["LRV"],
                        interior: colorData["Interior"] === "true",
                        exterior: colorData["Exterior"] === "true",
                        description: colorData["Description"],
                        colorTypeId: 0,
                        image: colorData["Image"],
                      }
                    : null,
                };
              } else if (productType === "floor") {
                productSpecificData = { numberPiecesPerBox };
              } else {
                productSpecificData = { numberPiecesPerBox: null };
              }

              const featureValueIds = feature
                .split(",")
                .map((feat) => {
                  console.log(feat);

                  const featureData = featureSheet.find(
                    (f) => f["Feature Code"] === feat.trim()
                  );
                  return featureData ? featureData["FeatureValueId"] : null;
                })
                .filter((id) => id !== null); // Lọc bỏ các giá trị null nếu không tìm thấy

              const propertyValueIds = property
                .split(",")
                .map((prop) => {
                  const propertyData = propertySheet.find(
                    (p) => p["Property Code"] === prop.trim()
                  );
                  return propertyData ? propertyData["PropertyValueId"] : null;
                })
                .filter((id) => id !== null); // Lọc bỏ các giá trị null nếu không tìm thấy

              return {
                productName,
                description,
                code,
                placeOfOrigin,
                warranty,
                supplierId,
                brandId,
                categoryId,
                categoryName: productType,
                images: images.split(","),
                featureValueIds, // Lưu các id của feature
                propertyValueIds, // Lưu các id của property
                quantity,
                price,
                sizeName: isNaN(sizeName) ? sizeName : String(sizeName),
                packageType,
                applicableSurface,
                brandCode,
                ...productSpecificData,
              };
            }
            return null;
          });
          const filteredProductsF = productsF.filter(
            (product) => product !== null
          );
          setProductsFile(filteredProductsF);
        } else {
          toast.warn("Invalid file format, please upload a different file.");
        }
      } catch (error) {
        console.log(error);
        toast.warn("Invalid file format, please upload a different file.");
      }
    };

    reader.readAsArrayBuffer(file);
  };

  console.log(productsFile);

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleSaveFile = async () => {
    
    const stringUrl = imageUrl.join(", ");
    const data = { images: stringUrl, billCode: orderCode, products: productsFile};
    if (productsFile.length > 0) {
      const { response, err } = await productsApi.saveFileProduct(data);
      if (response) {
        getAllProduct();
        getUpStockHistory()
        toast.success(response.message);
      } else {
        console.log(err);
        toast.error("Error while save file");
      }
    } else {
      toast.warn("No product in file.");
    }
  };
  const [openStockUp, setOpenStockUp] = useState(false);

  const handleOpenStockUpDialog = () => {
    setOpenStockUp(true);
  };

  const handleCloseStockUpDialog = () => {
    setOpenStockUp(false);
  };

  return (
    <Stack direction="row" spacing={1} my={1}>
      {/* <SlideBar></SlideBar> */}
      <Box
        sx={{
          width: { xs: "100%", md: "100%" },
          height: "100%",
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
          <div>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              gap={2}
            >
              <Button
                sx={{
                  color: "white",
                  ...backgroundConfig.style.backgroundPrimary,
                  "&:hover": {
                    ...backgroundConfig.style.backgroundSecondary,
                  },
                }}
                startIcon={<FaPlus />}
                onClick={handleOpenStockUpDialog}
              >
                Up Stock
              </Button>

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
            </Box>
          </div>
        </Stack>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)} // Cập nhật giá trị tìm kiếm
          sx={{
            width: "40%",
            mb: "1rem",
          }}
        />

        {/* DataGrid */}
        <Paper
          sx={{
            height: "90%",
            width: "100%",
            overflowX: "auto",
          }}
        >
          <DataGrid
            rows={rows} // Hiển thị rows đã lọc
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[2]}
            checkboxSelection
            getRowId={(row) => row.productId}
            sx={{
              fontSize: "14px",
            }}
          />
          
        </Paper>
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            marginY: "1rem",
          }}
        >
          <Typography
            sx={{
              ...textConfig.style.headerText,
              fontSize: "1.5rem",
            }}
          >
            Up Stock History
          </Typography>
        </Stack>
        <Paper
          sx={{
            height: "90%",
            width: "60%",
            overflowX: "auto",
          }}
        >
          <DataGrid
            rows={rowUpStockHistory} // Hiển thị rows đã lọc
            columns={columnsUpStockHistory}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[2]}
            checkboxSelection
            getRowId={(row) => row.stockImportHistoryId}
            sx={{
              fontSize: "14px",
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
                  disabled
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
                <FormControl fullWidth margin="dense">
                  <InputLabel id="placeOfOrigin-label">
                    Place Of Origin
                  </InputLabel>
                  <Select
                    labelId="placeOfOrigin-label"
                    name="placeOfOrigin"
                    onChange={handleEditChange}
                    value={editRow?.placeOfOrigin}
                    label="Place Of Origin"
                    placeholder="Place Of Origin"
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
                    <MenuItem value="Japan">Japan</MenuItem>
                    <MenuItem value="Korean">Korean</MenuItem>
                    <MenuItem value="Nauy">Nauy</MenuItem>
                    <MenuItem value="Netherlands">Netherlands</MenuItem>
                    <MenuItem value="Viet Nam">Viet Nam</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="dense">
                  <InputLabel id="warranty-label">Warranty</InputLabel>
                  <Select
                    labelId="warranty-label"
                    name="warranty"
                    onChange={handleEditChange}
                    value={editRow?.warranty}
                    label="Warranty"
                    placeholder="Warranty"
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
                    <MenuItem value="1 years">1 years</MenuItem>
                    <MenuItem value="2 years">2 years</MenuItem>
                    <MenuItem value="3 years">3 years</MenuItem>
                    <MenuItem value="4 years">4 years</MenuItem>
                    <MenuItem value="5 years">5 years</MenuItem>
                    <MenuItem value="6 years">6 years</MenuItem>
                    <MenuItem value="7 years">7 years</MenuItem>
                    <MenuItem value="8 years">8 years</MenuItem>
                    <MenuItem value="9 years">9 years</MenuItem>
                    <MenuItem value="10 years">10 years</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="dense">
                  <InputLabel id="surface-label">Surface</InputLabel>
                  <Select
                    labelId="surface-label"
                    name="applicableSurface"
                    onChange={handleEditChange}
                    value={editRow?.applicableSurface}
                    label="Surface"
                    placeholder="Surface"
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
                    <MenuItem value="Wall">Wall</MenuItem>
                    <MenuItem value="Floor">Floor</MenuItem>
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
                    {brands
                      .slice()
                      .sort((a, b) => {
                        const numA =
                          parseInt(a.name.match(/\d+/)?.[0], 10) || Infinity;
                        const numB =
                          parseInt(b.name.match(/\d+/)?.[0], 10) || Infinity;
                        if (numA !== numB) return numA - numB;
                        return a.name.localeCompare(b.name);
                      })
                      .map((brand, i) => (
                        <MenuItem key={i} value={brand.brandId}>
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

                <Button
                  variant="contained"
                  onClick={handleAddClickProperties}
                  sx={{ textTransform: "none" }}
                >
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

                <Button
                  variant="contained"
                  onClick={handleAddClickFeature}
                  sx={{ textTransform: "none" }}
                >
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
                  {showAddVariantRows === true && (
                    <Box align="center" sx={{ p: 1 }}>
                      <TextField
                        select
                        label="Select Variant"
                        value={selectedVariantId}
                        onChange={(e) => setSelectedVariantId(e.target.value)}
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
                            {variant.categoryName === "Paint" ? "L" : "m"} -{" "}
                            {variant.packageType} - {variant.categoryName}
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
                        onClick={handleSaveVariantForMultiplePaints}
                        sx={{ minWidth: 60, height: "36px" }}
                      >
                        Save
                      </Button>
                    </Box>
                  )}
                  <Box display="flex" gap={2}>
                    <Button
                      sx={{ textTransform: "none" }}
                      variant="outlined"
                      onClick={handleAddVariantRowsToggle}
                      disabled={selectedPaints.length === 0} // Disable nếu không có paint nào được chọn
                    >
                      {showAddVariantRows === true
                        ? "Cancel"
                        : "Add Variant to Selected Paints "}
                    </Button>
                    <Button
                      sx={{ textTransform: "none" }}
                      variant="outlined"
                      onClick={handleAddColorDialogOpen}
                    >
                      Add Paint
                    </Button>
                  </Box>
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
                          <TableCell align="center">
                            <Checkbox
                              indeterminate={
                                selectedPaints.length > 0 &&
                                selectedPaints.length < editRow.paints.length
                              }
                              checked={
                                selectedPaints.length ===
                                (editRow.paints?.length || 0)
                              }
                              onChange={handleSelectAll}
                              inputProps={{ "aria-label": "select all paints" }}
                            />
                          </TableCell>
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
                            <React.Fragment key={paintIndex}>
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
                                >
                                  <Checkbox
                                    checked={selectedPaints.includes(
                                      paint.id || paint.paintId
                                    )}
                                    onChange={() =>
                                      handleSelectPaint(
                                        paint.id || paint.paintId
                                      )
                                    }
                                    inputProps={{
                                      "aria-label": `select paint ${paint.color.name}`,
                                    }}
                                  />
                                </TableCell>
                                <TableCell
                                  rowSpan={
                                    paint.variants.length > 0
                                      ? paint.variants.length
                                      : 1
                                  }
                                  align="center"
                                  sx={{
                                    p: 1,
                                    verticalAlign: "middle",
                                    width: "80px",
                                    height: "80px",
                                  }}
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
                                    key={variantIndex}
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
                                    colSpan={8}
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
                                <TableCell colSpan={8} align="center">
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
                            <TableCell colSpan={8} align="center">
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
                                              handleDeleteVariantWallpaper(
                                                wallpaper.id,
                                                variant.variantId,
                                                wallpaper.wallpaperId
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
                                        {filteredVariants.map((variant, i) => (
                                          <MenuItem
                                            key={i}
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
                                            wallpaper.id,
                                            wallpaper.wallpaperId
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
                                        handleAddVariantRowToggle(
                                          wallpaper.id === null
                                            ? wallpaper.wallpaperId
                                            : wallpaper.id
                                        )
                                      }
                                    >
                                      {showAddVariantRow === wallpaper.id ||
                                      wallpaper.wallpaperId
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
                                  {filteredVariants.map((variant, i) => (
                                    <MenuItem key={i} value={variant.variantId}>
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
                                          handleDeleteVariantFloor(
                                            floor.id,
                                            floor.variants[0].variantId,
                                            floor.floorId
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
                                          handleDeleteVariantFloor(
                                            floor.id,
                                            variant.variantId,
                                            floor.floorId
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
                                      {filteredVariants.map((variant, i) => (
                                        <MenuItem
                                          key={i}
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
                                        handleSaveVariantFloor(
                                          floor.id,
                                          floor.floorId
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
                        height: "300px",
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
                <Grid item xs={12} md={12}>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    align="center"
                    my={2}
                  >
                    There are no images for this product.
                  </Typography>
                </Grid>
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

        <Dialog
          maxWidth="lg"
          fullWidth
          open={!!editRowUpStock}
          onClose={handleEditUpStockCancel}
        >
          <DialogTitle>Up Stock: {editRowUpStock && editRowUpStock.billCode}</DialogTitle>
          <DialogContent
            sx={{
              ...customScrollbarStyle,
              width: "1200px",
            }}
          >
            <Typography variant="body1" component="div" gutterBottom>
              <strong>ImporterId:</strong> {editRowUpStock && editRowUpStock.userInfo.userId}<br/>
              <strong>Importer:</strong> {editRowUpStock && editRowUpStock.userInfo.firstName} {editRowUpStock && editRowUpStock.userInfo.lastLogin} <br/>
              <strong>Role:</strong> {editRowUpStock && editRowUpStock.userInfo.role}
            </Typography>

            <Typography variant="h6" component="div" gutterBottom>
              Images Up Stock
            </Typography>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="flex-start"
              width="100%"
              mt={2}
            >
              {editRowUpStock?.images ? (
        editRowUpStock.images.split(", ").map((s) => s.trim()).map((image, index) => (
          <Grid key={index} item xs={6} sm={4} md={3}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "300px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                m: 1,
              }}
              onClick={() => handleOpen(image)} // Handle click to open modal
            >
              <img
                style={{
                  borderRadius: "5px",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  boxShadow: "2px 2px 5px rgba(255,255,255, 0.6)",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
                src={image}
                alt="PhotoItem"
              />
            </Box>
          </Grid>
        ))
      ) : (
        <Grid item xs={12} md={12}>
          <Typography
            variant="body1"
            color="textSecondary"
            align="center"
            my={2}
          >
            There are no images for this up stock.
          </Typography>
        </Grid>
      )}

      {/* Modal to show full-size image */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "90%",
            maxHeight: "90%",
          }}
        >
          <img
            src={selectedImage}
            alt="FullImage"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              borderRadius: "5px",
            }}
          />
        </Box>
      </Modal>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditUpStockCancel} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog to select Properties */}
        <Dialog open={openProperties} onClose={handleCloseProperties}>
          <DialogTitle>Select Properties</DialogTitle>
          <DialogContent>
            <FormGroup>
              {availableProperties
                .filter(
                  (property) =>
                    property.category &&
                    property.category === editRow?.category?.name
                )
                .slice()
                .sort((a, b) => {
                  const numA =
                    parseInt(a.name.match(/\d+/)?.[0], 10) || Infinity;
                  const numB =
                    parseInt(b.name.match(/\d+/)?.[0], 10) || Infinity;
                  if (numA !== numB) return numA - numB;
                  return a.name.localeCompare(b.name);
                })
                .map((property, i) => (
                  <div key={i}>
                    <Typography variant="subtitle1">{property.name}</Typography>
                    {property.propertyValues
                      .slice()
                      .sort((a, b) => {
                        const numA =
                          parseInt(a.value.match(/\d+/)?.[0], 10) || Infinity;
                        const numB =
                          parseInt(b.value.match(/\d+/)?.[0], 10) || Infinity;
                        if (numA !== numB) return numA - numB;
                        return a.value.localeCompare(b.value);
                      })
                      .map((value, i) => (
                        <FormControlLabel
                          key={i}
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
            <Button
              onClick={handleCloseProperties}
              color="primary"
              sx={{ textTransform: "none" }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddProperties}
              color="primary"
              sx={{ textTransform: "none" }}
            >
              Add Selected Properties
            </Button>
          </DialogActions>
        </Dialog>
        {/* Dialog to select features */}
        <Dialog open={openFeature} onClose={handleCloseFeature}>
          <DialogTitle>Select Features</DialogTitle>
          <DialogContent>
            <FormGroup>
              {availableFeatures
                .filter(
                  (feature) =>
                    feature.category &&
                    feature.category === editRow?.category?.name
                )
                .slice()
                .sort((a, b) => {
                  const numA =
                    parseInt(a.name.match(/\d+/)?.[0], 10) || Infinity;
                  const numB =
                    parseInt(b.name.match(/\d+/)?.[0], 10) || Infinity;
                  if (numA !== numB) return numA - numB;
                  return a.name.localeCompare(b.name);
                })
                .map((feature, i) => (
                  <div key={i}>
                    <Typography variant="subtitle1">{feature.name}</Typography>
                    {feature.featureValues
                      .slice()
                      .sort((a, b) => {
                        const numA =
                          parseInt(a.value.match(/\d+/)?.[0], 10) || Infinity;
                        const numB =
                          parseInt(b.value.match(/\d+/)?.[0], 10) || Infinity;
                        if (numA !== numB) return numA - numB;
                        return a.value.localeCompare(b.value);
                      })
                      .map((value, i) => (
                        <FormControlLabel
                          key={i}
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
            <Button
              onClick={handleCloseFeature}
              color="primary"
              sx={{ textTransform: "none" }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddFeatures}
              color="primary"
              sx={{ textTransform: "none" }}
            >
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
                    {colors.map((color, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={selectedColors.some(
                              (selected) => selected.color.id === color.id
                            )}
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
            <Button
              onClick={handleAddColorDialogClose}
              color="primary"
              sx={{ textTransform: "none" }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddColorsToProduct}
              color="primary"
              sx={{ textTransform: "none" }}
            >
              Save
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
          open={openStockUp}
          onClose={handleCloseStockUpDialog}
        >
          <DialogTitle sx={{ fontWeight: 400 }}>Up Stock</DialogTitle>
          <DialogContent
            sx={{
              width: "100%",
              borderBottom: "1px solid #ccc",
              borderTop: "1px solid #ccc",
              overflow: "auto",
              height: "450px",
              ...customScrollbarStyle,
            }}
          >
            <Box
              display="flex"
              justifyContent="end"
              alignItems="center"
              gap={2}
              mt={2}
            >
              {file && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span>{file.name}</span>
                  <IconButton
                    sx={{ color: "red", marginLeft: "10px" }}
                    onClick={handleRemoveFile}
                  >
                    <FaTimes />
                  </IconButton>
                  {/* <Button
                    variant="outlined"
                    component="span"
                    sx={{
                      color: "white",
                      ...backgroundConfig.style.backgroundPrimary,
                      "&:hover": {
                        ...backgroundConfig.style.backgroundSecondary,
                      },
                    }}
                    onClick={handleSaveFile}
                  >
                    Save
                  </Button> */}
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
                    ...backgroundConfig.style.backgroundPrimary,
                    "&:hover": {
                      ...backgroundConfig.style.backgroundSecondary,
                    },
                  }}
                  startIcon={<FaPlus />}
                >
                  Upload File
                </Button>
              </label>
            </Box>
            <Typography
              sx={{
                ...textConfig.style.headerText,
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Information Up Stock
            </Typography>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="flex-start"
              width="100%"
              my={2}
            >
              <Grid item xs={12} md={12}>
                <TextField
                  margin="dense"
                  label="Order code"
                  name="orderCode"
                  onChange={handleOrderCodeChange}
                  fullWidth
                />
              </Grid>
              {imageUrl.length > 0 ? (
                imageUrl.map((image, index) => (
                  <Grid key={index} item xs={12} md={6}>
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
                        src={image}
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
                <Grid item xs={12} md={12}>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    align="center"
                    my={2}
                  >
                    There are no images.
                  </Typography>
                </Grid>
              )}
            </Grid>

            <ImageUploader handleUpload={setImageUrl} />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseStockUpDialog}
              color="primary"
              sx={{ textTransform: "none" }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveFile}
              color="primary"
              sx={{ textTransform: "none" }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Stack>
  );
};

export default ManageProduct;
