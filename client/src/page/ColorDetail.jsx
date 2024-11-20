import React, { Fragment, useEffect, useState } from "react";
import Navigate from "../components/commons/Navigate";
import { Box, Container } from "@mui/material";
import ColorDetailIfno from "../components/commons/ColorDetailInfo";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setGlobalLoading } from "../redux/reducer/globalLoadingSlice";
import colorsApi from "../api/modules/colors.api";
import { toast } from "react-toastify";
import AdvisoryBanner from "../components/commons/AdvisoryBanner";
import ContactForm from "../components/commons/ContactForm";
import ProductsRelated from "../components/commons/ProductRelated";
import productsApi from "../api/modules/products.api";

const ColorDetail = () => {
  const dispatch = useDispatch();
  const { colorId } = useParams();
  const [color, setColor] = useState(null);
  const [products, setProducts] = useState([]);
  const productsPerPage = 20;
  const pageIndex = 0;

  useEffect(() => {
    const getColorDetail = async () => {
      dispatch(setGlobalLoading(true));
      try {
        const { response, err } = await colorsApi.getColorByColorId(colorId);

        if (response) {
          setColor(response.data.color);
        } else {
          toast.error(err.exception);
        }
      } catch (error) {
        console.error("Error fetching color details:", error);
        toast.error("An error occurred while fetching colors.");
      } finally {
        dispatch(setGlobalLoading(false));
      }
    };

    getColorDetail();
  }, [dispatch, colorId]);

  useEffect(() => {
    const getProductByColorId = async (page, size) => {
      dispatch(setGlobalLoading(true));
      try {
        const { response, err } = await productsApi.getProductByColorId(
          colorId,
          page,
          size
        );

        if (response) {
          setProducts([...response.data.paints.content]);
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
    getProductByColorId(pageIndex, productsPerPage);
  }, [dispatch, pageIndex, productsPerPage, colorId]);

  return (
    <Fragment>
      <Box sx={{ marginTop: { xs: "56px", md: "152px" } }}>
        <Navigate />
        {color && <ColorDetailIfno color={color} products={products} />}
        {products.lenght > 0 && (
          <Container maxWidth="lg" sx={{ padding: "0px !important"}}>
            <ProductsRelated products={products} />{" "}
          </Container>
        )}
        <AdvisoryBanner></AdvisoryBanner>
        <ContactForm></ContactForm>
      </Box>
    </Fragment>
  );
};

export default ColorDetail;
