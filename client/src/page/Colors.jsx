import React, { Fragment } from "react";
import Navigate from "../components/commons/Navigate";
import ColorFamilies from "../components/commons/ColorFamilies";
import ListColors from "../components/commons/ListColors";


const Colors = () => {
  
  return (
    <Fragment>
        <div style={{ marginTop: "96px" }}></div>
        <Navigate></Navigate>
        <ColorFamilies></ColorFamilies>
        <ListColors></ListColors>
    </Fragment>
  );
}; 

export default Colors;