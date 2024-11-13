import {
  Box,
  Stack,
  Typography,
  Button,
  Grid,
  TextField,
  Select,
  MenuItem,
  TextareaAutosize,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  FormGroup,
  FormControlLabel,
  Checkbox,
  DialogActions,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import textConfig from "../config/text.config";
import { FieldArray, useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import productsApi from "../api/modules/product.api";
import ImageUploader from "../components/common/ImageUploader";
import CloseIcon from "@mui/icons-material/Close";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [variants, setVariants] = useState([]);
  const [availableFeatures, setAvailableFeatures] = useState([]);
  const [availableProperties, setAvailableProperties] = useState([]);

  const [openFeature, setOpenFeature] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [openProperties, setOpenProperties] = useState(false);
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

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

  const getAllSuppliers = async () => {
    try {
      const { response, err } = await productsApi.getAllSuppliers();
      if (response) {
        setSuppliers([...response.data.suppliers]);
      } else if (err) {
        toast.error(err);
      }
    } catch (error) {
      console.log("Error", error);
      toast.error("An error occurred while fetching brands.");
    }
  };

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

  const formikProductInfo = useFormik({
    initialValues: {
      productName: "",
      description: "",
      code: "",
      placeOfOrigin: "",
      warranty: "",
      applicableSurface: "",
      brandId: "",
      categoryId: "",
      supplierId: "",
      images: selectedImage ? selectedImage.images : [],
      featureValueIds: [],
      propertyValueIds: [],
    },
    validationSchema: Yup.object({
      productName: Yup.string().required("Required"),
      code: Yup.string()
        // .matches(/^COLUX-\d{7}$/, "Code must be in the format COLUX-0000001")
        .required("Required!"),
      placeOfOrigin: Yup.string().required("Required!"),
      warranty: Yup.string().required("Required!"),
      applicableSurface: Yup.string().required("Required!"),
      description: Yup.string().required("Required!"),
      categoryId: Yup.string().required("Category is required!"),
      supplierId: Yup.string().required("SupplierId is required!"),
      brandId: Yup.string().required("Brand is required!"),
    }),
    onSubmit: async (values) => {
      try {
        const featureIds = selectedFeatures.map((feature) => feature.id);
        const propertyIds = selectedProperties.map((property) => property.id);
        const images = selectedImage.images.map((image) => image.url);
        values.featureValueIds = featureIds;
        values.propertyValueIds = propertyIds;

        if (selectedImage && selectedImage.images.length > 0) {
          values.images = images;
        }

        // alert(JSON.stringify(values, null, 2));
        const { response, err } = await productsApi.createProduct(values);

        if (response) {
          formikProductInfo.resetForm();
          setSelectedProperties([]);
          setSelectedFeatures([]);
          toast.success(response.message);
        } else {
          toast.error(err.exception);
        }
      } catch (error) {
        toast.error("An error occurred");
      }
    },
  });

  const formikBrandInfo = useFormik({
    initialValues: {
      name: "",
      code: "",
      status: "open",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      code: Yup.string()
        // .matches(/^BR-\d{6}$/, "Code must be in the format BR-000001")
        .required("Required!"),
    }),
    onSubmit: async (values) => {
      const { response, err } = await productsApi.addBrand(values);
      try {
        if (response) {
          getAllBrands();
          formikBrandInfo.resetForm();
          toast.success(response.message);
        } else {
          toast.error(err.exception);
        }
      } catch (error) {
        toast.error("An error occurred");
      }
    },
  });

  const formikSupplierInfo = useFormik({
    initialValues: {
      name: "",
      code: "",
      phone: "",
    },
    code: Yup.string()
      // .matches(/^SUP-\d{6}$/, "Code must be in the format SUP-000001")
      .required("Required!"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone must be a valid 10-digit number")
      .required("Required!"),
    onSubmit: async (values) => {
      try {
        const { response, err } = await productsApi.addSupplier(values);

        if (response) {
          getAllSuppliers();
          formikSupplierInfo.resetForm();
          toast.success(response.message);
        } else {
          toast.error(err.exception);
        }
      } catch (error) {
        toast.error("An error occurred");
      }
    },
  });
  const formikPropertyInfo = useFormik({
    initialValues: [
      {
        name: "",
        description: "",
        propertyValues: [""],
      },
    ],
    validationSchema: Yup.array().of(
      Yup.object({
        name: Yup.string().required("Required"),
        description: Yup.string().required("Required"),
        propertyValues: Yup.array()
          .of(Yup.string().required("Property value is required"))
          .min(1, "At least one property value is required"),
      })
    ),
    onSubmit: async (values) => {
      try {
        const { response, err } = await productsApi.addProperties(values);
        if (response) {
          getAllProperties();
          toast.success(response.message);
          formikPropertyInfo.resetForm();
        } else {
          toast.error(err.exception);
        }
      } catch (error) {
        toast.error("An error occurred");
      }
    },
  });

  const formikFeatureInfo = useFormik({
    initialValues: [
      {
        name: "",
        description: "",
        featureValue: [""],
      },
    ],
    validationSchema: Yup.array().of(
      Yup.object({
        name: Yup.string().required("Required"),
        description: Yup.string().required("Required"),
        featureValue: Yup.array()
          .of(Yup.string().required("Feature value is required"))
          .min(1, "At least one Feature value is required"),
      })
    ),
    onSubmit: async (values) => {
      try {
        const { response, err } = await productsApi.addFeatures(values);
        if (response) {
          getAllFeatures();
          toast.success(response.message);
          formikFeatureInfo.resetForm();
        } else {
          toast.error(err.exception);
        }
      } catch (error) {
        toast.error("An error occurred");
      }
    },
  });

  const dispatch = useDispatch();

  useEffect(() => {
    getAllcategory();
  }, [dispatch]);

  useEffect(() => {
    getAllBrands();
  }, [dispatch]);

  useEffect(() => {
    getAllSuppliers();
  }, [dispatch]);

  useEffect(() => {
    getAllFeatures();
  }, [dispatch]);

  useEffect(() => {
    getAllProperties();
  }, [dispatch]);

  useEffect(() => {
    if (imageUrl && imageUrl.length > 0) {
      setSelectedImage((prev) => {
        const updatedImages = [];

        const newImages = imageUrl.map((url) => ({
          imageId: null,
          url: url,
        }));

        updatedImages.push(...newImages);

        return { images: updatedImages };
      });
    }
  }, [imageUrl]);

  const handleAddClickFeature = () => {
    setOpenFeature(true);
  };

  const handleCloseFeature = () => {
    setOpenFeature(false);
    // setSelectedFeatures([]);
  };

  const handleAddClickProperties = () => {
    setOpenProperties(true);
  };

  const handleCloseProperties = () => {
    setOpenProperties(false);
    // setSelectedProperties([]);
  };

  const handleFeatureChange = (featureId, value, featureValueId, name) => {
    const featureIndex = selectedFeatures.findIndex(
      (f) => f.feature.featureId === featureId
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
        { value, feature: { featureId, name }, id: featureValueId },
      ]);
    }
  };

  const handlePropertiesChange = (propertyId, value, propertyValueId, name) => {
    const propertyIndex = selectedProperties.findIndex(
      (p) => p.property.propertyId === propertyId
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
        { value, property: { propertyId, name }, id: propertyValueId },
      ]);
    }
  };

  const handleDeleteImage = (index) => {
    setSelectedImage((prevState) => {
      const newImages = [...prevState.images];
      newImages.splice(index, 1);
      return { ...prevState, images: newImages };
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

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
        <Box display="flex" alignItems="center">
          <IconButton onClick={handleBack} color="inherit">
            <ArrowBack />
          </IconButton>
          <Typography
            sx={{
              ...textConfig.style.headerText,
              fontSize: "1.5rem",
            }}
          >
            Add Product
          </Typography>
        </Box>

        <form onSubmit={formikProductInfo.handleSubmit}>
          <Typography
            sx={{
              ...textConfig.style.headerText,
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            General Infomation{" "}
          </Typography>

          <Stack direction="row" spacing={1} mt={1}>
            <Stack direction="column" width="100%">
              <Typography
                sx={{
                  ...textConfig.style.headerText,
                  fontSize: "14px",
                  color: "text.secondary",
                }}
              >
                Name
              </Typography>
              <TextField
                name="productName"
                onChange={formikProductInfo.handleChange}
                onBlur={formikProductInfo.handleBlur}
                value={formikProductInfo.values.productName}
                type="text"
                placeholder="Name"
                size="small"
                sx={{ width: "100%" }}
              />
              {formikProductInfo.touched.productName &&
              formikProductInfo.errors.productName ? (
                <div className="text-red-500 text-sm mt-1">
                  {formikProductInfo.errors.productName}
                </div>
              ) : null}
            </Stack>
            <Stack direction="column" width="100%">
              <Typography
                sx={{
                  ...textConfig.style.headerText,
                  fontSize: "14px",
                  color: "text.secondary",
                }}
              >
                Code
              </Typography>
              <TextField
                name="code"
                onChange={formikProductInfo.handleChange}
                onBlur={formikProductInfo.handleBlur}
                value={formikProductInfo.values.code}
                type="text"
                placeholder="Code"
                size="small"
                sx={{ width: "100%" }}
              />
              {formikProductInfo.touched.code &&
              formikProductInfo.errors.code ? (
                <div className="text-red-500 text-sm mt-1">
                  {formikProductInfo.errors.code}
                </div>
              ) : null}
            </Stack>
            <Stack direction="column" width="100%">
              <Typography
                sx={{
                  ...textConfig.style.headerText,
                  fontSize: "14px",
                  color: "text.secondary",
                }}
              >
                Origin
              </Typography>
              <TextField
                name="placeOfOrigin"
                onChange={formikProductInfo.handleChange}
                onBlur={formikProductInfo.handleBlur}
                value={formikProductInfo.values.placeOfOrigin}
                type="text"
                placeholder="Origin"
                size="small"
                sx={{ width: "100%" }}
              />
              {formikProductInfo.touched.placeOfOrigin &&
              formikProductInfo.errors.placeOfOrigin ? (
                <div className="text-red-500 text-sm mt-1">
                  {formikProductInfo.errors.placeOfOrigin}
                </div>
              ) : null}
            </Stack>
            <Stack direction="column" width="100%">
              <Typography
                sx={{
                  ...textConfig.style.headerText,
                  fontSize: "14px",
                  color: "text.secondary",
                }}
              >
                Warranty
              </Typography>
              <TextField
                name="warranty"
                onChange={formikProductInfo.handleChange}
                onBlur={formikProductInfo.handleBlur}
                value={formikProductInfo.values.warranty}
                type="text"
                placeholder="Warranty"
                size="small"
                sx={{ width: "100%" }}
              />
              {formikProductInfo.touched.warranty &&
              formikProductInfo.errors.warranty ? (
                <div className="text-red-500 text-sm mt-1">
                  {formikProductInfo.errors.warranty}
                </div>
              ) : null}
            </Stack>
            <Stack direction="column" width="100%">
              <Typography
                sx={{
                  ...textConfig.style.headerText,
                  fontSize: "14px",
                  color: "text.secondary",
                }}
              >
                Surface
              </Typography>
              <TextField
                name="applicableSurface"
                onChange={formikProductInfo.handleChange}
                onBlur={formikProductInfo.handleBlur}
                value={formikProductInfo.values.applicableSurface}
                type="text"
                placeholder="Surface"
                size="small"
                sx={{ width: "100%" }}
              />
              {formikProductInfo.touched.applicableSurface &&
              formikProductInfo.errors.applicableSurface ? (
                <div className="text-red-500 text-sm mt-1">
                  {formikProductInfo.errors.applicableSurface}
                </div>
              ) : null}
            </Stack>
          </Stack>
          <Typography
            sx={{
              ...textConfig.style.headerText,
              mt: "1rem",
              color: "text.secondary",
              fontSize: "14px",
            }}
          >
            Description
          </Typography>
          <TextareaAutosize
            name="description"
            onChange={formikProductInfo.handleChange}
            onBlur={(e) => {
              formikProductInfo.handleBlur(e);
              e.target.style.borderColor = "#ccc";
            }}
            onFocus={(e) => (e.target.style.borderColor = "#1976d2")}
            value={formikProductInfo.values.description}
            minRows={3}
            maxRows={6}
            placeholder="Description"
            size="small"
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "16px",
              border: "1px solid #ccc", // Add a border here
              borderRadius: "4px", // Optional: add rounded corners
              outline: "none",
            }}
          />
          {formikProductInfo.touched.description &&
          formikProductInfo.errors.description ? (
            <div className="text-red-500 text-sm mt-1">
              {formikProductInfo.errors.description}
            </div>
          ) : null}

          <Stack direction="row" spacing={2} mt="1rem">
            <Stack direction="column" width="50%">
              <Typography
                sx={{
                  ...textConfig.style.headerText,
                  color: "text.secondary",
                  fontSize: "14px",
                }}
              >
                Category
              </Typography>
              <Select
                name="categoryId"
                onChange={formikProductInfo.handleChange}
                onBlur={formikProductInfo.handleBlur}
                value={formikProductInfo.values.categoryId}
                size="small"
                sx={{ width: "100%" }}
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
              {formikProductInfo.touched.categoryId &&
              formikProductInfo.errors.categoryId ? (
                <div className="text-red-500 text-sm mt-1">
                  {formikProductInfo.errors.categoryId}
                </div>
              ) : null}
            </Stack>

            <Stack direction="column" width="50%">
              <Typography
                sx={{
                  ...textConfig.style.headerText,
                  color: "text.secondary",
                  fontSize: "14px",
                }}
              >
                Brand
              </Typography>
              <Select
                name="brandId"
                onChange={formikProductInfo.handleChange}
                onBlur={formikProductInfo.handleBlur}
                value={formikProductInfo.values.brandId || ""}
                size="small"
                sx={{ width: "100%" }}
              >
                {brands.map((brand) => (
                  <MenuItem key={brand.brandId} value={brand.brandId}>
                    {brand.name}
                  </MenuItem>
                ))}
              </Select>
              {formikProductInfo.touched.brandId &&
              formikProductInfo.errors.brandId ? (
                <div className="text-red-500 text-sm mt-1">
                  {formikProductInfo.errors.brandId}
                </div>
              ) : null}
            </Stack>

            <Stack direction="column" width="50%">
              <Typography
                sx={{
                  ...textConfig.style.headerText,
                  color: "text.secondary",
                  fontSize: "14px",
                }}
              >
                Supplier
              </Typography>
              <Select
                name="supplierId"
                onChange={formikProductInfo.handleChange}
                onBlur={formikProductInfo.handleBlur}
                value={formikProductInfo.values.supplierId || ""}
                size="small"
                sx={{ width: "100%" }}
              >
                {suppliers.map((supplier, index) => (
                  <MenuItem
                    key={index}
                    value={supplier.id}
                  >
                    {supplier.name}
                  </MenuItem>
                ))}
              </Select>
              {formikProductInfo.touched.supplierId &&
              formikProductInfo.errors.supplierId ? (
                <div className="text-red-500 text-sm mt-1">
                  {formikProductInfo.errors.supplierId}
                </div>
              ) : null}
            </Stack>
          </Stack>

          <Stack direction="row" spacing={2} width="100%" my={2}>
            <Stack
              width="50%"
              spacing={1}
              justifyContent="space-between"
              display="flex"
            >
              <div>
                <Typography
                  sx={{
                    ...textConfig.style.headerText,
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Properties
                </Typography>

                <Stack direction="row" spacing={1} flexWrap="wrap" width="100%">
                  {selectedProperties?.map((property, index) => (
                    <Chip
                      key={index}
                      label={`${property.property.name}: ${
                        property.value || "N/A"
                      }`}
                      onDelete={() => {
                        const updatedProperties = selectedProperties.filter(
                          (_, i) => i !== index
                        );
                        setSelectedProperties(updatedProperties);
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
                <Typography
                  sx={{
                    ...textConfig.style.headerText,
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Features
                </Typography>

                <Stack direction="row" spacing={1} flexWrap="wrap" width="100%">
                  {selectedFeatures?.map((feature, index) => (
                    <Chip
                      key={index}
                      label={`${feature.feature.name}: ${
                        feature.value || "N/A"
                      }`}
                      onDelete={() => {
                        const updatedFeatures = selectedFeatures.filter(
                          (_, i) => i !== index
                        );
                        setSelectedFeatures(updatedFeatures);
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
          <Typography
            sx={{
              ...textConfig.style.headerText,
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
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
            {selectedImage?.images?.length > 0 ? (
              selectedImage.images.map((image, index) => (
                <Grid key={index} item xs={6} sm={4} md={3}>
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: "400px",
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

          <ImageUploader handleUpload={setImageUrl} />
          <Button
            type="submit"
            size="small"
            variant="contained"
            sx={{
              bgcolor: "#1c2759",
              textTransform: "none",
              fontSize: "14px",
              borderRadius: "10px",
              px: "1rem",
              mt: "1rem",
              "&:hover": {
                opacity: 0.9,
                bgcolor: "#1c2759",
              },
            }}
          >
            Create Product{" "}
          </Button>
        </form>

        <form onSubmit={formikBrandInfo.handleSubmit}>
          <Typography
            sx={{
              ...textConfig.style.headerText,
              fontSize: "16px",
              fontWeight: "bold",
              mt: 4,
            }}
          >
            Add Brand{" "}
          </Typography>

          <Stack direction="row" spacing={1} mt={1}>
            <Stack direction="column" width="100%">
              <Typography
                sx={{
                  ...textConfig.style.headerText,
                  fontSize: "14px",
                  color: "text.secondary",
                }}
              >
                Name
              </Typography>
              <TextField
                name="name"
                onChange={formikBrandInfo.handleChange}
                onBlur={formikBrandInfo.handleBlur}
                value={formikBrandInfo.values.name}
                type="text"
                placeholder="Name"
                size="small"
                sx={{ width: "100%" }}
              />
              {formikBrandInfo.touched.name && formikBrandInfo.errors.name ? (
                <div className="text-red-500 text-sm mt-1">
                  {formikBrandInfo.errors.name}
                </div>
              ) : null}
            </Stack>
            <Stack direction="column" width="100%">
              <Typography
                sx={{
                  ...textConfig.style.headerText,
                  fontSize: "14px",
                  color: "text.secondary",
                }}
              >
                Code
              </Typography>
              <TextField
                name="code"
                onChange={formikBrandInfo.handleChange}
                onBlur={formikBrandInfo.handleBlur}
                value={formikBrandInfo.values.code}
                type="text"
                placeholder="Code"
                size="small"
                sx={{ width: "100%" }}
              />
              {formikBrandInfo.touched.code && formikBrandInfo.errors.code ? (
                <div className="text-red-500 text-sm mt-1">
                  {formikBrandInfo.errors.code}
                </div>
              ) : null}
            </Stack>
          </Stack>

          <Button
            type="submit"
            size="small"
            variant="contained"
            sx={{
              bgcolor: "#1c2759",
              textTransform: "none",
              fontSize: "14px",
              borderRadius: "10px",
              px: "1rem",
              mt: "1rem",
              "&:hover": {
                opacity: 0.9,
                bgcolor: "#1c2759",
              },
            }}
          >
            Create Brand{" "}
          </Button>
        </form>

        <form onSubmit={formikSupplierInfo.handleSubmit}>
          <Typography
            sx={{
              ...textConfig.style.headerText,
              fontSize: "16px",
              fontWeight: "bold",
              mt: 4,
            }}
          >
            Add Supplier{" "}
          </Typography>

          <Stack direction="row" spacing={1} mt={1}>
            <Stack direction="column" width="100%">
              <Typography
                sx={{
                  ...textConfig.style.headerText,
                  fontSize: "14px",
                  color: "text.secondary",
                }}
              >
                Name
              </Typography>
              <TextField
                name="name"
                onChange={formikSupplierInfo.handleChange}
                onBlur={formikSupplierInfo.handleBlur}
                value={formikSupplierInfo.values.name}
                type="text"
                placeholder="Name"
                size="small"
                sx={{ width: "100%" }}
              />
              {formikSupplierInfo.touched.name &&
              formikSupplierInfo.errors.name ? (
                <div className="text-red-500 text-sm mt-1">
                  {formikSupplierInfo.errors.name}
                </div>
              ) : null}
            </Stack>
            <Stack direction="column" width="100%">
              <Typography
                sx={{
                  ...textConfig.style.headerText,
                  fontSize: "14px",
                  color: "text.secondary",
                }}
              >
                Code
              </Typography>
              <TextField
                name="code"
                onChange={formikSupplierInfo.handleChange}
                onBlur={formikSupplierInfo.handleBlur}
                value={formikSupplierInfo.values.code}
                type="text"
                placeholder="Code"
                size="small"
                sx={{ width: "100%" }}
              />
              {formikSupplierInfo.touched.code &&
              formikSupplierInfo.errors.code ? (
                <div className="text-red-500 text-sm mt-1">
                  {formikSupplierInfo.errors.code}
                </div>
              ) : null}
            </Stack>
            <Stack direction="column" width="100%">
              <Typography
                sx={{
                  ...textConfig.style.headerText,
                  fontSize: "14px",
                  color: "text.secondary",
                }}
              >
                Phone
              </Typography>
              <TextField
                name="phone"
                onChange={formikSupplierInfo.handleChange}
                onBlur={formikSupplierInfo.handleBlur}
                value={formikSupplierInfo.values.phone}
                type="text"
                placeholder="Code"
                size="small"
                sx={{ width: "100%" }}
              />
              {formikSupplierInfo.touched.phone &&
              formikSupplierInfo.errors.phone ? (
                <div className="text-red-500 text-sm mt-1">
                  {formikSupplierInfo.errors.phone}
                </div>
              ) : null}
            </Stack>
          </Stack>

          <Button
            type="submit"
            size="small"
            variant="contained"
            sx={{
              bgcolor: "#1c2759",
              textTransform: "none",
              fontSize: "14px",
              borderRadius: "10px",
              px: "1rem",
              mt: "1rem",
              "&:hover": {
                opacity: 0.9,
                bgcolor: "#1c2759",
              },
            }}
          >
            Create Supplier{" "}
          </Button>
        </form>
        <Box display="flex" gap={2}>
          <form
            style={{ width: "50%" }}
            onSubmit={formikPropertyInfo.handleSubmit}
          >
            <Typography sx={{ fontSize: "16px", fontWeight: "bold", mt: 4, ...textConfig.style.basicFont }}>
              Add Properties
            </Typography>
            {formikPropertyInfo.values.map((property, index) => (
              <div key={index}>
                <Stack direction="row" spacing={1} mt={1}>
                  <Stack direction="column" width="100%">
                    <Typography
                      sx={{
                        ...textConfig.style.headerText,
                        fontSize: "14px",
                        color: "text.secondary",
                      }}
                    >
                      Property Name
                    </Typography>
                    <TextField
                      name={`[${index}].name`}
                      onChange={formikPropertyInfo.handleChange}
                      onBlur={formikPropertyInfo.handleBlur}
                      value={property.name}
                      type="text"
                      placeholder="Property Name"
                      size="small"
                      sx={{ width: "100%" }}
                    />
                    {formikPropertyInfo.touched.name &&
                    formikPropertyInfo.errors.name ? (
                      <div className="text-red-500 text-sm mt-1">
                        {formikPropertyInfo.errors.name}
                      </div>
                    ) : null}
                  </Stack>
                  <Stack direction="column" width="100%">
                    <Typography
                      sx={{
                        ...textConfig.style.headerText,
                        fontSize: "14px",
                        color: "text.secondary",
                      }}
                    >
                      Property Description
                    </Typography>
                    <TextField
                      name={`[${index}].description`}
                      onChange={formikPropertyInfo.handleChange}
                      onBlur={formikPropertyInfo.handleBlur}
                      value={property.description}
                      type="text"
                      placeholder="Property Description"
                      size="small"
                      sx={{ width: "100%" }}
                    />
                    {formikPropertyInfo.touched.description &&
                    formikPropertyInfo.errors.description ? (
                      <div className="text-red-500 text-sm mt-1">
                        {formikPropertyInfo.errors.description}
                      </div>
                    ) : null}
                  </Stack>
                </Stack>
                {property.propertyValues.map((val, valIndex) => (
                  <Stack key={valIndex} direction="column" width="100%" mt={2}>
                    <Typography
                      sx={{
                        ...textConfig.style.headerText,
                        fontSize: "14px",
                        color: "text.secondary",
                      }}
                    >
                      Property Value
                    </Typography>
                    <Box
                      display="flex"
                      alignItems="center"
                      gap={2}
                      justifyContent="space-between"
                    >
                      <TextField
                        name={`[${index}].propertyValues[${valIndex}]`}
                        onChange={formikPropertyInfo.handleChange}
                        onBlur={formikPropertyInfo.handleBlur}
                        value={val}
                        type="text"
                        placeholder="Property Value"
                        size="small"
                        sx={{
                          width: "60%",
                        }}
                      />
                      {formikPropertyInfo.touched.propertyValues &&
                      formikPropertyInfo.errors.propertyValues ? (
                        <div className="text-red-500 text-sm mt-1">
                          {formikPropertyInfo.errors.propertyValues}
                        </div>
                      ) : null}

                      <Button
                        size="small"
                        variant="contained"
                        sx={{
                          bgcolor: "#f44336",
                          textTransform: "none",
                          fontSize: "14px",
                          borderRadius: "10px",
                          px: "1rem",
                          width: "40%",
                          minWidth: "120px",
                          "&:hover": {
                            opacity: 0.9,
                            bgcolor: "#f44336",
                          },
                        }}
                        onClick={(e) => {
                          e.preventDefault();

                          const updatedPropertyValues =
                            property.propertyValues.filter(
                              (_, indexToRemove) => indexToRemove !== valIndex
                            );
                          formikPropertyInfo.setFieldValue(
                            `[${index}].propertyValues`,
                            updatedPropertyValues
                          );
                        }}
                      >
                        Remove Property Value
                      </Button>
                    </Box>
                  </Stack>
                ))}

                <Button
                  size="small"
                  variant="contained"
                  sx={{
                    bgcolor: "#1c2759",
                    textTransform: "none",
                    fontSize: "14px",
                    borderRadius: "10px",
                    px: "1rem",
                    mt: "1rem",
                    "&:hover": {
                      opacity: 0.9,
                      bgcolor: "#1c2759",
                    },
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    const updatedPropertyValues = [
                      ...property.propertyValues,
                      "",
                    ];
                    formikPropertyInfo.setFieldValue(
                      `[${index}].propertyValues`,
                      updatedPropertyValues
                    );
                  }}
                >
                  Add Property Value
                </Button>

                <Button
                  size="small"
                  variant="contained"
                  sx={{
                    bgcolor: "#f44336",
                    textTransform: "none",
                    fontSize: "14px",
                    borderRadius: "10px",
                    px: "1rem",
                    mt: "1rem",
                    ml: 4,
                    "&:hover": {
                      opacity: 0.9,
                      bgcolor: "#f44336",
                    },
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    const updatedProperties = formikPropertyInfo.values.filter(
                      (_, indexToRemove) => indexToRemove !== index
                    );
                    formikPropertyInfo.setValues(updatedProperties);
                  }}
                >
                  Remove Property
                </Button>
              </div>
            ))}

            <Button
              size="small"
              variant="contained"
              sx={{
                bgcolor: "#1c2759",
                textTransform: "none",
                fontSize: "14px",
                borderRadius: "10px",
                px: "1rem",
                mt: "1rem",
                "&:hover": {
                  opacity: 0.9,
                  bgcolor: "#1c2759",
                },
              }}
              onClick={(e) => {
                e.preventDefault();
                const newProperty = {
                  name: "",
                  description: "",
                  propertyValues: [""],
                };
                formikPropertyInfo.setValues([
                  ...formikPropertyInfo.values,
                  newProperty,
                ]);
              }}
            >
              Add Property
            </Button>

            <Button
              type="submit"
              size="small"
              variant="contained"
              sx={{
                bgcolor: "#1c2759",
                textTransform: "none",
                fontSize: "14px",
                borderRadius: "10px",
                px: "1rem",
                mt: "1rem",
                ml: 4,
                "&:hover": {
                  opacity: 0.9,
                  bgcolor: "#1c2759",
                },
              }}
            >
              Create Properties
            </Button>
          </form>
          <form
            style={{ width: "50%" }}
            onSubmit={formikFeatureInfo.handleSubmit}
          >
            <Typography sx={{ fontSize: "16px", fontWeight: "bold", mt: 4, ...textConfig.style.basicFont }}>
              Add Feature
            </Typography>
            {formikFeatureInfo.values.map((feature, index) => (
              <div key={index}>
                <Stack direction="row" spacing={1} mt={1}>
                  <Stack direction="column" width="100%">
                    <Typography
                      sx={{
                        ...textConfig.style.headerText,
                        fontSize: "14px",
                        color: "text.secondary",
                      }}
                    >
                      Feature Name
                    </Typography>
                    <TextField
                      name={`[${index}].name`}
                      onChange={formikFeatureInfo.handleChange}
                      onBlur={formikFeatureInfo.handleBlur}
                      value={feature.name}
                      type="text"
                      placeholder="Feature Name"
                      size="small"
                      sx={{ width: "100%" }}
                    />
                    {formikFeatureInfo.touched.name &&
                    formikFeatureInfo.errors.name ? (
                      <div className="text-red-500 text-sm mt-1">
                        {formikFeatureInfo.errors.name}
                      </div>
                    ) : null}
                  </Stack>
                  <Stack direction="column" width="100%">
                    <Typography
                      sx={{
                        ...textConfig.style.headerText,
                        fontSize: "14px",
                        color: "text.secondary",
                      }}
                    >
                      Feature Description
                    </Typography>
                    <TextField
                      name={`[${index}].description`}
                      onChange={formikFeatureInfo.handleChange}
                      onBlur={formikFeatureInfo.handleBlur}
                      value={feature.description}
                      type="text"
                      placeholder="Feature Description"
                      size="small"
                      sx={{ width: "100%" }}
                    />
                    {formikFeatureInfo.touched.description &&
                    formikFeatureInfo.errors.description ? (
                      <div className="text-red-500 text-sm mt-1">
                        {formikFeatureInfo.errors.description}
                      </div>
                    ) : null}
                  </Stack>
                </Stack>

                {feature.featureValue.map((val, valIndex) => (
                  <Stack key={valIndex} direction="column" width="100%" mt={2}>
                    <Typography
                      sx={{
                        ...textConfig.style.headerText,
                        fontSize: "14px",
                        color: "text.secondary",
                      }}
                    >
                      Feature Value
                    </Typography>
                    <Box
                      display="flex"
                      alignItems="center"
                      gap={2}
                      justifyContent="space-between"
                    >
                      <TextField
                        name={`[${index}].featureValue[${valIndex}]`}
                        onChange={formikFeatureInfo.handleChange}
                        onBlur={formikFeatureInfo.handleBlur}
                        value={val}
                        type="text"
                        placeholder="Feature Value"
                        size="small"
                        sx={{
                          width: "60%",
                        }}
                      />
                      {formikFeatureInfo.touched.featureValue &&
                      formikFeatureInfo.errors.featureValue ? (
                        <div className="text-red-500 text-sm mt-1">
                          {formikFeatureInfo.errors.featureValue}
                        </div>
                      ) : null}

                      <Button
                        size="small"
                        variant="contained"
                        sx={{
                          bgcolor: "#f44336",
                          textTransform: "none",
                          fontSize: "14px",
                          borderRadius: "10px",
                          px: "1rem",
                          width: "40%",
                          minWidth: "120px",
                          "&:hover": {
                            opacity: 0.9,
                            bgcolor: "#f44336",
                          },
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          const updatedFeatureValues =
                            feature.featureValue.filter(
                              (_, indexToRemove) => indexToRemove !== valIndex
                            );
                          formikFeatureInfo.setFieldValue(
                            `[${index}].featureValue`,
                            updatedFeatureValues
                          );
                        }}
                      >
                        Remove Feature Value
                      </Button>
                    </Box>
                  </Stack>
                ))}

                <Button
                  size="small"
                  variant="contained"
                  sx={{
                    bgcolor: "#1c2759",
                    textTransform: "none",
                    fontSize: "14px",
                    borderRadius: "10px",
                    px: "1rem",
                    mt: "1rem",
                    "&:hover": {
                      opacity: 0.9,
                      bgcolor: "#1c2759",
                    },
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    const updatedFeatureValues = [...feature.featureValue, ""];
                    formikFeatureInfo.setFieldValue(
                      `[${index}].featureValue`,
                      updatedFeatureValues
                    );
                  }}
                >
                  Add Feature Value
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  sx={{
                    bgcolor: "#f44336",
                    textTransform: "none",
                    fontSize: "14px",
                    borderRadius: "10px",
                    px: "1rem",
                    mt: "1rem",
                    ml: 4,
                    "&:hover": {
                      opacity: 0.9,
                      bgcolor: "#f44336",
                    },
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    const updatedFeature = formikFeatureInfo.values.filter(
                      (_, indexToRemove) => indexToRemove !== index
                    );
                    formikFeatureInfo.setValues(updatedFeature);
                  }}
                >
                  Remove Feature
                </Button>
              </div>
            ))}
            <Button
              size="small"
              variant="contained"
              sx={{
                bgcolor: "#1c2759",
                textTransform: "none",
                fontSize: "14px",
                borderRadius: "10px",
                px: "1rem",
                mt: "1rem",
                "&:hover": {
                  opacity: 0.9,
                  bgcolor: "#1c2759",
                },
              }}
              onClick={(e) => {
                e.preventDefault();
                const newFeature = {
                  name: "",
                  description: "",
                  featureValue: [""],
                };
                formikFeatureInfo.setValues([
                  ...formikFeatureInfo.values,
                  newFeature,
                ]);
              }}
            >
              Add Feature
            </Button>

            <Button
              type="submit"
              size="small"
              variant="contained"
              sx={{
                bgcolor: "#1c2759",
                textTransform: "none",
                fontSize: "14px",
                borderRadius: "10px",
                px: "1rem",
                mt: "1rem",
                ml: 4,
                "&:hover": {
                  opacity: 0.9,
                  bgcolor: "#1c2759",
                },
              }}
            >
              Create Feature
            </Button>
          </form>
        </Box>
      </Box>
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
                            p.property.propertyId === property.propertyId &&
                            p.value === value.value
                        )}
                        onChange={(e) =>
                          handlePropertiesChange(
                            property.propertyId,
                            value.value,
                            value.id,
                            property.name
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
                            f.feature.featureId === feature.featureId &&
                            f.value === value.value
                        )}
                        onChange={(e) =>
                          handleFeatureChange(
                            feature.featureId,
                            value.value,
                            value.id,
                            feature.name
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
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default AddProduct;
