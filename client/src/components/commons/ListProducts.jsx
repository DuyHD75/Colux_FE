import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SidebarFilters from "../commons/SidebarFilters";
import ProductCard from "./ProductCard";
import { setGlobalLoading } from "../../redux/reducer/globalLoadingSlice";
import productsApi from "../../api/modules/products.api";
import { toast } from "react-toastify";

const ListProducts = () => {
  const [categories, setCategories] = useState([]);

  const [products, setProducts] = useState([]);
  const { productCategoryId } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 16;
  const [pageIndex, setPageIndex] = useState(0);

  const [selectedRating, setSelectedRating] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectCategory, setSelectedCategory] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    const getAllProductPageAble = async (page, size) => {
      dispatch(setGlobalLoading(true));
      try {
        let response, err;
        if (productCategoryId) {
          ({ response, err } = await productsApi.getProductByCategory(
            productCategoryId,
            page,
            size
          ));
        } else {
          ({ response, err } = await productsApi.getAllProductPageAble(
            page,
            size
          ));
        }
        console.log(response);

        if (response) {
          setProducts([...response.data.products.content]);
        } else if (err) {
          toast.error(err);
        }
      } catch (error) {
        console.log("Error", error);
        toast.error("An error occurred while fetching products.");
      } finally {
        dispatch(setGlobalLoading(false));
      }
    };
    getAllProductPageAble(pageIndex, productsPerPage);
  }, [dispatch, pageIndex, productsPerPage, productCategoryId]);

  useEffect(() => {
    const getAllcategory = async () => {
      dispatch(setGlobalLoading(true));
      try {
        const { response, err } = await productsApi.getAllCategory();
        if (response) {
          setCategories([...response.data.categories]);
        } else if (err) {
          toast.error(err);
        }
      } catch (error) {
        console.log("Error", error);
        toast.error("An error occurred while fetching products.");
      } finally {
        dispatch(setGlobalLoading(false));
      }
    };
    getAllcategory();
  }, [dispatch]);

  useEffect(() => {
    setSelectedCategory(productCategoryId || "");
  }, [productCategoryId]);

  useEffect(() => {
    const newFilteredProducts = products.filter((product) => {
      const matchesCategory = productCategoryId
        ? product.category.categoryId === productCategoryId
        : true;
      const matchesRating =
        selectedRating.length > 0
          ? selectedRating.includes(product.ratingAverage)
          : true;
      const matchesProperty =
        selectedProperty.length > 0
          ? selectedProperty.every((selectedId) =>
              product.properties.some(
                (propertyItem) =>
                  propertyItem.property.propertyId === selectedId
              )
            )
          : true;

      const matchesFeatures =
        selectedFeatures.length > 0
          ? selectedFeatures.every((selectedId) =>
              product.features.some(
                (featureItem) => featureItem.feature.featureId === selectedId
              )
            )
          : true;

      return (
        matchesCategory && matchesRating && matchesProperty && matchesFeatures
      );
    });

    setFilteredProducts(newFilteredProducts);
    setCurrentPage(1);
  }, [
    selectedRating,
    selectedProperty,
    selectedFeatures,
    productCategoryId,
    products,
  ]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleFiltersChange = (filterType, values) => {
    if (filterType === "rating") {
      setSelectedRating(values);
    } else if (filterType === "property") {
      setSelectedProperty(values);
    } else if (filterType === "features") {
      setSelectedFeatures(values);
    } else if (filterType === "category") {
      setSelectedCategory(values[0] || "");
    }
  };

  const hasProducts = filteredProducts.length > 0;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <Container maxWidth="lg" className="my-10" sx={{ paddingBottom: "2rem" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <SidebarFilters
            categories={categories}
            category={productCategoryId}
            onChange={handleFiltersChange}
          />
        </Grid>

        <Grid item xs={12} md={9}>
          <Grid container spacing={3}>
            {hasProducts ? (
              filteredProducts
                .slice(
                  (currentPage - 1) * productsPerPage,
                  currentPage * productsPerPage
                )
                .map((product, index) => (
                  <Grid item xs={6} sm={4} md={3} key={index}>
                    <ProductCard product={product} />
                  </Grid>
                ))
            ) : (
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  minHeight: "50vh",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: "#333", textAlign: "center", mb: 2 }}
                >
                  No Products Available
                </Typography>
              </Grid>
            )}
          </Grid>

          {hasProducts && (
            <Grid container justifyContent="center" sx={{ marginTop: 3 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Grid>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ListProducts;
