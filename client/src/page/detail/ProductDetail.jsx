import React, { Fragment } from "react";
import Navigate from "../../components/commons/Navigate";
import { Box } from "@mui/material";
import ProductDetailInfo from "../../components/commons/ProductDetailInfo"


const ProductDetail = () => {
  const selectedProduct =  JSON.parse(localStorage.getItem("selectedProduct"));

  if (!selectedProduct) {
    return <div>Product not found</div>; 
  }
  
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
