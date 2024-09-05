import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Pagination } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import SidebarFilters from '../commons/SidebarFilters';
import ProductCard from './ProductCard';

const ListProducts = () => {
  const products = useSelector((state) => state.products.products);
  const categories = useSelector((state) => state.categories.categories);
  const { categoryId } = useParams(); // Sử dụng categoryId từ URL

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 18;

  const [selectedRating, setSelectedRating] = useState([]);
  const [selectedSurface, setSelectedSurface] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState(categoryId || "");

  useEffect(() => {
    setSelectedCategory(categoryId || "");
  }, [categoryId]);

  useEffect(() => {
    const newFilteredProducts = products.filter((product) => {
      const matchesCategory = selectedCategory ? product.categoryId === parseInt(selectedCategory) : true;
      const matchesRating = selectedRating.length > 0 ? selectedRating.includes(product.rating) : true;
      const matchesSurface = selectedSurface.length > 0 ? selectedSurface.includes(product.surface) : true;
      const matchesFeatures = selectedFeatures.length > 0 
        ? selectedFeatures.every((feature) => product.features.includes(feature))
        : true;

      return matchesCategory && matchesRating && matchesSurface && matchesFeatures;
    });

    setFilteredProducts(newFilteredProducts);
    setCurrentPage(1); 
  }, [selectedRating, selectedSurface, selectedFeatures, selectedCategory, products]);

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
    <Container maxWidth="lg" className="my-10">
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <SidebarFilters
            category={selectedCategory}
            onChange={handleFiltersChange}
          />
        </Grid>

        <Grid item xs={12} md={9}>
          <Grid container spacing={3}>
            {hasProducts ? (
              filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage).map((product) => (
                <Grid item xs={6} sm={4} md={3} key={product.id}>
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
