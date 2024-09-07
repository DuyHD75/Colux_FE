import React from "react";
import { Box, Container } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const ProductCategories = () => {
  const { categories } = useSelector((state) => state.categories);
  const { productCategory } = useParams(); 

  return (
    <Container maxWidth="lg" className="my-10">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {categories.map((category, index) => (
          <Link
            key={index}
            to={`/products/${category.name}`}
            style={{ textDecoration: "none" }}
          >
            <Box
              className="border-2 border-solid border-black"
              sx={{
                marginY: 1,
                width: category.name === productCategory ? 120 : 100,
                height: category.name === productCategory ? 120 : 100,
                ":hover": {
                    width: 120,
                    height: 120
                },
                backgroundColor: `${category.color}`, 
              }}
            />
          </Link>
        ))}
      </Box>
    </Container>
  );
};

export default ProductCategories;
