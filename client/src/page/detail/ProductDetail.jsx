import React, { Fragment } from "react";
import Navigate from "../../components/commons/Navigate";
import { Box } from "@mui/material";
import data from "../../data/data";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductDetailInfo from "../../components/commons/ProductDetailInfo"

const colors = data.colors;

const ProductDetail = () => {
  const products = useSelector((state) => state.products.products);
  const { productCategory, productName } = useParams();

  const selectedProduct = products.find((product) => product.name === productName);

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
