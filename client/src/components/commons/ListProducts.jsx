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
  // const products = useSelector((state) => state.products.products);
  const categories = useSelector((state) => state.categories.categories);
  const [ products, setProducts ] = useState([]);
  const { productCategory } = useParams(); 

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 16;
  const [pageIndex, setPageIndex] = useState(0);
  console.log(pageIndex);
  console.log(productsPerPage);
  
  

  const [selectedRating, setSelectedRating] = useState([]);
  const [selectedSurface, setSelectedSurface] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectCategory, setSelectedCategory] = useState([]);

  
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('PageIndex:', pageIndex); 
    console.log('ProductsPerPage:', productsPerPage);
    const getAllProductPageAble = async (page, size) => {
      dispatch(setGlobalLoading(true)); 
      try {
        const { response, err } = await productsApi.getAllProductPageAble(page, size);
        console.log(response);
        
        if(response) {
          setProducts([...response.data.products.content])
        } else if (err) {
          toast.error(err)
        }
      } catch (error) {
        console.log("Error", error);
        toast.error("An error occurred while fetching products.")
      } finally {
        dispatch(setGlobalLoading(false)); 
      }
    }
    getAllProductPageAble(pageIndex, productsPerPage);
  }, [dispatch, pageIndex, productsPerPage])

  const categoryMap = {
    "Interior-Paint": 1,
    "Exterior-Paint": 2,
    Bedroom: 3,
    "Living-Room": 4,
    "Kitchen-Room": 5,
    "Dining-Room": 6,
    Floor: 7,
    "Wall-Decal": 8,
  };

  const selectedCategoryId = productCategory
    ? categoryMap[productCategory.replace(/\s+/g, "-")] || ""
    : ""; 

  useEffect(() => {
    setSelectedCategory(selectedCategoryId || "");
  }, [productCategory, selectedCategoryId]);
  
  useEffect(() => {
    const newFilteredProducts = products.filter((product) => {
      const matchesCategory = selectedCategoryId
        ? product.category.categoryId === selectedCategoryId
        : true;
      const matchesRating =
        selectedRating.length > 0
          ? selectedRating.includes(product.ratingAverage)
          : true;
      const matchesSurface =
        selectedSurface.length > 0
          ? selectedSurface.includes(product.applicableSurface)
          : true;
      const matchesFeatures =
        selectedFeatures.length > 0
          ? selectedFeatures.every((feature) =>
              product.features.includes(feature)
            )
          : true;

      return (
        matchesCategory && matchesRating && matchesSurface && matchesFeatures
      );
    });

    setFilteredProducts(newFilteredProducts);
    setCurrentPage(1);
  }, [
    selectedRating,
    selectedSurface,
    selectedFeatures,
    selectedCategoryId,
    products,
  ]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleFiltersChange = (filterType, values) => {
    if (filterType === "rating") {
      setSelectedRating(values);
    } else if (filterType === "surface") {
      setSelectedSurface(values);
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
            category={selectedCategoryId}
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
