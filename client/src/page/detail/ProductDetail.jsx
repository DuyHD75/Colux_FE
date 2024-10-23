import React, { Fragment } from "react";
import Navigate from "../../components/commons/Navigate";
import { Box } from "@mui/material";
import data from "../../data/data";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductDetailInfo from "../../components/commons/ProductDetailInfo"

const colors = data.colors;

const ProductDetail = () => {
  const selectedProduct =  JSON.parse(localStorage.getItem("selectedProduct"));

  if (!selectedProduct) {
    return <div>Product not found</div>; 
  }
  console.log(selectedProduct);
  
  
  return (
    <Fragment>
      <Box sx={{ marginTop: { xs: "56px", md: "96px" } }}>
        <Navigate></Navigate>
        <ProductDetailInfo product={selectedProduct}></ProductDetailInfo>
      </Box>
    </Fragment>
  );
};
export default ProductDetail;
