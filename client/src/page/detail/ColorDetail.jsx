import React, { Fragment } from "react";
import Navigate from "../../components/commons/Navigate";
import { Box } from "@mui/material";
import ColorDetailIfno from "../../components/commons/ColorDetailInfo";
import RoomSelector from "../../components/commons/RoomSelector";
import CustomerRooms from "../../components/commons/CustomerRooms";
import data from "../../data/data";
import { useParams } from "react-router-dom";

const colors = data.colors;
const rooms = data.rooms;
const customerRoom = data.customerRoom;

const ColorDetail = () => {
  
  const { section, collection, colorName } = useParams();

    const selectedColor =  colors.find(color => color.name === colorName);
  return (


    <Fragment>
      <Box sx={{ marginTop: { xs: "56px", md: "96px" } }}>
        <Navigate></Navigate>
        <ColorDetailIfno color={selectedColor} colors={colors}></ColorDetailIfno>
        <RoomSelector rooms={rooms} colors={colors}></RoomSelector>
        <CustomerRooms customerRoom={customerRoom} colors={colors}></CustomerRooms>
      </Box>
    </Fragment>
  );
};
export default ColorDetail;
