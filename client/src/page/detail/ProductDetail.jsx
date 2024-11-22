import React, { Fragment, useEffect, useState } from "react";
import Navigate from "../../components/commons/Navigate";
import { Box } from "@mui/material";
import ProductDetailInfo from "../../components/commons/ProductDetailInfo"
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import productsApi from "../../api/modules/products.api"
import { setGlobalLoading } from "../../redux/reducer/globalLoadingSlice";
import { toast } from "react-toastify";


const ProductDetail = () => {

  const dispatch = useDispatch();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProductDetail = async () => {
      dispatch(setGlobalLoading(true));
      try {
        const { response, err } = await productsApi.getProductByProductId(productId);

        if (response) {
          setProduct(response.data.product);
        } else {
          toast.error(err.exception);
        }
      } catch (error) {
        console.error("Error fetching Product details:", error);
        toast.error("An error occurred while fetching Products.");
      } finally {
        dispatch(setGlobalLoading(false));
      }
    };

    getProductDetail();
  }, [dispatch, productId]); 

  if (!product) {
    return <div>Product not found</div>; 
  }
  
  return (
    <Fragment>
      <Box sx={{ marginTop: { xs: "56px", md: "152px" } }}>
        <Navigate></Navigate>
        <ProductDetailInfo product={product}></ProductDetailInfo>
      </Box>
    </Fragment>
  );
};
export default ProductDetail;
