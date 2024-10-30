import React, { Fragment, useEffect, useState } from "react";
import Navigate from "../components/commons/Navigate";
import { Box } from "@mui/material";
import ColorDetailIfno from "../components/commons/ColorDetailInfo";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setGlobalLoading } from "../redux/reducer/globalLoadingSlice";
import colorsApi from "../api/modules/colors.api";
import { toast } from "react-toastify";
import AdvisoryBanner from "../components/commons/AdvisoryBanner";
import ContactForm from "../components/commons/ContactForm";

const ColorDetail = () => {
  const dispatch = useDispatch();
  const { colorId } = useParams();
  const [color, setColor] = useState(null);

  useEffect(() => {
    const getColorDetail = async () => {
      dispatch(setGlobalLoading(true));
      try {
        const { response } = await colorsApi.getColorByColorId(colorId);

        if (response && response.code === 200) {
          setColor(response.data.color);
        } else {
          toast.error(response.exception);
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

  return (
    <Fragment>
      <Box sx={{ marginTop: { xs: "56px", md: "96px" } }}>
        <Navigate />
        {color && <ColorDetailIfno color={color} />}
        <AdvisoryBanner></AdvisoryBanner>
        <ContactForm></ContactForm>
      </Box>
    </Fragment>
  );
};

export default ColorDetail;
