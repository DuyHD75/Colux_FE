import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SidebarFilters from "../commons/SidebarFilters";
import ProductCard from "./ProductCard";
import { setGlobalLoading } from "../../redux/reducer/globalLoadingSlice";
import productsApi from "../../api/modules/products.api";
import { toast } from "react-toastify";
import textConfigs from "../../config/text.config";

const ListProducts = (productss) => {

  const { colorsSearch } = useSelector((state) => state.colorFamilies);
  const [categories, setCategories] = useState([]);

  const [products, setProducts] = useState([]);
  const { productCategory, productCategoryId } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 16;
  const [totalPages, setTotalPages] = useState(0);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);

  const dispatch = useDispatch();
  useEffect(() => {
    const getAllProductPageAble = async (page, size) => {
      dispatch(setGlobalLoading(true));
      try {
        let response, err;
        if (productCategoryId) {
          ({ response, err } = await productsApi.getProductByCategory(
            productCategoryId,
            page - 1,
            size
          ));
        } else {
          ({ response, err } = await productsApi.getAllProductPageAble(
            page - 1,
            size
          ));
        }

        if (response) {
          setProducts([...response.data.products.content]);
          setTotalPages(response.data.products.totalPages);
        } else if (err) {
          setProducts([]);
          toast.error(err);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.log("Error", error);
        toast.error("An error occurred while fetching products.");
      } finally {
        dispatch(setGlobalLoading(false));
      }
    };
    getAllProductPageAble(currentPage, productsPerPage);
  }, [dispatch, currentPage, productsPerPage, productCategoryId]);

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
        toast.error("An error occurred while fetching categories.");
      } finally {
        dispatch(setGlobalLoading(false));
      }
    };
    getAllcategory();
  }, [dispatch]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products])

  useEffect(() => {
    console.log("run useeffect");

    const fetchFilteredProducts = async () => {
      try {
        if (
          !selectedPriceRange &&
          selectedProperty.length === 0 &&
          selectedFeatures.length === 0
        ) {
          setFilteredProducts(products);
          return;
        }

        const params = [];

        if (productCategory) {
          params.push(
            `type=${encodeURIComponent(productCategory.toLowerCase())}`
          );
        }
        if (selectedFeatures.length > 0) {
          params.push(`features=${selectedFeatures.join(",")}`);
        }
        if (selectedProperty.length > 0) {
          params.push(`properties=${selectedProperty.join(",")}`);
        }

        if (selectedPriceRange) {
          let minPrice, maxPrice;
          console.log(selectedPriceRange);


          if (selectedPriceRange.includes("+")) {
            minPrice = selectedPriceRange.split("+")[0];
            maxPrice = "";
          } else {

            [minPrice, maxPrice] = selectedPriceRange.split("-");
          }

          if (minPrice) {
            params.push(`minPrice=${minPrice}`);
          }

          if (maxPrice && maxPrice !== "") {
            params.push(`maxPrice=${maxPrice}`);
          }
        }
        params.push(`page=0`);
        params.push(`size=16`);
        const queryString = params.join("&");
        console.log(queryString);

        const { response, err } = await productsApi.filterProducts(queryString);
        if (response) {
          setFilteredProducts(response.data.products.content);
        } else if (err) {
          toast.error(err);
        }

      } catch (error) {
        console.error("Error fetching filtered products:", error);
      }
    };

    fetchFilteredProducts();
  }, [
    selectedPriceRange,
    selectedProperty,
    selectedFeatures,
    productCategory,
    products,
  ]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleFiltersChange = (filterType, values) => {
    if (filterType === "priceRange") {
      setSelectedPriceRange(values);
    } else if (filterType === "property") {
      setSelectedProperty(values);
    } else if (filterType === "features") {
      setSelectedFeatures(values);
    }
  };

  useEffect(() => {
    if (colorsSearch.length > 0 && productss?.products?.products?.length === 0) {
      toast.error("Colors selected not found");
    }
  }, [colorsSearch, productss.products.products]);

  const hasProducts = filteredProducts.length > 0;

  return (
    <Container maxWidth="lg" className="my-10" sx={{ paddingBottom: "2rem" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <SidebarFilters
            categories={categories}
            category={productCategoryId}
            onChange={handleFiltersChange}
            categoryName={productCategory}
          />
        </Grid>

        <Grid item xs={12} md={9}>
          <Grid container spacing={3}>
            {productss?.products?.products?.length > 0 ? (
              productss.products.products
                .slice(0 * productsPerPage, 1 * productsPerPage)
                .map((product, index) => (
                  <Grid item xs={6} sm={4} md={3} key={index}>
                    <ProductCard product={product} />
                  </Grid>
                ))
            ) : (hasProducts ? (
              filteredProducts
                .slice(0 * productsPerPage, 1 * productsPerPage)
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
                  flex: "column",
                  alignItems: "center",
                  justifyContent: "center",
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
                  No product
                </Typography>
              </Grid>
            ))}
            {/* {hasProducts ? (
              filteredProducts
                .slice(0 * productsPerPage, 1 * productsPerPage)
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
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
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
                    No product
                  </Typography>
              </Grid>
            )} */}
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
